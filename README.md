# Task Tracker

A full-stack task management application built with React, Node.js, and MongoDB. Features user authentication, task management, progress tracking, and analytics dashboard.

## Features

- User authentication with JWT and Google OAuth
- Create, edit, delete, and organize tasks
- Dashboard with progress charts and statistics
- Recent activity tracking
- Responsive design with Tailwind CSS
- Protected routes and secure access

## Tech Stack

**Frontend:** React 19, React Router, Tailwind CSS, Framer Motion, Recharts  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Passport.js

## Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Google OAuth credentials

## Quick Start

### Backend Setup

```bash
cd task-tracker-backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

Start server:

```bash
npm start
```

### Frontend Setup

```bash
cd task-tracker-frontend
npm install
```

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

Start application:

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/google` - Google OAuth login

### Tasks

- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/complete` - Mark complete

## Project Structure

```
Task-Tracker/
├── task-tracker-backend/
│   ├── models/          # MongoDB schemas
│   ├── server.js        # Express server
│   └── package.json
├── task-tracker-frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── api/         # API utilities
│   │   └── utils/       # Helper functions
│   └── package.json
└── README.md
```

## Environment Variables

**Backend (.env):**

- `PORT` - Server port
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

**Frontend (.env):**

- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_GOOGLE_CLIENT_ID` - Google OAuth client ID

## Deployment

1. Set environment variables on hosting platform
2. Deploy backend to Heroku/Railway/Vercel
3. Deploy frontend to Netlify/Vercel/GitHub Pages
4. Update API URLs in frontend environment

## License

ISC License
