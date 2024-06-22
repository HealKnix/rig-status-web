from rest_framework import viewsets, status
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter
from rest_framework.response import Response

from .models import TechStatus, Sensor, SensorData, DrillingStatus, Rig
from .serializers import (
    TechStatusSerializer,
    SensorSerializer,
    SensorDataSerializer,
    DrillingStatusSerializer,
    RigSerializer,
)


# def generate_extend_schema(tags, description_base):
#     return extend_schema_view(
#         list=extend_schema(
#             tags=[tags],
#             description=f"Получить список всех {description_base}"
#         ),
#         retrieve=extend_schema(
#             tags=[tags],
#             description=f"Получить конкретный {description_base} по ID"
#         ),
#         create=extend_schema(
#             tags=[tags],
#             description=f"Создать новый {description_base}"
#         ),
#         update=extend_schema(
#             tags=[tags],
#             description=f"Обновить существующий {description_base}"
#         ),
#         partial_update=extend_schema(
#             tags=[tags],
#             description=f"Частично обновить существующий {description_base}"
#         ),
#         destroy=extend_schema(
#             tags=[tags],
#             description=f"Удалить существующий {description_base}"
#         ),
#     )


@extend_schema_view(
    list=extend_schema(
        tags=['Технические состояния'],
        description="Получить список всех технических состояний"
    ),
    retrieve=extend_schema(
        tags=['Технические состояния'],
        description="Получить конкретное техническое состояние по ID"
    ),
    create=extend_schema(
        tags=['Технические состояния'],
        description="Создать новое техническое состояние"
    ),
    update=extend_schema(
        tags=['Технические состояния'],
        description="Обновить существующее техническое состояние"
    ),
    partial_update=extend_schema(
        tags=['Технические состояния'],
        description="Частично обновить существующее техническое состояние"
    ),
    destroy=extend_schema(
        tags=['Технические состояния'],
        description="Удалить существующее техническое состояние"
    ),
)
class TechStatusViewSet(viewsets.ModelViewSet):
    queryset = TechStatus.objects.all()
    serializer_class = TechStatusSerializer


@extend_schema_view(
    list=extend_schema(
        tags=['Датчики'],
        description="Получить список всех датчиков"
    ),
    retrieve=extend_schema(
        tags=['Датчики'],
        description="Получить конкретный датчик по ID"
    ),
    create=extend_schema(
        tags=['Датчики'],
        description="Создать новый датчик"
    ),
    update=extend_schema(
        tags=['Датчики'],
        description="Обновить существующий датчик"
    ),
    partial_update=extend_schema(
        tags=['Датчики'],
        description="Частично обновить существующий датчик"
    ),
    destroy=extend_schema(
        tags=['Датчики'],
        description="Удалить существующий датчик"
    ),
)
class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer


@extend_schema_view(
    list=extend_schema(
        tags=['Данные датчиков'],
        description="Получить список всех данных датчиков"
    ),
    retrieve=extend_schema(
        tags=['Данные датчиков'],
        description="Получить конкретные данные датчика по ID"
    ),
    create=extend_schema(
        tags=['Данные датчиков'],
        description="Создать новые данные датчика"
    ),
    update=extend_schema(
        tags=['Данные датчиков'],
        description="Обновить существующие данные датчика"
    ),
    partial_update=extend_schema(
        tags=['Данные датчиков'],
        description="Частично обновить существующие данные датчика"
    ),
    destroy=extend_schema(
        tags=['Данные датчиков'],
        description="Удалить существующие данные датчика"
    ),
)
class SensorDataViewSet(viewsets.ModelViewSet):
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer


@extend_schema_view(
    list=extend_schema(
        tags=['Состояния бурения'],
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
    retrieve=extend_schema(
        tags=['Состояния бурения'],
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
    create=extend_schema(
        tags=['Состояния бурения'],
        description="Создать новое состояние бурения"
    ),
    update=extend_schema(
        tags=['Состояния бурения'],
        description="Обновить существующее состояние бурения"
    ),
    partial_update=extend_schema(
        tags=['Состояния бурения'],
        description="Частично обновить существующее состояние бурения"
    ),
    destroy=extend_schema(
        tags=['Состояния бурения'],
        description="Удалить существующее состояние бурения"
    ),
)
class DrillingStatusViewSet(viewsets.ModelViewSet):
    queryset = DrillingStatus.objects.all()
    serializer_class = DrillingStatusSerializer

    # Кастомный JSON / Чтобы не забыть =)
    def list(self, request, *args, **kwargs):
        query_filter = self.request.query_params.get("filter")

        if query_filter is not None:
            return Response(
                [
                    {
                        "data": self.get_serializer(self.queryset, many=True).data
                    },
                    {
                        "status": status.HTTP_200_OK
                    }
                ],
                status=status.HTTP_200_OK
            )

        query_data = self.get_serializer(self.queryset, many=True)
        return Response(query_data.data, status=status.HTTP_200_OK)


@extend_schema_view(
    list=extend_schema(
        tags=['Буровые установки'],
        description="Получить список всех буровых установок"
    ),
    retrieve=extend_schema(
        tags=['Буровые установки'],
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
    create=extend_schema(
        tags=['Буровые установки'],
        description="Создать новую буровую установку"
    ),
    update=extend_schema(
        tags=['Буровые установки'],
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
    partial_update=extend_schema(
        tags=['Буровые установки'],
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
    destroy=extend_schema(
        tags=['Буровые установки'],
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
)
class RigViewSet(viewsets.ModelViewSet):
    queryset = Rig.objects.all()
    serializer_class = RigSerializer


# TechStatusViewSet = generate_extend_schema('Технические состояния', 'технических состояний')(TechStatusViewSet)
# SensorViewSet = generate_extend_schema('Датчики', 'датчиков')(SensorViewSet)
# SensorDataViewSet = generate_extend_schema('Данные датчиков', 'данных датчиков')(SensorDataViewSet)
# DrillingStatusViewSet = generate_extend_schema('Состояния бурения', 'состояний бурения')(DrillingStatusViewSet)
# RigViewSet = generate_extend_schema('Буровые установки', 'буровых установок')(RigViewSet)
