# Ekart Final 2

Ekart Final 2 is a full-stack e-commerce project with three main parts:

- a customer-facing frontend
- an admin panel
- a backend API

The customer app lets users sign up, log in, browse products, manage the cart, place orders, and check order history. The admin panel is used to add products, edit products, manage product lists, and handle orders. The backend connects everything with authentication, product management, cart logic, order handling, payment support, and a real AI assistant powered by Gemini.

## Project overview

This project is built to cover the main flow of an online store.

### Customer side

- user registration and login
- Google login with Firebase
- protected routes for signed-in users
- home page, collections, product details, about, and contact pages
- add to cart and update cart quantity
- place order with cash on delivery
- place order with Razorpay
- view previous orders
- real AI shopping assistant with product-aware answers

### Admin side

- admin login
- dashboard
- add new products
- edit existing products from the product list
- view product list
- remove products
- manage customer orders
- update order status
- AI admin assistant for product and dashboard help

### Backend side

- JWT-based authentication with cookies
- user and admin auth middleware
- MongoDB database connection
- product image upload with Cloudinary
- cart and order APIs
- Razorpay payment flow
- user session handling
- Gemini-based AI route with live product and order context

## AI features

This project now includes a real AI assistant for both the customer app and the admin panel.

### Customer AI

- floating chatbot on the frontend
- answers product, price, size, availability, cart, login, signup, and order questions
- reads live product data from the database before answering
- understands English, Hinglish, and Hindi written in English letters
- replies in the same style as the user

### Admin AI

- separate chatbot inside the admin panel
- helps with dashboard, total products, total orders, add product, product list, and order workflow
- can help with product descriptions, better titles, and price suggestions based on current catalog data
- uses the same backend AI endpoint with admin mode support

### AI backend flow

- endpoint: `/api/ai/assistant`
- powered by Google Gemini
- uses live product catalog data and order count
- supports customer mode and admin mode
- returns safe project-related answers only

## Tech stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- React Toastify
- Firebase Authentication

### Admin panel

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- React Toastify

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT
- Cookie Parser
- Multer
- Cloudinary
- Razorpay
- Firebase

## Folder structure

```text
ekart final 2/
  frontend/   customer website
  admin/      admin dashboard
  backend/    API and database logic
```

## Frontend details

The `frontend` folder contains the customer website. It is built with React and Vite and uses context-based state management.

Main frontend pages include:

- login
- signup
- home
- collections
- product details
- cart
- place order
- order history
- about
- contact

Important frontend folders:

- `src/pages` contains the main screens
- `src/component` contains reusable UI parts
- `src/context` contains auth, user, and shop state
- `src/utils/Firebase.js` handles Google login setup

Frontend scripts:

```bash
cd frontend
npm install
npm run dev
```

Other useful scripts:

```bash
npm run build
npm run preview
npm run lint
```

## Admin panel details

The `admin` folder contains the admin dashboard used to manage the store.

Main admin pages include:

- login
- dashboard home
- add product
- edit product
- product list
- orders

Important admin folders:

- `src/pages` contains admin screens
- `src/components` contains layout components
- `src/context` handles admin auth and admin data

Admin scripts:

```bash
cd admin
npm install
npm run dev
```

Other useful scripts:

```bash
npm run build
npm run preview
npm run lint
```

## Backend details

The `backend` folder contains the Express server and all API logic.

Main API groups:

- `/api/auth` for registration, login, Google login, logout, and admin login
- `/api/user` for current user and admin data
- `/api/product` for adding, listing, editing, and removing products
- `/api/cart` for cart management
- `/api/order` for placing and managing orders
- `/api/ai` for the real AI assistant

Main backend features:

- secure user login with JWT
- admin-only routes with separate admin middleware
- Cloudinary image upload for products
- cart stored against the user record
- support for cash on delivery and Razorpay
- MongoDB models for users, products, and orders
- real AI prompt built from live products and order data
- separate AI behavior for customer and admin use

Backend scripts:

```bash
cd backend
npm install
npm run dev
```

To run the backend in normal mode:

```bash
npm start
```

## Root scripts

The root `package.json` includes a helpful development command that starts all three parts together.

```bash
npm install
npm run dev
```

This runs:

- backend with Nodemon
- frontend with Vite
- admin panel with Vite

## Environment variables

Create a `.env` file inside the `backend` folder and add values like these:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173
ADMIN_PANNEL=http://localhost:5174

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

GEMINI_API_KEY=your_gemini_api_key

NODE_ENV=development
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_APIKEY=your_firebase_api_key
```

Create a `.env` file inside the `admin` folder if needed:

```env
VITE_API_URL=http://localhost:3000
```

The admin panel automatically uses `http://localhost:3000` on localhost and can use `VITE_API_URL` in production.

## How to run the project locally

### Option 1: run everything together

From the root folder:

```bash
npm install
npm run dev
```

### Option 2: run each part separately

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Admin panel:

```bash
cd admin
npm install
npm run dev
```

## Deployment notes

- The frontend uses `VITE_API_URL` for backend requests.
- The admin panel uses localhost automatically during local development.
- CORS is already set up in the backend for frontend and admin URLs.
- User login cookies are being used, so frontend and backend must allow credentials.
- Product images are uploaded to Cloudinary.
- Razorpay is used for online payments.
- Gemini API is used for the real AI assistant.

## Highlighted project features

- Separate customer app and admin app
- Real product upload flow with multiple images
- Product edit flow from admin list to add-product form
- Protected user and admin routes
- Cart and order system
- Online payment support with Razorpay
- Google login support
- Real AI chatbot on the customer website
- Real AI assistant inside the admin panel
- Live AI answers based on current product data
- Ready-to-deploy frontend with Vercel rewrite config
- One root command to run the full project in development

## Things to improve later

- add search and filter documentation
- improve error handling in some API responses
- add automated tests
- move all hardcoded URLs to environment variables
- add better admin analytics

## Summary

Ekart Final 2 is a complete e-commerce project where users can shop from the frontend, admins can manage products and orders from a separate dashboard, and the backend handles authentication, uploads, payments, and a real Gemini-powered AI assistant for both customer and admin workflows.
