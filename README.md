# Gaming Store - Backend

NodeJS Project - build api with nodejs, express, mongodb

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Scripts](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Configuration](#configuration)
- [Extras](#extras)

## Getting Started

This project was build in visual studio code with javascript and typescript

### Prerequisites

Install nodejs to your local computer

### Installation & Scripts

Step-by-step instructions on how to install dependencies and set up the project.

```bash
# `Clone the repository`
git clone https://github.com/AdirDahari/Gaming-Store-Back.git

copy of the project

# `Install dependencies`
npm install

when we download the project for the first time we must execute npm i to install all dependencies

### `Run the project`
npm run watch

Runs the app in the current mode (.env file) every change will automatic update the project, no need to stop the project and ran again
```

### Folder Structure

- **`/public`:** HTML files.
- **`/src`:** The root directory for source code.
  - **`/@type`:** Interfaces for typescript.
  - **`/config`:** Configured and run the project by the .env files.
  - **`/database`:** Data models and database schemas.
  - **`/error`:** Custom error handle extend from error.
  - **`/logs`:** Custom logger.
  - **`/middlewares`:** Middleware functions for handling requests before they reach the route handler.
  - **`/routes`:** Express route definitions, organized by resource or functionality.
  - **`/service`:** Utility functions.
  - **`/validation`:** Validate schema with Joi library.
  - **`index.ts`:** The main application file where the server is configured and initialized.

### Configuration

In config folder change NODE_ENV variable from dev, test and prod.

We use mongoDB Atlas for database.

### Extras

- **`jwt`:** Response json with \_id (user id) and isAdmin (true or false).
- **`Update user`:** Update user not included email and password.
- **`bonus`:** Admin can change a regular user to admin.
- **`Users postman api link`:** https://documenter.getpostman.com/view/29582728/2sA2xjzrRx
- **`Posts postman api link`:** https://documenter.getpostman.com/view/29582728/2sA2xjzrat
