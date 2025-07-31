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

## Quick Start

```bash
npm start
```


## Project Structure

```
Task-Tracker/
├── task-tracker-backend/
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── task-tracker-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Landingpage.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── RecentActivity.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── Tasklist.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── UpcomingTasks.jsx
│   │   │   └── WeeklyProgressChart.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   ├── api/
│   │   │   └── task.js
│   │   ├── utils/
│   │   │   └── taskUtils.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env
└── README.md
```

