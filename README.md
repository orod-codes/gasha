# Gasha Project

A full-stack application with React frontend and Express.js backend.

## Project Structure

```
├── frontend/          # React/TypeScript frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   ├── package.json  # Frontend dependencies
│   └── ...
├── backend/          # Express.js backend API
│   ├── src/          # Backend source code
│   ├── package.json  # Backend dependencies
│   └── ...
└── README.md         # This file
```

## Getting Started

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Development

```bash
cd backend
npm install
npm run dev
```

The backend API will be available at `http://localhost:3001`

### Environment Setup

1. Copy `backend/env.example` to `backend/.env`
2. Update the environment variables as needed

## Features

- **Frontend**: React with TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js API server
- **Payment Integration**: Chapa payment gateway
- **Dashboards**: Multiple admin dashboards
- **Authentication**: User management system
- **Chatbot**: Interactive chatbot functionality
- **Product Management**: Complete product catalog system

## Scripts

- `backend/push_project.sh` - Push project to GitHub
- `backend/upload_all.sh` - Upload all files
- `backend/push_to_github.sh` - GitHub push script

## Documentation

See the documentation files in the `backend/` directory for detailed information about specific features and integrations.
