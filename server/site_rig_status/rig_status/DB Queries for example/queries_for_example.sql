INSERT INTO drilling_status (id, name)
VALUES (1, 'Работает'),
       (2, 'Запуск...'),
       (3, 'Авария'),
       (4, 'Отключено');

INSERT INTO tech_status (id, name)
VALUES (1, 'Нормально'),
       (2, 'Удовлетворительно'),
       (3, 'Требуется ТО'),
       (4, 'Не в сети');

INSERT INTO rig (id, name, location, well_depth, bottom_hole_drilling, connection_speed, tech_date, drilling_status_id,
                 tech_status_id)
VALUES (1, 'Объект_1', '59.02° 93.83°', 800, 673, 150, '2024-06-06', 1, 1),
       (2, 'Объект_2', '58.95° 95.72°', 683, 389, 43, '2024-03-22', 2, 2),
       (3, 'Объект_3', '58.64° 94.83°', 964, 852, 1, '2024-12-16', 3, 3),
       (4, 'Объект_4', '58.64° 94.83°', 486, 381, 0, '2024-05-28', 4, 4);