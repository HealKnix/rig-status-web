from drf_spectacular.utils import extend_schema, OpenApiParameter


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
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор технического состояния',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
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


class SensorDocumentation:
    def __new__(cls):
        tag = "Датчики"
        return {
            'list': extend_schema(
                tags=[tag],
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
                    )
                ],
                description="Получить конкретный датчик по ID"
            ),
            'create': extend_schema(
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
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данных датчика',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
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
                parameters=[
                    OpenApiParameter(
                        name='id',
                        description='Идентификатор данной буровой установки.',
                        required=True,
                        type=int,
                        location=OpenApiParameter.PATH,
                    )
                ],
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
