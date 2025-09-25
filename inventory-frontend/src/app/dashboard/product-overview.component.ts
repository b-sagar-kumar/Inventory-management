import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <h2>Product Stock Overview</h2>
    <table>
      <tr>
        <th>Product ID</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Total Cost</th>
        <th>Avg Cost/Unit</th>
      </tr>
      <tr *ngFor="let p of stock$ | async">
        <td>{{ p.product_id }}</td>
        <td>{{ p.name || '-' }}</td>
        <td>{{ p.quantity }}</td>
        <td>{{ p.total_cost | currency }}</td>
        <td>{{ p.avg_cost | currency }}</td>
      </tr>
    </table>
  `
})
export class ProductOverviewComponent {
  stock$ = this.inventoryService.stock$;

  constructor(private inventoryService: InventoryService) {
    // initial fetch
    this.inventoryService.fetchStock();
  }
}
