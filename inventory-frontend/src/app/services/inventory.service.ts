import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface ProductStock {
  product_id: string;
  name?: string;
  quantity: number;
  total_cost: number;
  avg_cost: number;
}

interface SalePurchase {
  id: number;
  product_id: string;
  quantity: number;
  total_cost: number;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private stockSubject = new BehaviorSubject<ProductStock[]>([]);
  private ledgerSubject = new BehaviorSubject<SalePurchase[]>([]);

  stock$ = this.stockSubject.asObservable();
  ledger$ = this.ledgerSubject.asObservable();

  private API_URL = 'http://localhost:4000/api/inventory';

  constructor(private http: HttpClient) {}

  fetchStock() {
    this.http.get<ProductStock[]>(`${this.API_URL}/stock`).subscribe({
      next: data => this.stockSubject.next(data),
      error: err => console.error('Fetch stock error', err)
    });
  }

  fetchLedger() {
    this.http.get<SalePurchase[]>(`${this.API_URL}/ledger`).subscribe({
      next: data => this.ledgerSubject.next(data),
      error: err => console.error('Fetch ledger error', err)
    });
  }

  createPurchase(event: { product_id: string; quantity: number; unit_price: number }) {
    this.http.post(`${this.API_URL}/purchase`, event).subscribe({
      next: () => {
        this.fetchStock();
        this.fetchLedger();
      },
      error: err => console.error('Create purchase error', err)
    });
  }

  createSale(event: { product_id: string; quantity: number }) {
    this.http.post(`${this.API_URL}/sale`, event).subscribe({
      next: () => {
        this.fetchStock();
        this.fetchLedger();
      },
      error: err => console.error('Create sale error', err)
    });
  }
}
