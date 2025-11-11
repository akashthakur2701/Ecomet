# Front Flow - E-commerce API Platform
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](#)
[![JWT](https://img.shields.io/badge/JWT-Secure-blue?style=for-the-badge)](#)

A comprehensive MERN stack application providing streamlined access to e-commerce product data through RESTful APIs. This platform reduces application development time by 20% through efficient API architecture and comprehensive documentation.

## Features
- **RESTful API Integration**: Well-structured endpoints for e-commerce operations
- **User Authentication**: Secure authentication system using JWT tokens
- **Data Validation**: Robust input validation and error handling
- **MongoDB Integration**: Efficient data storage and retrieval
- **Comprehensive Documentation**: Detailed API documentation for developers

## System Architecture

### JWT Authentication Workflow
<div style="padding: 20px; border: 2px solid #3498db; border-radius: 8px; margin: 20px 0;">
  <h4>Workflow of JWT Token for Login, Registration, and Logout</h4>
  <img width="829" height="450" alt="auth workflow" src="https://github.com/user-attachments/assets/9ad7428a-c57f-4138-9a10-da3da5ed6cee" />
</div>


---


### Database Model Architecture
<div style="padding: 20px; border: 2px solid #2ecc71; border-radius: 8px; margin: 20px 0;">
  <h4>Database Schema and Model Relationships</h4>
  <img width="829" height="582" alt="db schema" src="https://github.com/user-attachments/assets/d31c461a-2394-4ef8-89f4-977487d44a2e" />
</div>

## Tech Stack
### Frontend:
- React.js
- Material-UI
- Redux for state management
- Axios for API calls

### Backend:
- Node.js
- Express.js
- MongoDB
- JWT for authentication

## Project Structure
```
front-flow/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── tokenGeneration/
│   │   └── utils/
│   ├── public/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── vercel.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── Layout.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   └── package.json
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/front-flow.git
```

2. Install dependencies:
```bash
# Install backend dependencies
cd front-flow/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# In backend directory, create .env file
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000

# In frontend directory, create .env file
VITE_API_URL=your_backend_url
```

4. Run the application:
```bash
# Run backend (from backend directory)
npm run dev

# Run frontend (from frontend directory)
npm run dev
```

## Features in Detail

### User Authentication
- Secure registration and login system
- JWT token-based authentication
- Password hashing using bcrypt
- Role-based access control

### Data Validation
- Input validation using express-validator
- Error handling middleware
- Request sanitization

### API Architecture
- RESTful API design principles
- Modular route handling
- Middleware for authentication and validation
- Error handling middleware

## Performance Optimizations
- Efficient database queries
- Request caching
- Pagination for large datasets
- Data indexing

## Security Measures
- JWT authentication
- Request rate limiting
- Input sanitization
- CORS configuration
- Secure HTTP headers

## Deployment
The application is fully deployed on Vercel:
- Frontend: 
- Backend: 

### Deployment Configuration
The project includes necessary configuration files for Vercel deployment:
- `vercel.json` in the backend directory for API routes
- Environment variables configured in Vercel dashboard
- Automatic deployments on push to main branch

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request






## Frontend URL
Link: [https://ecomet-qw95.vercel.app/]

## Backend URL (Deployed on vercel with accnt btech1)
Link: [https://ecomet-livid.vercel.app/]


How we are handling the Security
1. SQL injection: using bcrypting.
2. XSS cross side scrypting: 
3. CSRF: Cross side request forging: Sol is using csrf tokens and they are stored in the client side, 
