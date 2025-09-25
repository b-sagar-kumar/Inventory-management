import express from 'express';
import cors from 'cors';
import inventoryRoutes from './routes/inventory.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/inventory', inventoryRoutes);

app.get('/', (req, res) => res.send('Inventory API Running...'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
