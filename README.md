# Ticket Booking System - Admin Panel

## Setup Instructions

### 1. Install Node.js Dependencies
```bash
cd backend
npm install
```

### 2. Start the Backend Server
```bash
npm start
```
The server will run on http://localhost:3000

### 3. Access Admin Panel
Open `admin.html` in your browser to view customer information.

### 4. How It Works
- When customers fill the order form, their data (Full Name, Email, Phone) is automatically sent to the backend
- The backend stores this data in `backend/customers.json`
- The admin panel displays all customer information in a table
- Data refreshes automatically every 5 seconds

## API Endpoints
- GET `/api/customers` - Get all customers
- POST `/api/customers` - Add new customer

## Files Structure
```
ticket-booking/
├── backend/
│   ├── server.js          # Node.js server
│   ├── package.json       # Dependencies
│   └── customers.json     # Customer data storage
├── admin.html             # Admin panel
└── [order pages]          # Customer order forms
```
