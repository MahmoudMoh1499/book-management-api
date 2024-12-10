# Book Management API Documentation

## Overview

The **Book Management API** allows you to manage a collection of books. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on books, with secure access using **Basic Authentication**.

The API is fully documented using **Swagger UI**, making it easy to view and test all available endpoints.

## How to Run the Application

### Prerequisites:

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.x or higher)
- **npm** (Node Package Manager)
- A **MySQL** or **PostgreSQL** database instance

### Steps to Run the Application:

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   ```

2. **Install dependencies:**

```bash
    npm install
  ```

3. **Set up environment variables:**

Create a .env file in the root directory and configure the following variables:

```bash
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432  # Adjust based on your database setup
    DB_USER=your_db_user
    DB_PASS=your_db_password
    DB_NAME=book_management_db
    BASIC_AUTH_USERNAME=your_username
    BASIC_AUTH_PASSWORD=your_password
  ```

4. **Run database migrations (if you're using TypeORM or another database migration tool):**

  ```bash
    npm run typeorm migration:run
  ```

5. **Start the server:**

  ```bash
    npm start
  ```

6. **Access the API:**

The API will be available at `http://localhost:3000.`
Swagger documentation for the API can be accessed at:
`http://localhost:3000/api-docs.`

7. **Demo:**

You can check out the live demo of the Todo List application [here](<https://youtu.be/HR1AgUxCnq0>).
