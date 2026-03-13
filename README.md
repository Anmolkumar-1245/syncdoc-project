# SyncDoc - Collaborative Document Editor

## Overview

SyncDoc is a real-time collaborative document editing platform where multiple users can edit documents simultaneously.
It also includes live chat, file sharing, and AI-powered document assistance.

## Features

* Real-time collaborative document editing
* Live chat between collaborators
* File sharing inside chat
* AI-powered document summarization and grammar correction
* Role-Based Access Control (Owner, Editor, Viewer)
* Document dashboard for managing documents

## Tech Stack

**Frontend**

* React
* Quill Editor
* Socket.io Client

**Backend**

* Node.js
* Express.js
* Socket.io

**Database**

* MongoDB

**Other Services**

* Cloudinary (file uploads)
* Google Gemini API (AI features)

## Project Structure

syncdoc
│
├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── middleware
│ └── server.js
│
├── frontend
│ ├── public
│ ├── src
│ └── package.json
│
└── README.md

## Installation

### 1. Clone the repository

git clone https://github.com/Anmolkumar-1245/syncdoc-project.git

### 2. Install backend dependencies

cd backend
npm install

### 3. Install frontend dependencies

cd ../frontend
npm install

### 4. Setup environment variables

Create a `.env` file inside the backend folder and add:

MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_KEY=your_cloudinary_key

### 5. Run the backend server

cd backend
node server.js

### 6. Run the frontend

cd frontend
npm start

The application will run on:
http://localhost:3000

## Concurrency Handling

Real-time collaboration is implemented using Socket.io.
When a user edits the document, changes are sent as deltas from the Quill editor and broadcast to all connected users in the same document room. This ensures that all users see updates instantly.

## Author

Anmol Kumar
