from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin


class CheckAuthorizationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Пропускаем проверку для страницы админки и документации
        if (
            '/' == request.path or
            '/admin/' in request.path or
            '/api/docs/' in str(request.path) or
            '/api/redoc/' in str(request.path) or
            '/api/openapi/' in str(request.path)
        ):
            return None

        if not request.user.is_authenticated:
            return JsonResponse(
                {
                    'detail': 'Authentication credentials were not provided.'
                },
                status=401
            )
