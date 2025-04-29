# Blog App Backend

The **Blog App Backend** is a robust and scalable RESTful API built with Node.js and Express. It powers the frontend by providing endpoints for managing blog posts, users, comments, and categories.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT-based authentication.
- **CRUD Operations**: Create, read, update, and delete blog posts, comments, and categories.
- **Pagination**: Efficiently handle large datasets with paginated responses.
- **Search and Filtering**: Search blog posts by keywords and filter by categories.
- **Error Handling**: Centralized error handling for consistent API responses.
- **Static File Serving**: Serve uploaded files such as images.

## 🛠️ Tech Stack

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: For secure user authentication.
- **Cors**: For handling cross-origin requests.
- **Dotenv**: For managing environment variables.

## 📂 Folder Structure

```
src/
├── config/        # Database and environment configuration
├── controllers/   # Route handlers
├── middleware/    # Custom middleware (e.g., authentication, error handling)
├── models/        # Mongoose models
├── routes/        # API routes
├── uploads/       # Static file uploads
└── server.js      # Entry point
```

## ⚙️ Environment Variables

The project uses environment variables for configuration. Create a `.env` file in the root directory with the following:

```
PORT=<Your Port>
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
```

## 🖥️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud-based)

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd blog-app-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

4. The API will be available at:

    ```
    http://localhost:<Your port>
    ```

## 🚀 Deployment

The backend is deployed on **Render**. Visit the live API here: [https://strings-backend-rum0.onrender.com](https://strings-backend-rum0.onrender.com).

## 📖 API Documentation

### Base URL

```
https://strings-backend-rum0.onrender.com/api
```

### Endpoints

#### **Posts**
- `GET /posts`: Fetch all posts with pagination and filtering.
- `POST /posts`: Create a new post (requires authentication).

#### **Users**
- `POST /users/login`: Login a user.
- `POST /users/register`: Register a new user.

#### **Comments**
- `GET /comments`: Fetch comments for a post.
- `POST /comments`: Add a comment to a post.

...and more.  
