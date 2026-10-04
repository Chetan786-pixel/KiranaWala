<div align="center">

# 🛒 KiranaWala

### **Hyperlocal Smart Grocery Platform**

**A full-stack commerce platform connecting customers with neighbourhood stores.**

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=flat-square&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/Razorpay-Payments-3395FF?style=flat-square">
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white">
</p>

<p>
  <a href="https://kirana-wala-1nhp.vercel.app"><strong>🚀 Live Demo</strong></a>
  ·
  <a href="https://github.com/Jyatin/KiranaWala"><strong>📦 Repository</strong></a>
</p>

**Discover stores · Browse products · Order groceries · Manage inventory · Pay securely · Shop with AI**

</div>

---

## Overview

KiranaWala is a deployed hyperlocal grocery-commerce platform built around the workflow of **customers → neighbourhood stores → inventory → checkout → fulfilment**.

The platform supports separate customer and store-owner experiences, persistent commerce data, authenticated APIs, inventory/order management, Razorpay checkout, payment verification, automated tests, Docker-based development and CI workflows.

### What it solves

| 🛍️ Customer | 🏪 Store Owner |
|---|---|
| Discover local stores | Manage store profile |
| Browse products | Manage products |
| Build a cart | Manage inventory |
| Apply coupons | Manage orders |
| Checkout with Razorpay | Track fulfilment |
| Track orders | Operate from a dashboard |
| Use AI-assisted shopping | Serve local customers |

---

## Key Features

### 🛍️ Hyperlocal Commerce

- Customer and neighbourhood-store workflows
- Store discovery and product browsing
- Cart and checkout flow
- Order creation and order status tracking
- Coupon/discount support
- Customer dashboard
- Store-owner dashboard

### 📦 Inventory & Order Management

- Store-level product and inventory management
- Stock-aware ordering
- Order management for store owners
- Persistent order, product and customer data
- Backend validation of commerce operations

### 💳 Razorpay Payments

KiranaWala integrates Razorpay for online checkout with server-side payment handling.

- Razorpay order creation on the backend
- Server-side amount calculation/validation
- HMAC-SHA256 payment signature verification
- Payment service abstraction
- Payment status handling
- Sandbox integration tests

> The application uses Razorpay sandbox/test credentials for development and verification. Live payment credentials are not committed to the repository.

### 🔐 Authentication & Authorization

- JWT-based authentication
- Separate customer and store-owner access
- Protected backend routes
- Role-aware application flows

### 🤖 AI-Assisted Shopping

KiranaWala includes an AI-assisted shopping workflow that maps natural-language shopping intent into a basket-oriented experience, helping users move from **what they want** to **what they should add to their cart**.

### 🧪 Engineering & Quality

- Automated backend test suite
- Dedicated commerce and payment tests
- ESLint
- GitHub Actions CI workflows
- Docker and Docker Compose
- Production build verification
- Environment/secrets configuration

---

## Architecture

```text
                         ┌──────────────────────┐
                         │       Customer       │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Next.js / React App  │
                         │ TypeScript           │
                         └──────────┬───────────┘
                                    │ REST API
                                    ▼
                         ┌──────────────────────┐
                         │ Node.js / Express    │
                         │ API                  │
                         └──────┬───────┬───────┘
                                │       │
                 ┌──────────────┘       └──────────────┐
                 ▼                                     ▼
        ┌─────────────────┐                   ┌─────────────────┐
        │ MongoDB         │                   │ Auth / Commerce │
        │ Users           │                   │ JWT / Orders    │
        │ Stores          │                   │ Inventory       │
        │ Products        │                   │ Coupons         │
        │ Orders          │                   └────────┬────────┘
        └─────────────────┘                            │
                                                       ▼
                                             ┌──────────────────┐
                                             │ Razorpay         │
                                             │ Checkout         │
                                             │ Signature Verify │
                                             └──────────────────┘

                         ┌──────────────────────┐
                         │    Store Owner       │
                         │ Dashboard            │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         Inventory · Products
                         Orders · Fulfilment
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT |
| Payments | Razorpay |
| API | REST |
| Testing | Jest / Supertest project test suite |
| Code Quality | ESLint |
| Containers | Docker / Docker Compose |
| CI | GitHub Actions |
| Deployment | Vercel + Render |

---

## Repository Structure

```text
KiranaWala/
├── .github/workflows/          # CI workflows
├── src/                        # Next.js application
│   ├── app/                    # Routes and pages
│   ├── components/             # Reusable UI components
│   └── ...
├── server/                     # Express backend
│   ├── models/                 # MongoDB models
│   ├── routes/                 # REST API routes
│   ├── services/               # Backend services
│   └── __tests__/              # Backend/integration tests
├── public/                     # Static assets
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Payment Flow

```text
Customer
   │
   ▼
Cart / Checkout
   │
   ▼
Backend validates cart and calculates final amount
   │
   ▼
Backend creates Razorpay order
   │
   ▼
Razorpay Checkout
   │
   ▼
Payment response
   │
   ▼
Server-side HMAC-SHA256 verification
   │
   ▼
Order/payment status updated
```

The backend does not rely on a frontend-supplied amount when creating the payment order. Payment verification is covered by dedicated tests.

---

## Testing & Production Verification

The repository includes dedicated automated tests for commerce and payment behaviour, including Razorpay signature verification. The project also includes a production-readiness QA report covering the deployed application, backend, database persistence, payment sandbox flow, authorization, cart/stock behaviour and build verification.

Examples of verified areas:

- Next.js production build
- Express/Node backend
- MongoDB persistence
- Customer/store authentication
- Cart and checkout flow
- Razorpay sandbox payment flow
- HMAC-SHA256 signature verification
- Payment tests
- Commerce/order tests
- Docker configuration
- GitHub Actions CI
- Environment/secrets configuration

---

## Deployment

**Frontend:** Vercel  
**Backend:** Render  
**Database:** MongoDB  
**Payments:** Razorpay Sandbox

🚀 **Live application:** https://kirana-wala-1nhp.vercel.app

---

## Local Development

### Prerequisites

- Node.js 18+
- MongoDB
- npm
- Docker (optional)

### Clone

```bash
git clone https://github.com/Jyatin/KiranaWala.git
cd KiranaWala
npm install
```

### Environment variables

Create a local `.env` file using the variables required by the application. **Do not commit real credentials.**

Typical configuration includes database, JWT and Razorpay test credentials.

### Run

```bash
npm run dev
```

For the backend, use the project's server start command/configuration.

Docker is also supported:

```bash
docker compose up --build
```

---

## Engineering Highlights

- Full-stack customer + store-owner commerce workflows
- Server-side payment order creation and signature verification
- JWT authentication and protected API flows
- Inventory-aware ordering
- MongoDB-backed commerce state
- Dedicated payment and commerce test suites
- Dockerized development
- GitHub Actions CI
- Cloud deployment across Vercel and Render
- AI-assisted shopping workflow

---

## Author

<div align="center">

### Jyatin Singh

<a href="https://github.com/Jyatin">GitHub</a> ·
<a href="https://www.linkedin.com/in/jyatinsingh/">LinkedIn</a>

**Built for better local commerce.**

</div>
