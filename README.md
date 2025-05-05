# NestJS/Graphql API

A full-featured GraphQL/NestJS backend for a service marketplace platform, supporting users, providers, bookings, products, reviews, offers, uploads, and Firebase authentication.

---

## Features

- **GraphQL API** with auto-generated schema
- **User Management** (users, addresses, legal data, FCM tokens)
- **Provider Management** (providers, preferences, working hours, FCM tokens)
- **Product Catalog** (products, categories, subcategories, favorite products)
- **Booking System** (create, update, status, details, security codes)
- **Offers & Discounts** (CRUD for offers, product associations)
- **Reviews & Ratings** (detailed reviews, provider/product ratings)
- **File Uploads** (Google Cloud Storage integration)
- **Firebase Authentication** (global guard, FCM support)
- **MongoDB** (Mongoose ODM)
- **Configurable via `.env` and JSON config files**

---

## Project Structure

```
src/
  app.module.ts
  modules/
    users/
    providers/
    products/
    bookings/
    offers/
    reviews/
    uploads/
    firebase/
  config/
    firebase/
    google/
types.d.ts
```

---

## Getting Started

### 1. Environment Configuration

- Copy `.env.example` to `.env` and fill in all required values.
- Update Firebase and Google config JSON files in `src/config/`.

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Project

**Development:**
```bash
npm run start
```

**Watch Mode:**
```bash
npm run start:dev
```

**Production:**
```bash
npm run start:prod
```

---

## GraphQL

- GraphQL Playground is disabled in production, but Apollo landing page is enabled locally.
- The schema is auto-generated at `src/graphql/schema.gql`.

### Example Queries & Mutations

See [`used.md`](used.md) for a full list of supported GraphQL operations.

---

## Authentication

- Uses Firebase Admin SDK for authentication.
- Global guard (`FirebaseAuthGuard`) protects all routes by default.
- Use the `@Public()` decorator to mark public endpoints.

---

## File Uploads

- Integrated with Google Cloud Storage.
- Upload endpoints are protected by Firebase authentication.

---

## Code Quality

- ESLint and Prettier are configured.
- TypeScript strict mode is enabled.

---

## Contributing

1. Fork the repo and create your branch.
2. Make changes and add tests.
3. Run `npm run lint` and `npm run test`.
4. Submit a pull request.

---

## License

MIT

---
