# Backend-Education-App

<p align="center">
  <img src="./Unknown-Squad.png" width="100" alt="Unknown-Squad" /></a>
</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat">
<img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat">
</a></p>

<p align="center">
<img alt="Node.Js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img alt="Nest.Js" src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white">
<img alt="Swagger" src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white">
<img alt="NPM" src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white"></p>

## Description

🎉 An education app for students that offers interactive lessons, quizzes, study tools, and resources to help students for improving their academic grades.

## Database Design

<div style="text-align:center;">
  <img src="https://media.discordapp.net/attachments/791606458545471518/1152570672388767866/image.png?width=625&height=416" alt="Database design" />
</div>

## Documentation

- [Feature Map](https://unknown-devs.atlassian.net/wiki/spaces/BEP/overview)
- [Swagger](https://e-learning-j8bz.onrender.com/apis/docs)
- [Jira Board](https://unknown-devs.atlassian.net/jira/software/projects/BEP/boards/5)

## 💥 Features

- 📱 Mobile friendly
- 📋 Content Management System (CMS)
- ⚠️ Robust error handling
- 📸 File upload functionality
- 🔐 Authentication and Authorization
- 📊 MongoDB database and Mongoose ORM.
- 💲Payment system integration

## Installation

```bash
# Clone repo
$ git clone https://github.com/MahmoudSerag/education-app.git

# Access repo director
$ cd education-app

# Install required dependencies
$ npm install
```

## Seed Database

```bash
# Import data to the database
$ npm run data:import

# Destroy data from the database
$ npm run data:destroy
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Environment variables

1. `PORT`: Enter port number (e.g. `3000`).

2. `MONGO_URI`: Enter your MongoDB connection URL (e.g. `mongodb+srv://<username>:<password>@<cluster name>.0k0vtqz.mongodb.net/?retryWrites=true&w=majority`)

3. `NODE_ENV`: `production` || `development`

4. `CLIENT_DOMAIN_DEV`: Enter client domain url (e.g. `http://localhost:5000`)

5. `CLIENT_DOMAIN_PRODUCTION`: (e.g. `https://www.example.com`)

6. `JWT_EXPIRES_IN`: Enter expiration time (e.g. `2d`)

7. `JWT_SECRET_KEY`: Enter your secret key (e.g. `secret`)

8. `COOKIE_EXPIRES_IN`: Enter expiration time (e.g. `2` days)

9. `PASSWORD_RESET_TOKEN_EXPIRES_IN`: Enter expiration time (e.g. `2`)

10. `EMAIL_HOST`: smtp.gmail.com

11. `EMAIL_SENDER`: Enter your sender email

12. `EMAIL_PASSWORD`: Enter your password of sender email

13. `SWAGGER_SERVER_DEV`: (`http://localhost:3000`)

14. `SWAGGER_SERVER_PRODUCTION`: (`https://e-learning-j8bz.onrender.com/`)

15. `SWAGGER_TITLE`: (e.g. `Education-App APIs Documentation`)

16. `SWAGGER_DESCRIPTION`: (e.g. `Discover our concise and professional Swagger documentation, providing a comprehensive overview of our APIs`)

## Contributors

<table id="Contributors">
  <tr>
    <td align="center">
    <a href="https://github.com/MahmoudSerag"><img src="https://avatars.githubusercontent.com/u/49066464?s=400&u=0efe5c3ec2b1ecd3f5b8d854308ad523dcb59df3&v=4" width="100px;" alt="Mahmoud Serag"/><br /><sub><b>Mahmoud Serag</b></sub></a><br />
    <a href="https://github.com/MahmoudSerag" title="Code">💻</a>
    </td>
  </tr>
</table>

## License

[MIT licensed](LICENSE).
