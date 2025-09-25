import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOverviewComponent } from './product-overview.component';
import { LedgerComponent } from './ledger.component';
import { SimulatorComponent } from '../simulator/simulator.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProductOverviewComponent, LedgerComponent,SimulatorComponent],
  template: `
    <div class="dashboard">
      <h1>📊 Inventory Dashboard</h1>
      <app-product-overview></app-product-overview>
      <app-ledger></app-ledger>

       <app-simulator></app-simulator>
    </div>
  `,
  styles: [`
    .dashboard { padding: 20px; }
    h1 { margin-bottom: 20px; }
  `]
})
export class DashboardComponent {}
