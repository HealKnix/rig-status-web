from datetime import datetime, timezone
from typing import Dict, Union

import numpy as np

# Типы для параметров и значений сенсоров
SensorLimits = Dict[str, Union[int, float]]
SensorParameters = Dict[str, SensorLimits]
SubsystemParameters = Dict[str, SensorParameters]
SensorData = Dict[str, Union[int, str, float]]

# Список идентификаторов буровых установок
rig_count: int = 4

# Процент отклонения для установки флагов min и max
percentage: float = 0.05

# Словарь с параметрами датчиков для различных систем буровой установки
subsystem_parameters: SubsystemParameters = {
    "Hoist": {  # Лебёдка
        "hook_load": {"min_val": 50, "max_val": 350},
        "weight_on_bit": {"min_val": 10, "max_val": 150},
        "hook_position": {"min_val": 0, "max_val": 30},
        "rilling_rate": {"min_val": 0, "max_val": 50},
        "tripping_speed": {"min_val": 0, "max_val": 100},
    },
    "DrillingPump": {  # Буровой насос
        "power": {"min_val": 50, "max_val": 300},
        "pump_strokes": {"min_val": 50, "max_val": 200},
        "flow_rate": {"min_val": 20, "max_val": 60},
        "inlet_flow_rate": {"min_val": 150, "max_val": 300},
        "outlet_flow_rate": {"min_val": 150, "max_val": 300},
        "manifold_pressure": {"min_val": 20, "max_val": 50},
        "pressure_drop": {"min_val": 20, "max_val": 50},
    },
    "DownholeMotor": {  # ВЗД (Винтовой забойный двигатель)
        "axial_load": {"min_val": 10, "max_val": 50},
        "shaft_rotation_speed": {"min_val": 50, "max_val": 150},
        "torque": {"min_val": 100, "max_val": 500},
        "power": {"min_val": 50, "max_val": 300},
        "temperature": {"min_val": 30, "max_val": 90},
    },
    "DrillingMudSystem": {  # Система бурового раствора
        "density": {"min_val": 1.1, "max_val": 2.5},
        "temperature": {"min_val": 0, "max_val": 0.2},
        "hydrogen_sulfide": {"min_val": 0, "max_val": 0.5},
        "gas_concentration": {"min_val": 50, "max_val": 100},
        "volume_in_tanks": {"min_val": 50, "max_val": 1000},
        "water_cut": {"min_val": 2, "max_val": 15},
    },
    "AutomaticDrillerSystem": {  # Автоматическая система подачи долота
        "mud_pump_status": {"min_val": 0, "max_val": 1},  # 1 - Вкл., 0 - Выкл.
        "left_circuit_pressure": {"min_val": 50, "max_val": 150},
        "right_circuit_pressure": {"min_val": 50, "max_val": 150},
        "parking_brake_pressure": {"min_val": 5, "max_val": 15},
    },
    "FlawDetector": {  # Дефектоскоп
        "operating_time": {"min_val": 0, "max_val": 10000},
        "pipe_wall_thickness": {"min_val": 5, "max_val": 20},
        "defects": {"min_val": 0, "max_val": 1},
    },
    "TopDriveSystem": {  # СВП (силовой верхний привод)
        "torque_wrench": {"min_val": 50, "max_val": 300},
        "rotary_torque": {"min_val": 50, "max_val": 300},
        "rotation_speed": {"min_val": 50, "max_val": 300},
    },
}

# Инициализация словаря для хранения текущих значений датчиков
sensor_parameters_dict: Dict[int, Dict[str, Dict[str, Union[float, bool]]]] = {}


# Заполнение sensor_parameters_dict начальными значениями для каждой буровой установки
for rig_id in range(rig_count):
    inner_sensor_parameters_dict: Dict[str, Dict[str, Union[float, bool]]] = {}
    for subsystem_name, subsystem_values in subsystem_parameters.items():
        for sensor_name in subsystem_values:
            min_val = subsystem_values[sensor_name]["min_val"]
            max_val = subsystem_values[sensor_name]["max_val"]
            std_dev = (max_val + min_val) / 4
            mean = (max_val + min_val) / 2

            # Генерация начального значения в пределах допустимого диапазона
            current_value = float(
                np.clip(np.random.normal(mean, std_dev), min_val, max_val)
            )

            inner_sensor_parameters_dict[sensor_name] = {
                "min_flag": False,
                "max_flag": False,
                "current_value": current_value,
            }
    sensor_parameters_dict[rig_id] = inner_sensor_parameters_dict


def update_sensor_value(
    rig_id: int, sensor_name: str, min_val: float, max_val: float
) -> None:
    current_value = sensor_parameters_dict[rig_id][sensor_name]["current_value"]
    min_flag = sensor_parameters_dict[rig_id][sensor_name]["min_flag"]
    max_flag = sensor_parameters_dict[rig_id][sensor_name]["max_flag"]

    generated_diff = float(np.random.normal(0, (min_val + max_val) / 100, 1)[0])

    if not max_flag and current_value > max_val + max_val * percentage:
        sensor_parameters_dict[rig_id][sensor_name]["max_flag"] = True
    elif not min_flag and current_value <= min_val - max_val * percentage:
        sensor_parameters_dict[rig_id][sensor_name]["min_flag"] = True

    if max_flag and current_value > max_val - max_val * percentage:
        generated_diff = -abs(generated_diff)
    elif min_flag and current_value <= min_val + max_val * percentage:
        generated_diff = abs(generated_diff)
    elif min_flag:
        sensor_parameters_dict[rig_id][sensor_name]["min_flag"] = False
    elif max_flag:
        sensor_parameters_dict[rig_id][sensor_name]["max_flag"] = False

    sensor_parameters_dict[rig_id][sensor_name]["current_value"] += generated_diff


def create_sensor_data(
    max_val: float,
    rig_id: int,
    subsystem_index: int,
    sensor_index: int,
    sensor_name: str,
) -> SensorData:
    if sensor_parameters_dict[rig_id][sensor_name]["current_value"] <= 0:
        sensor_parameters_dict[rig_id][sensor_name]["current_value"] = float(
            np.clip(
                np.random.normal(max_val * percentage * 2, (max_val * percentage) / 2),
                0,
                max_val,
            )
        )

    return {
        "rig_id": rig_id,
        "subsystem_id": subsystem_index,
        "sensor_id": sensor_index,
        "date": datetime.now(timezone.utc).astimezone().isoformat(),
        "value": round(sensor_parameters_dict[rig_id][sensor_name]["current_value"], 2),
    }


def generate_sensors_data() -> Dict[int, Dict[str, Dict[str, SensorData]]]:
    result_data: Dict[int, Dict[str, Dict[str, SensorData]]] = {}

    subsystem_index: int = 0

    for rig_id in range(rig_count):
        subsystem_dict: Dict[str, Dict[str, SensorData]] = {}

        sensor_index: int = 0

        for subsystem_name, subsystem_values in subsystem_parameters.items():
            sensor_values: Dict[str, SensorData] = {}

            for sensor_name, limits in subsystem_values.items():
                min_val = limits["min_val"]
                max_val = limits["max_val"]

                update_sensor_value(rig_id, sensor_name, min_val, max_val)

                sensor_values[sensor_name] = create_sensor_data(
                    max_val, rig_id, subsystem_index, sensor_index, sensor_name
                )

                sensor_index += 1

            subsystem_dict[subsystem_name] = sensor_values
            subsystem_index += 1

        result_data[rig_id] = subsystem_dict

    return result_data
