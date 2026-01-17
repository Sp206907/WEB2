# Blog API - Node.js & MongoDB CRUD Application

A fully functional RESTful API for a simple blogging platform, built as part of Assignment 3.

## 🚀 Features

* **Full CRUD API**: Create, Read, Update, and Delete blog posts.
* **Database Integration**: MongoDB with Mongoose schemas.
* **Data Validation**: Title and Body are required; Author defaults to "Anonymous".
* **Automated Timestamps**: Automatically tracks `createdAt` and `updatedAt`.
* **Simple Frontend**: A basic web interface to interact with the API.

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB (via Mongoose)
* **Frontend**: Vanilla HTML5, CSS3, JavaScript

## 📋 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| **POST** | `/blogs` | Create a new blog post |
| **GET** | `/blogs` | Retrieve all blog posts |
| **GET** | `/blogs/:id` | Retrieve a single post by ID |
| **PUT** | `/blogs/:id` | Update a post by ID |
| **DELETE** | `/blogs/:id` | Delete a post by ID |

## ⚙️ Installation & Setup

1. **Clone the repository**:
```bash
git clone <your-repository-link>
cd <your-folder-name>

```


2. **Install dependencies**:
```bash
npm install

```


3. **Database Setup**:
* Ensure **MongoDB Compass** is running locally at `mongodb://localhost:27017/`.
* The application will automatically create a database named `Blogs`.


4. **Run the server**:
```bash
node server.js

```


*The server will start on `http://localhost:3001*`

## 📁 Project Structure

* `server.js` - Main entry point and Express routes.
* `Blog.js` - Mongoose schema and model definition.
* `public/` - Static files for the frontend (HTML, CSS, JS).
* `package.json` - Project metadata and dependencies.

---

