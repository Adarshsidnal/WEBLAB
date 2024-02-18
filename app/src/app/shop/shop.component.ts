import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  items = [
    { name: 'APPLE', price: 10 },
    { name: 'BANANA', price: 20 },
    { name: 'MANGO', price: 30 },
  ];

  selectedItems: any[] = [];
  totalBill = 0;

  addItem(item: any) {
    this.selectedItems.push(item);
    this.calculateTotalBill();
  }

  removeItem(index: number) {
    this.selectedItems.splice(index, 1);
    this.calculateTotalBill();
  }

  calculateTotalBill() {
    this.totalBill = this.selectedItems.reduce((sum, item)      => sum + item.price, 0);
  }
}