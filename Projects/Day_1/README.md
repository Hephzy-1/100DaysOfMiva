# Hello World API

Hi everyone. This marks day 1 out of 100 and I have created a simple API which returns a "Hello World!" message as a JSON response when accessed via an HTTP GET request.

## Table of Contents
- [Project Structure](#project-structure)
- [Node.js](#nodejs)
  - [Installation and Usage](#installation-and-usage)

## Project Structure

```
/HelloWorldAPI
|- app.js
|- package.json
```

## Node.js

### app.js
This Node.js script uses Express to create a simple server that responds with a JSON "Hello, World!" message.

### package.json
This file contains the project metadata and dependencies required to run the Node.js application.

#### Installation and Usage
1. **Prerequisites**: Node.js and npm installed on your system.
2. Create a new folder called `HelloWorldAPI` and navigate to the directory.
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. For development mode (with auto-reloading):
   ```bash
   npm run dev
   ```
6. Access the API by visiting `http://localhost:3000/` in your browser, or to whatever port you specified in your project. You should also have this message showing in your terminal:
   ```bash
   Server is running on port 3000
   ```

### Example Response
```json
{
  "message": "Hello, World!"
}
```

## License
This project is licensed under the General public License. Feel free to use and modify the code.

---

I'm hoping to learn to improve my documentation skills so let's watch me improve daily 😄💖
