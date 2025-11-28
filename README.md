# Langkasuka

A modern full-stack web application built with React and Express.js.

## 🏛️ Overview

Langkasuka is a full-stack item management application featuring:

- **Frontend**: React with Vite for fast development and optimized builds
- **Backend**: Express.js REST API with SQLite database
- **Full CRUD**: Create, Read, Update, and Delete operations

## 📁 Project Structure

```
langkasuka/
├── backend/          # Express.js API server
│   ├── index.js      # Main server file with API routes
│   └── package.json  # Backend dependencies
├── frontend/         # React application
│   ├── src/          # React source files
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
├── package.json      # Root package for project management
└── README.md         # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adzry/Cursorlang.git
   cd Cursorlang
   ```

2. Install all dependencies:
   ```bash
   npm run install:all
   ```

### Development

Run both frontend and backend in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
# Backend (port 3001)
npm run dev:backend

# Frontend (port 5173)
npm run dev:frontend
```

### Production Build

Build the frontend for production:

```bash
npm run build
```

Start the backend server:

```bash
npm start
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get single item |
| POST | `/api/items` | Create new item |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |
| GET | `/api/health` | Health check |

## 🛠️ Tech Stack

- **Frontend**
  - React 19
  - Vite
  - CSS3

- **Backend**
  - Node.js
  - Express.js
  - better-sqlite3

## 📝 License

ISC
