# Todo List Backand

Один из множеств тех Todo List, который создаёт каждый для практики каких-то навыков. И этот проект не исключение создавался с тем смыслом, чтобы потренироваться писать Backand самостоятельно с использованием NodeJS. 

Макет взят с Dribble у пользователя: [Hiep Nguyen](https://dribbble.com/hiepnt88)

## Использование 
- Создайте .env-файл.
- Укажите PORT
- DATABASE_URL (для использования другой БД, зайдите в prisma/schema.prisma и измините исходный файл по документации)
- SALT (это случайный текст, добавляемый к хешируемой строке. Не переборщите с длиной, иначе можно попасть в бесконечный цикл, когда hash-функция из bcryptjs будет думать либо слишком долго, либо бесконечно. Обычно достаточно и двух цифр)

## Используемые технологии (Backand)
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

## Для хранения данных
- MongoDB
