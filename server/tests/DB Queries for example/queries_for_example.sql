INSERT INTO drilling_status (id, name)
VALUES (1, 'Работает' ),
       (2, 'Запуск...'),
       (3, 'Авария'   ),
       (4, 'Отключено');
-- ---------------------------------------------------------------------------------------------------------------------
INSERT INTO tech_status (id, name)
VALUES (1, 'Нормально'        ),
       (2, 'Удовлетворительно'),
       (3, 'Требуется ТО'     ),
       (4, 'Не в сети'        );
-- ---------------------------------------------------------------------------------------------------------------------
INSERT INTO well_pad (id, name, location)
VALUES (1, '1', '0 0'),
       (2, '2', '0 0'),
       (3, '3', '0 0'),
       (4, '4', '0 0');
-- ---------------------------------------------------------------------------------------------------------------------
INSERT INTO well_type (id, name)
VALUES (1, '1'),
       (2, '2'),
       (3, '3'),
       (4, '4');
-- ---------------------------------------------------------------------------------------------------------------------
INSERT INTO rig (id, name, longitude, latitude, well_depth, well_number, well_pad_id, well_type_id,
                 bottom_hole_drilling, connection_speed, tech_date, drilling_status_id, tech_status_id, start_date,
                 end_date_fact, end_date_plan)
VALUES (1, 'Объект_1', 59.02, 93.83, 1000, 1, 1, 1, 673, 150, '2024-06-06', 1, 1, CURRENT_DATE, NULL, '06/06/2025'),
       (2, 'Объект_2', 58.95, 95.72, 1000, 2, 2, 2, 389, 43,  '2024-03-22', 2, 2, CURRENT_DATE, NULL, '19/02/2025'),
       (3, 'Объект_3', 58.64, 94.83, 1000, 3, 3, 3, 839, 1,   '2024-12-16', 3, 3, CURRENT_DATE, NULL, '17/12/2024'),
       (4, 'Объект_4', 58.64, 94.83, 1000, 4, 4, 4, 381, 0,   '2024-05-28', 4, 4, CURRENT_DATE, NULL, '24/11/2025');
-- ---------------------------------------------------------------------------------------------------------------------
INSERT INTO subsystem (id, name, description, active, rig_id)
VALUES (1, 'Лебёдка',     '', TRUE,  1),
       (2, 'БН 1',        '', TRUE,  1),
       (3, 'БН 2',        '', TRUE,  1),
       (4, 'ВЗД',         '', FALSE, 1),
       (5, 'Система БР',  '', TRUE,  1),
       (6, 'АПД',         '', FALSE, 1),
       (7, 'Дефектоскоп', '', TRUE,  1),
       (8, 'СВП',         '', FALSE, 1);
-- ---------------------------------------------------------------------------------------------------------------------
INSERT INTO sensor_status (id, name)
VALUES (1, 'Работает'   ),
       (2, 'Простаивает');
-- ---------------------------------------------------------------------------------------------------------------------
INSERT INTO sensor_output_type (id, name)
VALUES (1, 'text'       ),
       (2, 'speedometer'),
       (3, 'progressbar');
-- ---------------------------------------------------------------------------------------------------------------------
INSERT INTO sensor (id, name, data_type, unit, output_type_id, min_value, max_value, rig_id, status_id, subsystem_id)
VALUES (1,  'Вес на крюке',                      'hook_load',              'т',       1, 50,  350,   1, 1, 1),
       (2,  'Нагрузка на долото',                'weight_on_bit',          'кгс',     1, 10,  150,   1, 1, 1),
       (3,  'Положение крюка',                   'hook_position',          'м',       1, 0,   30,    1, 1, 1),
       (4,  'Скорость бурения',                  'rilling_rate',           'м/ч',     1, 0,   50,    1, 1, 1),
       (5,  'Скорость СПО',                      'tripping_speed',         'кгс',     1, 0,   100,   1, 1, 1),
--     -----------------------------------------------------------------------------------------------------------------
       (6,  'Мощность',                          'power',                  'кВТ',     1, 50,  300,   1, 1, 2),
       (7,  'Ходы насоса',                       'pump_strokes',           'ход/мин', 1, 50,  200,   1, 1, 2),
       (8,  'Расход',                            'flow_rate',              'л/с',     1, 20,  60,    1, 1, 2),
       (9,  'Расход на входе',                   'inlet_flow_rate',        'л/с',     3, 150, 300,   1, 1, 2),
       (10, 'Поток на выходе',                   'outlet_flow_rate',       'л/с',     3, 150, 300,   1, 1, 2),
       (11, 'Давление манифольда',               'manifold_pressure',      'кПа',     3, 20,  50,    1, 1, 2),
       (12, 'Перепад давления',                  'pressure_drop',          'кПа',     3, 20,  50,    1, 1, 2),
--     -----------------------------------------------------------------------------------------------------------------
       (13, 'Мощность',                          'power',                  'кВТ',     1, 50,  300,   1, 1, 3),
       (14, 'Ходы насоса',                       'pump_strokes',           'ход/мин', 1, 50,  200,   1, 1, 3),
       (15, 'Расход',                            'flow_rate',              'л/с',     1, 20,  60,    1, 1, 3),
       (16, 'Расход на входе',                   'inlet_flow_rate',        'л/с',     3, 150, 300,   1, 1, 3),
       (17, 'Поток на выходе',                   'outlet_flow_rate',       'л/с',     3, 150, 300,   1, 1, 3),
       (18, 'Давление манифольда',               'manifold_pressure',      'кПа',     3, 20,  50,    1, 1, 3),
       (19, 'Перепад давления',                  'pressure_drop',          'кПа',     3, 20,  50,    1, 1, 3),
--     -----------------------------------------------------------------------------------------------------------------
       (20, 'Осевая нагрузка',                   'axial_load',             'кН',      1, 10,  50,    1, 1, 4),
       (21, 'Частота вращения вала',             'shaft_rotation_speed',   'об/мин',  2, 50,  150,   1, 1, 4),
       (22, 'Момент силы',                       'torque',                 'кН·м',    1, 100, 500,   1, 1, 4),
       (23, 'Мощность',                          'power',                  'кВт',     1, 50,  300,   1, 1, 4),
       (24, 'Температура',                       'temperature',            '°C',      1, 30,  90,    1, 1, 4),
--     -----------------------------------------------------------------------------------------------------------------
       (25, 'Плотность',                         'density',                'кг/м³',   1, 1.1, 2.5,   1, 1, 5),
       (26, 'Температура',                       'temperature',            '°C',      1, 0,   0.2,   1, 1, 5),
       (27, 'Сероводород',                       'hydrogen_sulfide',       'мг/м³',   1, 0,   0.5,   1, 1, 5),
       (28, 'Загазованность',                    'gas_concentration',      '%',       1, 50,  100,   1, 1, 5),
       (29, 'Объём в ёмкостях',                  'volume_in_tanks',        'м³',      1, 50,  1000,  1, 1, 5),
       (30, 'Водоотдача',                        'water_cut',              'м³/сек',  2, 2,   15,    1, 1, 5),
--     -----------------------------------------------------------------------------------------------------------------
       (31, 'Статус',                            'mud_pump_status',        '',        1, 0,   100,   1, 1, 6),
       (32, 'Статус работы ОРБ',                 'left_circuit_pressure',  '',        1, 0,   100,   1, 1, 6),
       (33, 'Давление в левом рабочем контуре',  'left_circuit_pressure',  'кПа',     3, 50,  150,   1, 1, 6),
       (34, 'Давление в правом рабочем контуре', 'right_circuit_pressure', 'кПа',     3, 50,  150,   1, 1, 6),
       (35, 'Давление в стояночном тормозе',     'parking_brake_pressure', 'МПа',     3, 5,   15,    1, 1, 6),
--     -----------------------------------------------------------------------------------------------------------------
       (36, 'Время работы',                      'operating_time',         'ч',       1, 0,   10000, 1, 1, 7),
       (37, 'Толщина тела трубы',                'pipe_wall_thickness',    'мм',      1, 5,   20,    1, 1, 7),
       (38, 'Дефекты',                           'defects',                '',        1, 0,   1,     1, 1, 7),
--     -----------------------------------------------------------------------------------------------------------------
       (39, 'Момент ключа',                      'torque_wrench',          'кН·м',    1, 50,  300,   1, 1, 8),
       (40, 'Момент ГК',                         'rotary_torque',          'кН·м',    1, 50,  300,   1, 1, 8),
       (41, 'Частота врещения',                  'rotation_speed',         'об/мин',  1, 50,  300,   1, 1, 8);