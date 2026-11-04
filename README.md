# OpenTab

OpenTab is a web application with a React client and an Express API.

## Project structure

- [`client/`](./client/) contains the React application and Tailwind CSS setup.
- [`server/`](./server/) contains the Express API, its tests, and API-specific documentation.

## Requirements

- Node.js 24
- npm
- MongoDB for running the API locally

## Install dependencies

```bash
npm ci --prefix server
npm ci --prefix client
```

## Run locally

Start the API:

```bash
npm --prefix server run dev
```

Start the client in a separate terminal:

```bash
npm --prefix client run dev
```

See [`server/README.md`](./server/README.md) for API details and configuration.

## Continuous integration

The root `package.json` provides the commands used by GitHub Actions:

```bash
npm test
npm run lint:fix
npm run prettier:fix
```
