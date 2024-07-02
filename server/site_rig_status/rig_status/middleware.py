from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin


class CheckAuthorizationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Пропускаем проверку для следующих путей
        if (
                '/' == str(request.path) or
                '/login' in str(request.path) or
                '/login/' in str(request.path) or
                '/admin' in str(request.path) or
                '/admin/' in str(request.path) or
                '/api/docs' in str(request.path) or
                '/api/docs/' in str(request.path) or
                '/api/redoc' in str(request.path) or
                '/api/redoc/' in str(request.path) or
                '/api/openapi' in str(request.path) or
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
