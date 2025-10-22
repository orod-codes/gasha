# Security Service Platform

A comprehensive full-stack security service management platform built with React/TypeScript frontend and Node.js/Express backend. This platform provides enterprise-grade security service management with role-based access control, product management, request handling, and analytics.

## 🚀 Project Overview

The Security Service Platform is a complete solution for managing security services, including:

- **Multi-role Dashboard System**: Super Admin, Admin, Marketing, Technical, and Developer dashboards
- **Product Management**: Complete security product catalog and management
- **Request Management**: Customer product request handling and workflow
- **Task Management**: Technical task assignment and tracking
- **Deployment Management**: Product deployment monitoring and status tracking
- **Content Management**: Blog and content management system
- **Analytics & Reporting**: Comprehensive analytics and business intelligence
- **Real-time Notifications**: User notification system
- **Payment Integration**: Chapa payment gateway integration

## 🏗️ Project Structure

```
├── frontend/                    # React/TypeScript frontend application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── dashboard/      # Dashboard components
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── products/       # Product management components
│   │   │   ├── chatbot/       # Chatbot functionality
│   │   │   └── ui/            # Reusable UI components
│   │   ├── services/          # API service layer
│   │   ├── types/             # TypeScript type definitions
│   │   └── config/            # Frontend configuration
│   ├── public/                # Static assets
│   ├── dist/                  # Built application
│   └── package.json           # Frontend dependencies
├── backend/                   # Node.js/Express backend API
│   ├── src/
│   │   ├── controllers/       # Business logic controllers
│   │   ├── routes/           # API route definitions
│   │   ├── middleware/       # Authentication & validation
│   │   ├── models/           # Database models
│   │   ├── config/           # Database configuration
│   │   └── server.js         # Main server file
│   ├── database/
│   │   ├── migrations/        # Database schema migrations
│   │   └── seeds/            # Database seeding scripts
│   ├── uploads/              # File upload storage
│   ├── scripts/              # Utility scripts
│   └── package.json          # Backend dependencies
├── start.sh                   # Quick start script
├── start-backend.sh          # Backend start script
├── start-frontend.sh         # Frontend start script
└── README.md                 # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Supabase** for real-time features

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **Nodemailer** for email services
- **Winston** for logging

## 🚀 Quick Start

### Prerequisites
- Node.js (>=18.0.0)
- MongoDB
- npm or yarn

### 1. Clone and Install

```bash
git clone <repository-url>
cd project
```

### 2. Backend Setup

```bash
cd backend
npm install
cp env.example .env
# Edit .env with your configuration
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Database Setup

```bash
cd backend
npm run seed  # Seed initial data
```

## 🔧 Development

### Available Scripts

#### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with initial data
npm run test       # Run tests
npm run lint       # Run ESLint
npm run cleanup    # Clean up ports
```

#### Frontend Scripts
```bash
npm run dev        # Start development server (port 5173)
npm run dev:sa     # Super Admin dashboard (port 5174)
npm run dev:admin  # Admin dashboard (port 5175)
npm run dev:mkt    # Marketing dashboard (port 5176)
npm run dev:tech   # Technical dashboard (port 5177)
npm run dev:dev    # Developer dashboard (port 5178)
npm run build      # Build for production
npm run preview    # Preview production build
```

### Multi-Dashboard Development

The platform supports multiple dashboard instances for different user roles:

```bash
# Terminal 1 - Main frontend
npm run dev

# Terminal 2 - Super Admin Dashboard
npm run dev:sa

# Terminal 3 - Admin Dashboard
npm run dev:admin

# Terminal 4 - Marketing Dashboard
npm run dev:mkt

# Terminal 5 - Technical Dashboard
npm run dev:tech

# Terminal 6 - Developer Dashboard
npm run dev:dev
```

## 🔐 Authentication & Authorization

### User Roles
- **Super Admin**: Complete system access and user management
- **Admin**: Administrative access to products, requests, and tasks
- **Marketing**: Content management and campaign oversight
- **Technical**: Task and deployment management
- **Developer**: Development tools and system monitoring

### Security Features
- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting and CORS protection
- Helmet security headers

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Core Resources
- **Users**: `/api/users` - User management
- **Products**: `/api/products` - Product catalog
- **Requests**: `/api/requests` - Customer requests
- **Tasks**: `/api/tasks` - Task management
- **Deployments**: `/api/deployments` - Deployment tracking
- **Content**: `/api/content` - Content management
- **Notifications**: `/api/notifications` - User notifications
- **Analytics**: `/api/analytics` - System analytics

## 🎯 Key Features

### Dashboard System
- **Super Admin Dashboard**: Complete system overview and user management
- **Admin Dashboard**: Product and request management
- **Marketing Dashboard**: Content creation and campaign management
- **Technical Dashboard**: Task assignment and deployment monitoring
- **Developer Dashboard**: System monitoring and development tools

### Product Management
- Complete product catalog
- Product categorization and filtering
- Image upload and management
- Product status tracking

### Request Management
- Customer request submission
- Request status tracking
- Marketing and technical notes
- Request assignment and workflow

### Task Management
- Task creation and assignment
- Progress tracking
- Task completion workflow
- Team collaboration features

### Analytics & Reporting
- Dashboard analytics
- Request analytics
- Task performance metrics
- User activity tracking
- Content engagement metrics

## 🚀 Deployment

### Production Setup

1. **Environment Configuration**
   ```bash
   NODE_ENV=production
   DB_CONNECTION_STRING=your_production_db
   JWT_SECRET=your_secure_secret
   ```

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Start Backend**
   ```bash
   cd backend
   npm start
   ```

### Docker Support

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend type checking
cd frontend
npm run typecheck
```

## 📝 API Documentation

### Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the `backend/` directory

## 🔗 Quick Links

- [Backend API Documentation](./backend/README.md)
- [Development Commands](./DEV-COMMANDS.md)
- [Environment Setup](./backend/env.example)

---

**Security Service Platform** - Built with ❤️ for enterprise security management.
