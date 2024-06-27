import 'reflect-metadata';
import express from 'express';
import { productRouter } from './routes/product';
import { categoryRouter } from './routes/category';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
