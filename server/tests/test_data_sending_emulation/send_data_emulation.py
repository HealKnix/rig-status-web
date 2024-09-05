from datetime import datetime, timezone
from typing import Dict, Union

import numpy as np
import requests

auth_user = requests.post('http://localhost:8000/login/', json={
    'email': 'www.test@gmail.com',
    'password': 'test',
}).json()

cookies = {
    'sessionid': auth_user['sessionid'],
    'csrftoken': auth_user['csrftoken']
}

query_rigs = requests.get('http://localhost:8000/api/rigs', cookies=cookies).json()
query_subsystems = requests.get('http://localhost:8000/api/subsystems/', cookies=cookies).json()
query_sensors = requests.get('http://localhost:8000/api/sensors/', cookies=cookies).json()

# Типы для параметров и значений сенсоров
SensorLimits = Dict[str, Union[int, float]]
SensorParameters = Dict[str, SensorLimits]
SubsystemParameters = Dict[str, SensorParameters]
SensorData = Dict[str, Union[int, str, float]]

# Список идентификаторов буровых установок
rigs_id = [rig['id'] for rig in query_rigs]

subsystems = [subsystem for subsystem in query_subsystems]
sensors = [sensor for sensor in query_sensors]


def get_subsystems(rig_id: int) -> list:
    result = []
    for subsystem in subsystems:
        if subsystem['rig_id'] == rig_id:
            result.append(subsystem)

    return result


def get_sensors(subsystem_id: int) -> list:
    result = []
    for sensor in sensors:
        if sensor['subsystem_id'] == subsystem_id:
            result.append(sensor)

    return result


def get_subsystem_parameters(rig_id: int) -> dict:
    return {
        subsystem['id']: {
            sensor['id']: {
                'min_value': sensor['min_value'],
                'max_value': sensor['max_value'],
            } for sensor in get_sensors(subsystem["id"])
        } for subsystem in get_subsystems(rig_id)
    }


# Процент отклонения для установки флагов min и max
percentage: float = 0.05

# Словарь с параметрами датчиков для различных систем буровой установки
subsystem_parameters: SubsystemParameters = {}

# Инициализация словаря для хранения текущих значений датчиков
sensor_parameters_dict: Dict[int, Dict[str, Dict[str, Union[float, bool]]]] = {}

# Заполнение sensor_parameters_dict начальными значениями для каждой буровой установки
for rig_id in rigs_id:
    inner_sensor_parameters_dict: Dict[str, Dict[str, Union[float, bool]]] = {}

    subsystem_parameters = get_subsystem_parameters(rig_id)

    for subsystem_id, subsystem_values in subsystem_parameters.items():
        for sensor_id in subsystem_values:
            min_value = subsystem_values[sensor_id]["min_value"]
            max_value = subsystem_values[sensor_id]["max_value"]
            std_dev = (max_value + min_value) / 4
            mean = (max_value + min_value) / 2

            # Генерация начального значения в пределах допустимого диапазона
            current_value = float(
                np.clip(np.random.normal(mean, std_dev), min_value, max_value)
            )

            inner_sensor_parameters_dict[sensor_id] = {
                "min_flag": False,
                "max_flag": False,
                "current_value": current_value,
            }
    sensor_parameters_dict[rig_id] = inner_sensor_parameters_dict


def update_sensor_value(
        rig_id: int, sensor_id: str, min_value: float, max_value: float
) -> None:
    current_value = sensor_parameters_dict[rig_id][sensor_id]["current_value"]
    min_flag = sensor_parameters_dict[rig_id][sensor_id]["min_flag"]
    max_flag = sensor_parameters_dict[rig_id][sensor_id]["max_flag"]

    generated_diff = float(np.random.normal(0, (min_value + max_value) / 100, 1)[0])

    if not max_flag and current_value > max_value + max_value * percentage:
        sensor_parameters_dict[rig_id][sensor_id]["max_flag"] = True
    elif not min_flag and current_value <= min_value - max_value * percentage:
        sensor_parameters_dict[rig_id][sensor_id]["min_flag"] = True

    if max_flag and current_value > max_value - max_value * percentage:
        generated_diff = -abs(generated_diff)
    elif min_flag and current_value <= min_value + max_value * percentage:
        generated_diff = abs(generated_diff)
    elif min_flag:
        sensor_parameters_dict[rig_id][sensor_id]["min_flag"] = False
    elif max_flag:
        sensor_parameters_dict[rig_id][sensor_id]["max_flag"] = False

    sensor_parameters_dict[rig_id][sensor_id]["current_value"] += generated_diff


def create_sensor_data(
        max_value: float,
        rig_id: int,
        sensor_id: str,
) -> SensorData:
    if sensor_parameters_dict[rig_id][sensor_id]["current_value"] <= 0:
        sensor_parameters_dict[rig_id][sensor_id]["current_value"] = float(
            np.clip(
                np.random.normal(max_value * percentage * 2, (max_value * percentage) / 2),
                0,
                max_value,
            )
        )

    return {
        "sensor_id": sensor_id,
        "created_at": datetime.now(timezone.utc).astimezone().isoformat(),
        "value": round(sensor_parameters_dict[rig_id][sensor_id]["current_value"], 2),
    }


def generate_sensors_data() -> Dict[int, Dict[str, Dict[str, SensorData]]]:
    result_data: Dict[int, Dict[str, Dict[str, SensorData]]] = {}

    for rig_id in rigs_id:
        subsystem_dict: Dict[str, Dict[str, SensorData]] = {}

        subsystem_parameters = get_subsystem_parameters(rig_id)

        if not subsystem_parameters:
            continue

        for subsystem_id, subsystem_values in subsystem_parameters.items():
            sensor_values: Dict[str, SensorData] = {}

            for sensor_id, limits in subsystem_values.items():
                min_value = limits["min_value"]
                max_value = limits["max_value"]

                update_sensor_value(rig_id, sensor_id, min_value, max_value)

                sensor_values[sensor_id] = create_sensor_data(
                    max_value, rig_id, sensor_id
                )

            subsystem_dict[subsystem_id] = sensor_values

        result_data[rig_id] = subsystem_dict

    return result_data


generate_sensors_data()
