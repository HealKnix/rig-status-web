# rig-status-web

`rig-status-web` - это веб-приложение для мониторинга статуса буровых установок.

## Стек

Frontend - `React`, `Typescript`, `Vite`
<br>
Backend - `Django`, `Python`, `PostgreSQL`

## Требования

Перед началом убедитесь, что на вашем компьютере установлены следующие инструменты:

- Python 3.8+ (Для разработки использовалась версия 3.10.11)
- Node.js 14+ (Для разработки использовалась версия 20.17.0)
- npm 6+ (Для разработки использовалась версия 10.8.2)
- PostgreSQL (или другая поддерживаемая база данных)

## Установка и настройка

## 1. Клонирование репозитория

Клонируйте репозиторий на локальную машину:

```bash
git clone https://github.com/HealKnix/rig-status-web.git
cd rig-status-web
```

## 2. Настройка серверной части (Django)

#### 2.1. Создание виртуального окружения

Создайте и активируйте виртуальное окружение:

```bash
cd server\site_rig_status
python -m venv venv
venv\Scripts\activate
```

#### 2.2. Установка зависимостей

Установите зависимости из `requirements.txt`:

```bash
pip install -r requirements.txt
```

#### 2.3. Настройка базы данных

Создайте и настройте базу данных PostgreSQL. Пример настройки в файле `.env.example`:

```js
DB_HOST = localhost
DB_PORT = 5432
DB_NAME = postgres
DB_USER = postgres
DB_PASS = 1234
```

Удалите префикс `.example` и введите свои данные

#### 2.4. Миграции базы данных

Примените миграции для настройки базы данных:

```bash
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

## 3. Настройка клиентской части (React)

#### 3.1. Установка зависимостей

Перейдите в директорию `client` и установите зависимости:

```bash
cd client
npm install
```

#### 3.2. Запуск клиентской части

Запустите сервер разработки React:

```bash
npm run dev
```

Для запуска режима MOCK используйте:

```bash
npm run dev:mock
```

### 4. Сборка проекта для продакшн

#### 4.1. Сборка клиентской части

Соберите клиентскую часть для продакшн:

```bash
npm run build
```

### 5. Тестирование

Для начала тестирования создайте нового superuser'а в Django

```bash
Почта: www.test@gmail.com
Логин: test
Имя: Тест
Фамилия: Тестов
Отчество: Тестович
password: test
```

После этого перейдите в папку для тестирования

```bash
cd server\tests
```

В папке `DB Queries for example` будет лежать файл `queries_for_example.sql`. В нём находятся запросы на создание тестовых данных.

После выполнения этих запросов перейдите в:

```bash
cd test_data_sending_emulation
```

Создайте и активируйте виртуальное окружение:

```bash
cd server
python -m venv venv
venv\Scripts\activate
```

Установите зависимости из `requirements.txt`:

```bash
pip install -r requirements.txt
```

Запустите файл `main.py`

```bash
python .\main.py
```

После этого на сервер будут поступать запросы на создание новых записей для данных с датчиков, что в свою очередь будут отправляться по WebSocket на клиент
