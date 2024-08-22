# CRUD API

Hi everyone. This is an API I worked on as my project for day 2 and day 3. It performs simple CRUD operations (Create, Read, Update and Delete) and connects to a MongoDB database.

## Table of Contents
- [Project Overview](#project-overview)
- [NodeJS](#nodejs)
  - [Create](#create)
  - [Read](#read)
  - [Update](#update)
  - [Delete](#delete)
- [TypeScript](#typescript)
  - [Create](#create-1)
  - [Read](#read-1)
  - [Update](#update-1)
  = [Delete](#delete-1)

## Project Overview
```
/CRUD
|  NodeJS
|  |- config
|  |  |- db.js
|  |  |- env.js
|  |- controllers
|  |  |- userController.js
|  |- models
|  |  |- users.js
|  |- Routes
|  |  |- userRoute.js
|  |- app.js
|  |- package.json
|  TypeScript
|  |- src
|  |  |- config
|  |  |  |- db.ts
|  |  |  |- env.ts
|  |  |- controllers
|  |  |  |- user.controller.ts
|  |  |- models
|  |  |  |- users.ts
|  |  |- routes
|  |  |  |- user.route.ts
|  |  |- index.ts
|  |- package.json
|  |- tsconfig.json
```

## NodeJS

### app.js
This Node.js script uses Express to create a simple CRUP operations server with a default route that responds with a JSON "Welcome to my NodeJS server!" message.


### Create 

This API endpoint allows the creation of new users and saves them to the database.

#### Request 

**Route**

```
POST http://localhost:3100/user/create
```

**Payload Example**

```json
{
  "name": "Hephzy",
  "email": "hzdelight01@gmail.com"
}
```

#### Responses

On success, the API returns the created user object along with a status code of 201 (Created).

**Response Example**

- **Status Code:** `201 Created`

```json
{
  "message": "New user has been created",
  "newUser": {
    "name": "Hephzy",
    "email": "hzdelight01@gmail.com",
    "_id": "66c7926c7457846bb26790a5"
  }
}
```

If the email already exists in the database, it sends a 400 error code

**Response Example**

**Status Code:** `400 Bad Request`

```json
{
  "message": "User already exists"
}
```

If it is a server error, an error with status code 500 is sent

**Response Example**

**Status Code:** `500 Internal Server Error`

```json
{
  "message": "Internal Server Error",
  "error": "Error message"
}
```

### Read

This API endpoint retrieves a specific user from the database by email.

#### Request

**Route**

- To get a user by email:  
  ```
  GET http://localhost:3100/user/get
  ```

**Payload Example**

```json
{
  "message": "hzdelight01@gmail.com"
}
```

#### Response

On success, the API returns a single user object based on email.

**Response Example**

**Status Code:** `200 OK`

```json
{
  "message": "Here is the user details: ",
  "findUser": {
    "_id": "66c7926c7457846bb26790a5",
    "name": "Hephzy",
    "email": "hzdelight01@gmail.com",
    "__v": 0
  }
}
```

If user cannot be found

**Response Example**

**Status Code:** `400 Bad Request`

```json
{
  "message": "User not found"
}
```

### Update

This API endpoint updates an existing user's details, specifically user names, in the database.

#### Request

**Route**

```
PUT http://localhost:3100/user/update
```

**Payload Example**

```json
{
  "name": "Hephzibah",
  "email": "hzdelight01@gmail.com"
}
```

#### Response

On success, the API returns the updated user object along with a status code of 200 (OK).

**Response Example**

**Status Code:** `200 OK`

```json
{
  "message": "User name has been updated"
}
```

If user cannot be found

**Response Example**

**Status Code:** `400 Bad Request`

```json
{
  "message": "User not found"
}
```

### Delete

This API endpoint deletes a user from the database.

#### Request

**Route**

```
DELETE http://localhost:3100/user/delete
```

#### Response

On success, the API returns a message confirming the deletion along with a status code of 200 (OK).

**Response Example**

**Status Code:** `200 OK`

```json
{
  "message": "User details has been deleted"
}
```

**Response Example**

**Status Code:** `400 Bad Request`

```json
{
  "message": "User not found"
}
```

## TypeScript

### index.ts
This TypeScript script uses Express to create a simple CRUP operations server with a default route that responds with a JSON "Welcome to my TypeScript server!" message.


### Create 

This API endpoint allows the creation of new users and saves them to the database.

#### Request 

**Route**

```
POST http://localhost:4080/user/create
```

**Payload Example**

```json
{
  "name": "Hephzy",
  "email": "hzdelight01@gmail.com"
}
```

#### Responses

On success, the API returns the created user object along with a status code of 201 (Created).

**Response Example**

- **Status Code:** `201 Created`

```json
{
  "message": "New user has been created",
  "newUser": {
    "name": "Hephzy",
    "email": "hzdelight01@gmail.com",
    "_id": "66c7926c7457846bb26790a5"
  }
}
```

If the email already exists in the database, it sends a 400 error code

**Response Example**

**Status Code:** `400 Bad Request`

```json
{
  "message": "User already exists"
}
```

If it is a server error, an error with status code 500 is sent

**Response Example**

**Status Code:** `500 Internal Server Error`

```json
{
  "message": "Internal Server Error",
  "error": "Error message"
}
```

### Read

This API endpoint retrieves a specific user from the database by email.

#### Request

**Route**

- To get a user by email:  
  ```
  GET http://localhost:4080/user/get
  ```

**Payload Example**

```json
{
  "message": "hzdelight01@gmail.com"
}
```

#### Response

On success, the API returns a single user object based on email.

**Response Example**

**Status Code:** `200 OK`

```json
{
  "message": "Here is the user details: ",
  "findUser": {
    "_id": "66c7926c7457846bb26790a5",
    "name": "Hephzy",
    "email": "hzdelight01@gmail.com",
    "__v": 0
  }
}
```

If user cannot be found

**Response Example**

**Status Code:** `400 Bad Request`

```json
{
  "message": "User not found"
}
```

### Update

This API endpoint updates an existing user's details, specifically user names, in the database.

#### Request

**Route**

```
PUT http://localhost:4080/user/update
```

**Payload Example**

```json
{
  "name": "Hephzibah",
  "email": "hzdelight01@gmail.com"
}
```

#### Response

On success, the API returns the updated user object along with a status code of 200 (OK).

**Response Example**

**Status Code:** `200 OK`

```json
{
  "message": "User name has been updated"
}
```

If user cannot be found

**Response Example**

**Status Code:** `400 Bad Request`

```json
{
  "message": "User not found"
}
```

### Delete

This API endpoint deletes a user from the database.

#### Request

**Route**

```
DELETE http://localhost:4080/user/delete
```

#### Response

On success, the API returns a message confirming the deletion along with a status code of 200 (OK).

**Response Example**

**Status Code:** `200 OK`

```json
{
  "message": "User details has been deleted"
}
```

**Response Example**

**Status Code:** `400 Bad Request`

```json
{
  "message": "User not found"
}
```


## License
This project is licensed under the General public License. Feel free to use and modify the code.

---

This took me way longer than I'd like to finish but at least it's done now.