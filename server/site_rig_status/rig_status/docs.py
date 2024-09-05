from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter
)


class TechStatusDocumentation:
    def __new__(cls):
        tag = 'Технические состояния'
        return {
            'list': extend_schema(
                tags=[tag],
                description="Получить список всех технических состояний"
            ),
            'retrieve': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор технического состояния',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Получить конкретное техническое состояние по ID"
            ),
            'create': extend_schema(
                tags=[tag],
                description="Создать новое техническое состояние"
            ),
            'update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор технического состояния',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Обновить существующее техническое состояние"
            ),
            'partial_update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор технического состояния',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Частично обновить существующее техническое состояние"
            ),
            'destroy': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор технического состояния',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Удалить существующее техническое состояние"
            ),
        }


class SensorStatusDocumentation:
    def __new__(cls):
        tag = "Состояния датчика"
        return {
            'list': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='rig_id',
                        description='Идентификатор состояния датчика',
                        required=False,
                        type=int,
                        location=OpenApiParameter.QUERY,
                    )
                ],
                description="Получить список всех состояний датчика"
            ),
            'retrieve': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор состояния датчика',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    ),
                ],
                description="Получить конкретное состояние датчика по ID"
            ),
            'create': extend_schema(
                tags=[tag],
                description="Создать новое состояние датчика"
            ),
            'update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор состояния датчика',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Обновить существующее состояние датчика"
            ),
            'partial_update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор состояния датчика',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Частично обновить существующее состояние датчика"
            ),
            'destroy': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор состояния датчика',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Удалить существующее состояние"
            ),
        }


class SensorDocumentation:
    def __new__(cls):
        tag = "Датчики"
        return {
            'list': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='rig_id',
                        description='Идентификатор буровой установки',
                        required=False,
                        type=int,
                        location=OpenApiParameter.QUERY,
                    ),
                    OpenApiParameter(
                        name='subsystem_id',
                        description='Идентификатор подсистемы',
                        required=False,
                        type=int,
                        location=OpenApiParameter.QUERY,
                    )
                ],
                description="Получить список всех датчиков"
            ),
            'retrieve': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор датчика',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    ),
                ],
                description="Получить конкретный датчик по ID"
            ),
            'create': extend_schema(
                tags=[tag],
                description="Создать новый датчик"
            ),
            'update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор датчика',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Обновить существующий датчик"
            ),
            'partial_update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор датчика',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Частично обновить существующий датчик"
            ),
            'destroy': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор датчика',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Удалить существующий датчик"
            ),
        }


class SensorDataDocumentation:
    def __new__(cls):
        tag = "Данные датчиков"
        return {
            'list': extend_schema(
                tags=[tag],
                description="Получить список всех данных датчиков"
            ),
            'retrieve': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данных датчика',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Получить конкретные данные датчика по ID"
            ),
            'create': extend_schema(
                tags=[tag],
                description="Создать новые данные датчика"
            ),
            'update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данных датчика',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Обновить существующие данные датчика"
            ),
            'partial_update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данных датчика',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Частично обновить существующие данные датчика"
            ),
            'destroy': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данных датчика',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Удалить существующие данные датчика"
            ),
        }


class DrillingStatusDocumentation:
    def __new__(cls):
        tag = "Состояния бурения"
        return {
            'list': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='filter',
                        description='Фильтрация результатов',
                        required=False,
                        type=str,
                        location=OpenApiParameter.QUERY,
                    )
                ],
                description="Получить список всех состояний бурения"
            ),
            'retrieve': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данной буровой установки.',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Получить конкретное состояние бурения по ID"
            ),
            'create': extend_schema(
                tags=[tag],
                description="Создать новое состояние бурения"
            ),
            'update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данной буровой установки.',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Обновить существующее состояние бурения"
            ),
            'partial_update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данной буровой установки.',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Частично обновить существующее состояние бурения"
            ),
            'destroy': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данной буровой установки.',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Удалить существующее состояние бурения"
            ),
        }


class RigDocumentation:
    def __new__(cls):
        tag = "Буровые установки"
        return {
            'list': extend_schema(
                tags=[tag],
                description="Получить список всех буровых установок"
            ),
            'retrieve': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данной буровой установки.',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Получить конкретную буровую установку по ID"
            ),
            'create': extend_schema(
                tags=[tag],
                description="Создать новую буровую установку"
            ),
            'update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данной буровой установки.',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Обновить существующую буровую установку"
            ),
            'partial_update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данной буровой установки.',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Частично обновить существующую буровую установку"
            ),
            'destroy': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данной буровой установки.',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Удалить существующую буровую установку"
            ),
        }


class RobotStatusDocumentation:
    def __new__(cls):
        tag = "Состояния робота"
        return {
            'list': extend_schema(
                tags=[tag],
                description="Получить список всех состояний робота"
            ),
            'retrieve': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор состояния робота',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Получить конкретное состояние робота по ID"
            ),
            'create': extend_schema(
                tags=[tag],
                description="Создать новое состояние робота"
            ),
            'update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данного состояния робота',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Обновить существующее состояние робота"
            ),
            'partial_update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данного состояния робота',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Частично обновить существующее состояние робота"
            ),
            'destroy': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данного состояния робота',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Удалить существующее состояние робота"
            ),
        }


class RobotDocumentation:
    def __new__(cls):
        tag = "Робот"
        return {
            'list': extend_schema(
                tags=[tag],
                description="Получить список всех роботов"
            ),
            'retrieve': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор робота',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Получить конкретного робота по ID"
            ),
            'create': extend_schema(
                tags=[tag],
                description="Создать нового робота"
            ),
            'update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данного робота',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Обновить существующего робота"
            ),
            'partial_update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данного робота',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Частично обновить существующего робота"
            ),
            'destroy': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данного робота',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Удалить существующего робота"
            ),
        }


class SubsystemDocumentation:
    def __new__(cls):
        tag = "Подсистемы"
        return {
            'list': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='rig_id',
                        description='Идентификатор буровой установки',
                        required=False,
                        type=int,
                        location=OpenApiParameter.QUERY,
                    )
                ],
                description="Получить список всех подсистем"
            ),
            'retrieve': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор подсистемы',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Получить конкретной подсистемы по ID"
            ),
            'create': extend_schema(
                tags=[tag],
                description="Создать нового робота"
            ),
            'update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данной подсистемы',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Обновить существующую подсистему"
            ),
            'partial_update': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данной подсистемы',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Частично обновить существующую подсистем"
            ),
            'destroy': extend_schema(
                tags=[tag],
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данной подсистемы',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
                description="Удалить существующую подсистему"
            ),
        }
