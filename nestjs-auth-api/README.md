## Requirements
This project was developed using:

- **Node.js v23+**
- **PostgreSQL 16**

It's recommended to use the same versions to prevent potential compatibility issues.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Environment Variables

create a `.env` file in the root of the project and add the following configuration:

```ini
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=username
DB_PASSWORD=password
DB_DATABASE=dbname
JWT_SECRET=wt_secret
```
## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run seed

```bash

$ npm run seed

```