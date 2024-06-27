
```markdown
# Shopping Mall API

This is a basic REST API for managing products in a shopping mall. 
The API allows you to create, read, update, and delete products, 
each belonging to a specific category. 
The project is built using Node.js, TypeScript, Express, TypeORM, and SQLite.

```

## Project Structure

```

shopping-mall-api/
├── node_modules/
├── src/
│   ├── config/
│   │   └── data-source.ts
│   ├── controllers/
│   │   ├── categoryController.ts
│   │   └── productController.ts
│   ├── models/
│   │   ├── Category.ts
│   │   └── Product.ts
│   ├── routes/
│   │   ├── category.ts
│   │   └── product.ts
│   ├── utils.ts
│   ├── index.ts
│   └── seed.ts
├── .gitignore
├── .prettierrc
├── .prettierignore
├── package.json
├── tsconfig.json
└── yarn.lock / package-lock.json
```

## Setup

### Prerequisites
```

- Node.js and npm/yarn installed on your machine.

```
### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vahe-nikoghosyan/shopping-mall-api.git
   cd shopping-mall-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Configuration

Ensure the database configuration in `src/config/data-source.ts` is correct:

```typescript
// src/config/data-source.ts
import { DataSource } from "typeorm";
import { Product } from "../models/Product";
import { Category } from "../models/Category";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "shopping_mall.db",
  synchronize: true,
  logging: false,
  entities: [Product, Category],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
```

### Database Seeding

To seed the database with initial categories, run:

```bash
npm run seed
```

### Running the Server

To start the server, run:

```bash
npm start
```

To start the server with database seeding, run:

```bash
npm run start:with-seed
```

To build the project and run the compiled JavaScript, run:

```bash
npm run build
npm run serve
```

## API Endpoints

### Products

- **Get All Products**

  ```bash
  curl -X GET http://localhost:3000/api/products
  ```

- **Get Product by ID**

  ```bash
  curl -X GET http://localhost:3000/api/products/1
  ```

- **Create Product**

  ```bash
  curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Product",
    "description": "This is a sample product.",
    "sku": "PROD1234",
    "price": 99.99,
    "categoryId": 1
  }'
  ```

- **Update Product by ID**

  ```bash
  curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Product",
    "description": "This is an updated sample product.",
    "sku": "UPD12345",
    "price": 149.99,
    "categoryId": 1
  }'
  ```

- **Delete Product by ID**

  ```bash
  curl -X DELETE http://localhost:3000/api/products/1
  ```

### Categories

- **Get All Categories**

  ```bash
  curl -X GET http://localhost:3000/api/categories
  ```

## Code Formatting

This project uses Prettier for code formatting. To format your code, run:

```bash
npm run format
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

