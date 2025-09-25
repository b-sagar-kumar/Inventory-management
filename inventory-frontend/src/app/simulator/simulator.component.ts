import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Simulator</h3>
    <button (click)="simulatePurchase()">Simulate Purchase</button>
    <button (click)="simulateSale()">Simulate Sale</button>
    <button (click)="simulateBulk()">Simulate 5 Random Events</button>
  `
})
export class SimulatorComponent {
  constructor(private inventoryService: InventoryService) {}

  simulatePurchase() {
    const event = {
      product_id: 'PRD001',
      quantity: Math.floor(Math.random() * 50) + 10,
      unit_price: parseFloat((Math.random() * 100 + 50).toFixed(2))
    };
    this.inventoryService.createPurchase(event);
  }

  simulateSale() {
    const event = {
      product_id: 'PRD001',
      quantity: Math.floor(Math.random() * 20) + 5
    };
    this.inventoryService.createSale(event);
  }

  simulateBulk() {
    for (let i = 0; i < 5; i++) {
      Math.random() > 0.5 ? this.simulatePurchase() : this.simulateSale();
    }
  }
}
