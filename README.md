# rig-status-web

`rig-status-web` - это веб-приложение для мониторинга статуса буровых установок.

## Стек

Frontend - `React`, `Typescript`, `Vite`, `Axios`, `React-Query`
<br>
Backend - `Django`, `Python`, `Django Rest Framework`

## Требования

Перед началом убедитесь, что на вашем компьютере установлены следующие инструменты:

- Python 3.8+
- Node.js 14+
- npm 6+
- PostgreSQL (или другая поддерживаемая база данных)

## Установка и настройка

### 1. Клонирование репозитория

Клонируйте репозиторий на локальную машину:

```bash
git clone https://github.com/HealKnix/rig-status-web.git
cd rig-status-web
```

### 2. Настройка серверной части (Django)

#### 2.1. Создание виртуального окружения

Создайте и активируйте виртуальное окружение:

```bash
cd server
python -m venv venv
venv\Scripts\activate
```

#### 2.2. Установка зависимостей

Установите зависимости из `requirements.txt`:

```bash
pip install -r requirements.txt
```

#### 2.3. Настройка базы данных

Создайте и настройте базу данных PostgreSQL. Пример настройки в файле `settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'имя_вашей_базы_данных',
        'USER': 'ваш_пользователь',
        'PASSWORD': 'ваш_пароль',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

#### 2.4. Миграции базы данных

Примените миграции для настройки базы данных:

```bash
cd site_rig_status
python manage.py makemigrations rig_status
python manage.py migrate
```

#### 2.5. Создание суперпользователя

Создайте суперпользователя для доступа к административной панели Django:

```bash
python manage.py createsuperuser
```

#### 2.6. Запуск серверной части

Запустите сервер разработки Django:

```bash
python manage.py runserver localhost:8000
```

#### 2.7. Запуск серверной части (WebSocket)

```bash
daphne.exe -p 8001 site_rig_status.asgi:application
```

### 3. Настройка клиентской части (React)

#### 3.1. Установка зависимостей

Перейдите в директорию `frontend` и установите зависимости:

```bash
cd client
npm install
```

#### 3.2. Запуск клиентской части

Запустите сервер разработки React:

```bash
npm run dev
```

### 4. Сборка проекта для продакшн

#### 4.1. Сборка клиентской части

Соберите клиентскую часть для продакшн:

```bash
npm run build
```

#### 4.2. Настройка статических файлов в Django

Собранные файлы из React нужно перенести в Django. Убедитесь, что настройки `STATICFILES_DIRS` и `STATIC_ROOT` в файле `settings.py` настроены корректно:

```python
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'client', 'build', 'static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'server', 'site_rig_status', 'staticfiles')
```

Соберите статические файлы:

```bash
python manage.py collectstatic
```

### 5. Развертывание на продакшн сервере

Для развертывания на продакшн сервере рекомендуется использовать `gunicorn` и `nginx` для Django и `serve` для статических файлов React.

---

Эта документация поможет вам быстро и легко развернуть серверное и клиентское приложение на Django и React. Если у вас возникнут вопросы или проблемы, не стесняйтесь обращаться за помощью через систему Issues на GitHub.
