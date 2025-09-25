import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-ledger',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <h2>Transaction Ledger</h2>
    <table>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Total Cost</th>
        <th>Timestamp</th>
      </tr>
      <tr *ngFor="let tx of ledger$ | async">
        <td>{{ tx.product_id }}</td>
        <td>{{ tx.quantity }}</td>
        <td>{{ tx.total_cost | currency }}</td>
        <td>{{ tx.created_at | date:'short' }}</td>
      </tr>
    </table>
  `
})
export class LedgerComponent {
  ledger$ = this.inventoryService.ledger$;

  constructor(private inventoryService: InventoryService) {
    this.inventoryService.fetchLedger();
  }
}
