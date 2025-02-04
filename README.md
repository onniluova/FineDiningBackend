# Fine Dining Backend

## Overview

This repository contains the backend for the Fine Dining application "Bijou." The backend is built using Node.js and provides all the necessary API endpoints to support the application's features, including user authentication, table reservations, and online food ordering.

# Technologies Used

- Node.js

- Express.js

- MariaDB

- JWT Authentication

# Installation and Setup

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14 or later)

- npm (Node Package Manager)

- MariaDB (if running locally)

## Clone the Repository
``git clone https://github.com/onniluova/FineDiningBackend.git ``
## Install dependencies
``cd FineDiningBackend``

# Run the Backend Server
``npm run dev``

This will start the backend server on the specified port (default: 5000).

# API Endpoints

## Authentication

- POST /api/auth/register - Register a new user

- POST /api/auth/login - Authenticate and retrieve a token

- POST /api/auth/logout - Log out the user

## User Management

- GET /api/users/profile - Retrieve user profile details

- PUT /api/users/update - Update user details

## Reservations

- POST /api/reservations - Make a table reservation

- GET /api/reservations - View reservations (Admin only)

- DELETE /api/reservations/:id - Cancel a reservation

## Orders

- POST /api/orders - Place a new order

- GET /api/orders - Retrieve all orders (Admin only)

- DELETE /api/orders/:id - Cancel an order

## Admin Features

- PUT /api/admin/reservations/:id - Modify reservations

- PUT /api/admin/orders/:id - Update order status

## Contributors

Onni Luova

Jan Nässling

Ilmari Elomaa
