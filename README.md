# Bug Reporting & Tracking System

A full-stack web application for reporting and tracking bugs with role-based access control.

# netlify live URL link : https://cute-sawine-7e2b38.netlify.app/

## Features

### Authentication & Roles
- **Reporter Role**: Can submit bugs and manage only their own reports
- **Admin Role**: Can view and manage all bugs in the system

### Bug Management
- Report bugs with title, description, and severity levels (Low/Medium/High)
- Track status progression: Open → In Progress → Closed
- Search bugs by title
- Filter by status and severity
- Real-time updates and management

### Technical Stack
- **Frontend**: React.js with modern hooks and state management
- **Backend**: Node.js with Express.js API
- **Database**: Simulated MongoDB with in-memory collections
- **Authentication**: JWT-based session management

## Getting Started

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Application runs on https://cute-sawine-7e2b38.netlify.app/


# admin account login data: 
email - pet@gmail.com
password - pet@123


## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Bug Management
- `GET /api/bugs` - Get bugs (filtered by role)
- `POST /api/bugs` - Create new bug report
- `PUT /api/bugs/:id` - Update bug status
- `GET /api/bugs/search` - Search and filter bugs

