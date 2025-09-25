import { fetchLedger, fetchStock, processInventoryEvent } from "../service/inventory.service.js";

export async function getStock(req, res) {
  try {
    const data = await fetchStock();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getLedger(req, res) {
  try {
    const data = await fetchLedger();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createPurchase(req, res) {
  try {
    const event = { ...req.body, event_type: 'purchase' };
    await processInventoryEvent(event);
    res.status(201).json({ message: 'Purchase recorded', event });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// ✅ Handle Sale via REST
export async function createSale(req, res) {
  try {
    const event = { ...req.body, event_type: 'sale' };
    await processInventoryEvent(event);
    res.status(201).json({ message: 'Sale recorded', event });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}