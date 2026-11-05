# OpenTab API

A lightweight Express.js API for managing debtors and tab records. The service lets you create debt profiles, track tabs and items, mark items as paid/unpaid, and query debtor summaries from a MongoDB database.

## Features

- Create and list debtor profiles
- Create one or more tabs for a debtor
- Add, update, delete, and bulk-delete tab items
- Mark individual items as paid or unpaid
- Deactivate or remove tabs
- Query a debtor's debt profile with associated tabs
- Health check endpoint for uptime monitoring
- Validation with Zod
- MongoDB persistence via Mongoose

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Zod validation
- Jest + Supertest for testing
- dotenv for environment configuration

## Project Structure

```text
OpenTab-api/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── debtor.controller.js
│   │   └── tab.controller.js
│   ├── middlewares/
│   ├── models/
│   │   ├── debtor.model.js
│   │   └── tab.model.js
│   ├── routes/
│   │   ├── debtors.route.js
│   │   ├── reports.route.js
│   │   └── tabs.route.js
│   ├── schemas/
│   │   ├── debtor.schema.js
│   │   └── tab.schema.js
│   ├── services/
│   ├── tests/
│   └── utils/
├── .env.example
├── .gitignore
├── eslint.config.js
├── package.json
├── package-lock.json
├── README.md
└── .prettierrc
```

## Requirements

- Node.js 18+
- MongoDB instance running locally or remotely
- npm

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ray1e/OpenTab-api.git
cd OpenTab-api
```

2. Install dependencies:

```bash
npm install
```

3. Create your environment file:

```bash
cp .env.example .env
```

4. Update the environment values in `.env`:

```env
MONGO_URI=mongodb://localhost:27017
PORT=5000
ENVIRONMENT=development
```

## Running the app

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server starts on the configured `PORT` (default: `5000`).

## API Overview

Base URL:

```text
/api/v1
```

### Health check

```http
GET /api/v1/health
```

Returns a basic status payload including API uptime and timestamp.

### Debtors

```http
POST /api/v1/debtors
GET /api/v1/debtors
GET /api/v1/debtors/:debtorId/debt-profile
```

Creates a debtor, fetches all debtors, or retrieves a debtor's profile together with tabs.

### Tabs

```http
POST /api/v1/tabs
PATCH /api/v1/tabs/:tabId/pay
PATCH /api/v1/tabs/:tabId
DELETE /api/v1/tabs/:tabId
POST /api/v1/tabs/bulk-delete
POST /api/v1/tabs/:tabId/items
DELETE /api/v1/tabs/:tabId/items/:itemId
POST /api/v1/tabs/:tabId/items/bulk-delete
POST /api/v1/tabs/:tabId/items/pay
POST /api/v1/tabs/:tabId/items/un-pay
PATCH /api/v1/tabs/:tabId/items/:itemId
```

These endpoints handle tab creation, updates, payments, item management, and deletion operations.

## Example payloads

### Create debtor

```json
{
  "name": "John Doe"
}
```

### Create tab(s)

```json
{
  "tabs": [
    {
      "debtorId": "64f12a3d9a4b7c0ef2bc1234",
      "tabPaid": false,
      "dateTaken": "2026-10-14T09:00:00.000Z",
      "items": [
        {
          "itemName": "Coffee",
          "itemPrice": 3.5,
          "itemQuantity": 2,
          "itemPaid": false
        }
      ]
    }
  ]
}
```

## Testing

Run the test suite:

```bash
npm test
```

## Notes

- The project is structured around a debtor-driven tab system for tracking owed amounts and itemized charges.
- The `reports` route file exists but is currently a placeholder and does not yet expose implemented report endpoints.
- The application uses MongoDB connection startup on server launch; ensure your database is available before starting the server.

## License

This project is licensed under the ISC license.
