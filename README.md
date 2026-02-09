# Library Management System

A simple command-line library management system built with TypeScript. It allows managing books (add, remove), users, and library operations like borrowing and returning books. State is persisted in `libraryState.json`.

## Features
- Add, remove, and list books.
- Borrow and return books.
- Persistent data storage using JSON.

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- TypeScript (installed via npm)

## Installation
1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd "Library Management System"
   ```
2. Install dependencies:
   ```
   npm install
   ```

## Usage
### Compile and Run
Compile TypeScript files and run the application:
```
npx tsc && node build/main.js
```

For development (one-time run):
- Add to `package.json` scripts: `"dev": "tsc && node build/main.js"`
- Then: `npm run dev`


### Interactive Mode
Run the app to access the menu-driven interface for library operations.

## Project Structure
- `src/`: Source TypeScript files
  - `book.ts`: Book entity and operations.
  - `user.ts`: User entity and authentication.
  - `library.ts`: Core library management logic.
  - `serialization.ts`: JSON serialization for persistence.
  - `main.ts`: Entry point with CLI menu.
- `build/`: Compiled JavaScript files.
- `libraryState.json`: Persistent data file.
- `package.json`: Dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.
