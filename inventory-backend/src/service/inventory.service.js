import pool from '../db.js';

export async function processInventoryEvent(event) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    if (event.event_type === 'purchase') {
      await client.query(
        `INSERT INTO inventory_batches (product_id, quantity, unit_price, remaining_quantity) 
         VALUES ($1, $2, $3, $2)`,
        [event.product_id, event.quantity, event.unit_price]
      );
    }

    if (event.event_type === 'sale') {
      let qtyToSell = event.quantity;
      let totalCost = 0;

      // fetch oldest batches
      const { rows: batches } = await client.query(
        `SELECT * FROM inventory_batches 
         WHERE product_id = $1 AND remaining_quantity > 0 
         ORDER BY created_at ASC`,
        [event.product_id]
      );

      for (let batch of batches) {
        if (qtyToSell <= 0) break;

        const consumeQty = Math.min(qtyToSell, batch.remaining_quantity);
        const consumeCost = consumeQty * batch.unit_price;

        await client.query(
          `UPDATE inventory_batches 
           SET remaining_quantity = remaining_quantity - $1 
           WHERE id = $2`,
          [consumeQty, batch.id]
        );

        totalCost += consumeCost;
        qtyToSell -= consumeQty;
      }

      if (qtyToSell > 0) {
        throw new Error("Not enough stock to fulfill sale");
      }

      // Insert a single sale record
      await client.query(
        `INSERT INTO sales (product_id, quantity, total_cost) VALUES ($1, $2, $3)`,
        [event.product_id, event.quantity, totalCost]
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("❌ Error processing event", err);
  } finally {
    client.release();
  }
}

export async function fetchStock() {
  const { rows } = await pool.query(`
    SELECT product_id,
           SUM(remaining_quantity) as quantity,
           SUM(remaining_quantity * unit_price) as total_cost,
           CASE WHEN SUM(remaining_quantity) > 0 
                THEN ROUND(SUM(remaining_quantity * unit_price) / SUM(remaining_quantity), 2)
                ELSE 0 END as avg_cost
    FROM inventory_batches
    GROUP BY product_id
  `);
  return rows;
}

export async function fetchLedger() {
  const { rows } = await pool.query(`
    SELECT * FROM sales ORDER BY created_at DESC
  `);
  return rows;
}
