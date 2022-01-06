# Todo List Backand

Один из множеств тех Todo List, который создаёт каждый для практики каких-то навыков. И этот проект не исключение создавался с тем смыслом, чтобы потренироваться писать Backand самостоятельно с использованием NodeJS.

Макет взят с Dribble у пользователя: [Hiep Nguyen](https://dribbble.com/hiepnt88)

## Использование

- Создайте .env-файл.
- Укажите PORT
- DATABASE_URL (для использования другой БД, зайдите в prisma/schema.prisma и измините исходный файл по документации)
- SALT (это случайный текст, добавляемый к хешируемой строке. Не переборщите с длиной, иначе можно попасть в бесконечный цикл, когда hash-функция из bcryptjs будет думать либо слишком долго, либо бесконечно. Обычно достаточно и двух цифр)

---

## Технологии (Backand)

- TypeScript
- NodeJS
- ExpressJS
- Prisma (в будущем Mongoose)
- InversifyJS
- Nodemoon
- class-validator
- bcryptjs

### Code Style

- Prettier
- Eslint (tslint)

### Для хранения данных

- MongoDB

---

## Обращения к API

### Authentication

Для авторизации используются следующие методы и адреса

#### Login (POST)

```
curl POST http://localhost:8000/auth/login
```

В теле запроса принимает `email` и `password`.

Если информация указана правильно, возвращается объект с пользователем в котором содержится `id`, `email` и `хешированный пароль`:

```
id: 61d4780352cf15a7082c5fd4
email: какой-то@mail.ru"
password: $2a$12$fcaBsnfnBOntlPBHhc265OtiF2FM.bbeGQRJEA3n5/zgWyjJmDo4S"
```

Если информация указана неверно, возвращается `422` ошибка.

#### Register (POST)

```
curl POST http://localhost:8000/auth/register
```

В теле запроса принимает `email` и `password`.

Возвращается объект с пользователем в котором содержится `id`, `email` и `хешированный пароль`:

```
id: 61d4780352cf15a7082c5fd4
email: какой-то@mail.ru"
password: $2a$12$fcaBsnfnBOntlPBHhc265OtiF2FM.bbeGQRJEA3n5/zgWyjJmDo4S"
```

Если информация указана неверно, возвращается `422` ошибка.

_Присутствует базовая валидация, которая не позволяет отправить запрос с отсутсвующими данными или в том случае, если длина пароля менее 5 символов_.

---

### Todos

Для создания, получения, обновления и удаления используются следующие методы.

#### Create (POST)

```
curl POST http://localhost:8000/todos
```

В качестве тела принимает ряд данных, таких как:

```
title: string;
priority: string;
workflow: string;
author": string;
```

При успешном создании возвращается объект `Todo`:

```
id: "61d613e4b4c231e25ec34444";
title: "Создать таск для демонстрации";
priority: "Нормальный";
workflow: "В процессе";
date: "Thu Jan 06 2022 00:55:48 GMT+0300 (Москва, стандартное время)";
author: "61d4780352cf15a7082c5fd4";
```

#### Find Todos By Author (GET)

```
curl GET http://localhost:8000/todos/:author
```

Принимает `author`, коим выступает `id` созданного пользоваля в качестве параметров запроса.

При успешном получении `списка дел` возвращает массив

#### Delete Todo By Id (DELETE)

```
curl DELETE http://localhost:8000/todos/:id
```

Принимает `id` задачи.

При успешном удалении возвращает ответ:

```
"Задача *id* удалена"
```

---
