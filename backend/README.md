# Security Service Backend API

A comprehensive backend API for the Security Service Platform built with Node.js, Express, and PostgreSQL.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Complete user CRUD operations with role management
- **Product Management**: Security product catalog and management
- **Request Management**: Customer product request handling
- **Task Management**: Technical task assignment and tracking
- **Deployment Management**: Product deployment monitoring
- **Content Management**: Blog and content management system
- **Notification System**: Real-time notifications
- **Analytics**: Comprehensive analytics and reporting
- **Database**: PostgreSQL with proper migrations and seeding

## 🏗️ Architecture

```
backend/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic controllers
│   ├── middleware/      # Authentication & validation middleware
│   ├── routes/          # API route definitions
│   └── server.js        # Main server file
├── database/
│   ├── migrations/      # Database schema migrations
│   └── seeds/           # Database seeding scripts
└── package.json
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=security_service
DB_USER=your_username
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Server Configuration
PORT=3000
NODE_ENV=development

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# CORS Configuration
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:5177,http://localhost:5178
```

### 3. Database Setup

Create the PostgreSQL database:

```sql
CREATE DATABASE security_service;
```

Run migrations to create tables:

```bash
npm run migrate
```

Seed the database with initial data:

```bash
npm run seed
```

### 4. Start the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 📊 Database Schema

### Core Tables

- **users**: User accounts with role-based access
- **products**: Security product catalog
- **requests**: Customer product requests
- **tasks**: Technical task management
- **deployments**: Product deployment tracking
- **content**: Blog and content management
- **notifications**: User notifications
- **analytics**: System metrics and analytics

### User Roles

- **super-admin**: Complete system access
- **admin**: Administrative access
- **marketing**: Content and campaign management
- **technical**: Task and deployment management
- **developer**: Development tools access

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/register` - Register new user (admin only)

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Requests
- `GET /api/requests` - Get all requests
- `GET /api/requests/:id` - Get request by ID
- `POST /api/requests` - Create request
- `PUT /api/requests/:id/status` - Update request status (admin)
- `PUT /api/requests/:id/marketing-notes` - Add marketing notes
- `PUT /api/requests/:id/technical-notes` - Add technical notes

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create task (admin/technical)
- `PUT /api/tasks/:id` - Update task
- `PUT /api/tasks/:id/complete` - Complete task

### Deployments
- `GET /api/deployments` - Get all deployments
- `GET /api/deployments/:id` - Get deployment by ID
- `POST /api/deployments` - Create deployment (admin/technical)
- `PUT /api/deployments/:id/start` - Start deployment
- `PUT /api/deployments/:id/complete` - Complete deployment

### Content
- `GET /api/content` - Get all content
- `GET /api/content/:id` - Get content by ID
- `POST /api/content` - Create content (marketing/admin)
- `PUT /api/content/:id` - Update content
- `PUT /api/content/:id/publish` - Publish content

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/:id` - Get notification by ID
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/all/read` - Mark all as read

### Analytics
- `GET /api/analytics/dashboard` - Dashboard analytics
- `GET /api/analytics/requests` - Request analytics
- `GET /api/analytics/tasks` - Task analytics
- `GET /api/analytics/users` - User analytics
- `GET /api/analytics/content` - Content analytics

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Granular permissions by user role
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Cross-origin resource sharing configuration
- **Helmet Security**: Security headers and protection
- **Password Hashing**: Bcrypt password hashing

## 📈 Monitoring & Analytics

- **Health Check**: `/health` endpoint for system status
- **Request Logging**: Morgan HTTP request logging
- **Error Handling**: Comprehensive error handling and logging
- **Performance Monitoring**: Built-in performance tracking

## 🚀 Deployment

### Production Setup

1. Set `NODE_ENV=production` in your environment
2. Configure production database
3. Set secure JWT secret
4. Configure CORS for production domains
5. Set up SSL/TLS certificates
6. Configure reverse proxy (nginx/Apache)

### Docker Support

```dockerfile
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
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 API Documentation

The API follows RESTful conventions with JSON responses:

### Success Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]
}
```

## 🔧 Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with initial data
- `npm run db:reset` - Reset database (migrate + seed)
- `npm test` - Run tests
- `npm run lint` - Run ESLint

### Code Structure

- **Controllers**: Handle business logic and database operations
- **Routes**: Define API endpoints and middleware
- **Middleware**: Authentication, validation, and security
- **Models**: Database models and queries
- **Config**: Database and application configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Security Service Backend API** - Built with ❤️ for enterprise security management.


