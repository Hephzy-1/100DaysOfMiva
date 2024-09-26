# Airbnb FullStack Project
Hi, it's me again and for the past few days I have been creating a full stack Airbnb website. I used React for the Frontend and TypeScript for the Backend. Two languages I am just learning. Don't worry, I'll be taking you throught the steps from scratch.

## Table Of Content
- [Project Overview](#project-overview)
- [Frontend]
- [Backend](#backend-development)

## Project Overview
```
/Airbnb
| frontend
| | node_modules
| | public 
| | |- airbnb-logo
| | |- index.html
| | src
| backend
| | node_modules
| | src
| | | config
| | | |- db.ts
| | | |- env.ts
| | | |- passport.ts
| | | controllers
| | | |- auth.controller.ts
| | | middlewares
| | | |- authMiddle.ts
| | | |- logger.ts
| | | models
| | | |- userModel.ts
| | | routes
| | | |- auth.route.ts
| | | utils
| | | | validators
| | | | |- userValid.ts
| | | |- email.ts
| | | |- hash.ts
| | | |- jwt.ts
| | |- index.ts
| |- .env
| |- package.json
| |- package-lock.json
| |- tsconfig.json
```

## Backend Development
This was a lot f fun but I still had some bugs while creating it so... Let's get right into it. How to create your own AirBnb Web Server.

### Installation and Usage
I used typescript for this and added a few other packages to this project. Here is the installation steps from scratch.

#### Steps
1. **Prerequisites** Ensure you have Node and npm installed. Additionally, you can install typescript globally 
  ```bash
  npm install -g typescript
  ```
2. navigate to the `Backend` directory2';2;gh
3. Install the necessary dependencies and the dev dependencies:
   ```bash
   npm install 
   ```
4. Create a `tsconfig.json` file to configure TypeScript:
   ```bash
   npx tsc --init
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. For development mode (with auto-reloading):
   ```bash
   npm run dev
   ```
7. Access the API by visiting `http://localhost:3000/` in your browser, or to whatever port you specified in your project. You should also have this message showing in your terminal:
   ```bash
   Server is running on port 3000
   ```
