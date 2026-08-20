# 🍽️ Restaurant Management API

A RESTful backend API for managing **Restaurants, Menu Items, and User Authentication** using **Node.js, Express.js, MongoDB, JWT, and bcrypt**.

This project was developed as part of **Backend Development – Assignment **.

---

## 📌 Objective

The objective of this project is to build a RESTful API that allows users to:

* Register and log in securely
* Authenticate users using JWT
* Manage restaurants
* Add and manage restaurant menu items
* Store restaurant, menu, and user data in MongoDB
* Perform CRUD operations through REST API endpoints

---

## 🛠️ Technologies Used

* **Node.js** – Backend runtime environment
* **Express.js** – Web framework for creating REST APIs
* **MongoDB** – Database for storing application data
* **Mongoose** – MongoDB ODM and schema management
* **bcryptjs** – Password hashing
* **jsonwebtoken (JWT)** – User authentication
* **dotenv** – Environment variable management
* **Postman** – API testing

---

## 📂 Entities

### 👤 Users

| Field      | Type     | Description                  |
| ---------- | -------- | ---------------------------- |
| `_id`      | ObjectId | Unique user ID               |
| `username` | String   | Username                     |
| `email`    | String   | User email                   |
| `password` | String   | Hashed password using bcrypt |

### 🍴 Restaurants

| Field     | Type     | Description          |
| --------- | -------- | -------------------- |
| `_id`     | ObjectId | Unique restaurant ID |
| `name`    | String   | Restaurant name      |
| `city`    | String   | Restaurant city      |
| `address` | String   | Restaurant address   |
| `cuisine` | String   | Type of cuisine      |
| `rating`  | Number   | Restaurant rating    |

### 🍕 Menu Items

| Field          | Type     | Description                 |
| -------------- | -------- | --------------------------- |
| `_id`          | ObjectId | Unique menu item ID         |
| `restaurantId` | ObjectId | Reference to the Restaurant |
| `name`         | String   | Menu item name              |
| `price`        | Number   | Menu item price             |
| `isAvailable`  | Boolean  | Availability status         |

---

# 🔐 Authentication

The API uses **JWT (JSON Web Token)** for authentication.

### Authentication Flow

1. User registers using `/register`.
2. Password is securely hashed using **bcrypt**.
3. User logs in using `/login`.
4. Server verifies the email and password.
5. A JWT token is generated.
6. The token must be sent in the `Authorization` header for protected routes.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 🚀 API Endpoints

## 🔑 Authentication APIs

### Register User

```http
POST /register
```

Registers a new user and stores the user details in MongoDB.

Example request:

```json
{
  "username": "mahek",
  "email": "mahek@example.com",
  "password": "123456"
}
```

---

### Login User

```http
POST /login
```

Logs in an existing user and generates a JWT token.

Example request:

```json
{
  "email": "mahek@example.com",
  "password": "123456"
}
```

The returned JWT token should be used for protected API requests.

---

### Welcome Route

```http
GET /
```

Returns a welcome message for the Restaurant Management API.

Example response:

```json
{
  "message": "Welcome to Restaurant API"
}
```

---

# 🍴 Restaurant APIs

### Get All Restaurants

```http
GET /restaurants
```

Returns a list of all restaurants stored in MongoDB.

---

### Get Restaurant by ID

```http
GET /restaurants/:id
```

Returns a specific restaurant using its MongoDB ObjectId.

Example:

```http
GET /restaurants/64abc123...
```

---

### Add a Restaurant

```http
POST /restaurants
```

Adds a new restaurant.

🔒 **JWT authentication required**

Example request:

```json
{
  "name": "Spice Garden",
  "city": "Mumbai",
  "address": "MG Road",
  "cuisine": "Indian",
  "rating": 4.5
}
```

---

### Update Restaurant

```http
PUT /restaurants/:id
```

Updates restaurant details.

🔒 **JWT authentication required**

Example:

```json
{
  "name": "Spice Garden Restaurant",
  "city": "Mumbai",
  "address": "MG Road",
  "cuisine": "North Indian",
  "rating": 4.7
}
```

---

### Delete Restaurant

```http
DELETE /restaurants/:id
```

Deletes a restaurant using its ID.

🔒 **JWT authentication required**

---

# 🍕 Menu Item APIs

### Get Restaurant Menu

```http
GET /restaurants/:id/menu
```

Returns all menu items belonging to a particular restaurant.

---

### Add Menu Item

```http
POST /restaurants/:id/menu
```

Adds a new menu item to a restaurant.

🔒 **JWT authentication required**

Example request:

```json
{
  "name": "Paneer Tikka",
  "price": 250,
  "isAvailable": true
}
```

---

### Update Menu Item

```http
PUT /menu/:id
```

Updates the details of a menu item.

🔒 **JWT authentication required**

Example:

```json
{
  "name": "Paneer Tikka Masala",
  "price": 280,
  "isAvailable": true
}
```

---

### Delete Menu Item

```http
DELETE /menu/:id
```

Deletes a menu item using its ID.

🔒 **JWT authentication required**

---

# 📋 API Summary

| Method | Endpoint                | Authentication |
| ------ | ----------------------- | -------------- |
| POST   | `/register`             | ❌              |
| POST   | `/login`                | ❌              |
| GET    | `/`                     | ❌              |
| GET    | `/restaurants`          | ❌              |
| GET    | `/restaurants/:id`      | ❌              |
| POST   | `/restaurants`          | ✅ JWT          |
| PUT    | `/restaurants/:id`      | ✅ JWT          |
| DELETE | `/restaurants/:id`      | ✅ JWT          |
| GET    | `/restaurants/:id/menu` | ❌              |
| POST   | `/restaurants/:id/menu` | ✅ JWT          |
| PUT    | `/menu/:id`             | ✅ JWT          |
| DELETE | `/menu/:id`             | ✅ JWT          |

---

# ⚙️ Installation and Setup

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project:

```bash
cd restaurant-management-api
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create Environment Variables

Create a `.env` file in the root directory.

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Environment Variables

| Variable     | Purpose                                           |
| ------------ | ------------------------------------------------- |
| `PORT`       | Port on which the server runs                     |
| `MONGO_URI`  | MongoDB database connection string                |
| `JWT_SECRET` | Secret key used to generate and verify JWT tokens |

> **Note:** Do not upload your `.env` file or MongoDB credentials to GitHub.

---

## 4. Start the Server

For normal execution:

```bash
node server.js
```

If a development script is configured:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:4000
```

---

# 🧪 Testing with Postman

The APIs can be tested using **Postman**.

Recommended testing order:

### Step 1 — Register

```http
POST /register
```

Create a new user.

### Step 2 — Login

```http
POST /login
```

Copy the JWT token returned by the server.

### Step 3 — Authenticate

For protected requests, add:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Step 4 — Test Restaurants

Test:

```text
GET    /restaurants
POST   /restaurants
GET    /restaurants/:id
PUT    /restaurants/:id
DELETE /restaurants/:id
```

### Step 5 — Test Menu Items

Test:

```text
GET    /restaurants/:id/menu
POST   /restaurants/:id/menu
PUT    /menu/:id
DELETE /menu/:id
```

---

# 🔒 Security Features

* Passwords are **hashed using bcrypt** before being stored in MongoDB.
* JWT is used to authenticate users.
* Protected restaurant and menu operations require a valid JWT token.
* Sensitive configuration such as the MongoDB URI and JWT secret is stored using environment variables.

---

# 🗄️ Database

The project uses **MongoDB** as the primary database.

The database contains collections for:

```text
Users
Restaurants
Menu Items
```

Menu items contain a reference to the restaurant they belong to using MongoDB's `ObjectId`.

---

# 📁 Suggested Project Structure

```text
restaurant-management-api/
│
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   ├── Restaurant.js
│   └── Menu.js
│
├── routes/
│   ├── auth.js
│   ├── restaurant.js
│   └── menu.js
│
├── middleware/
│   └── auth.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

# 🎯 Learning Outcomes

Through this assignment, the following backend development concepts were implemented:

* RESTful API development
* Express.js routing
* MongoDB database integration
* Mongoose schemas and models
* CRUD operations
* Password hashing with bcrypt
* JWT-based authentication
* Middleware
* Environment variables
* API testing using Postman

---

# 👩‍💻 Author

**Mahek Yadav**

B.Tech – Computer Science & Engineering
ITM Skills University

---

## 📜 Assignment

**Assignment 3 – Restaurant Management API**

Backend Development

**Technologies:** Node.js | Express.js | MongoDB | Mongoose | JWT | bcrypt
