import { Router } from 'express';
import { createPurchase, createSale, getLedger, getStock } from '../controller/inventory.controller.js';


const router = Router();

router.get('/stock', getStock);
router.get('/ledger', getLedger);

router.post('/purchase', createPurchase);
router.post('/sale', createSale);
export default router;
