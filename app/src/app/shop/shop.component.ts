// import { Component } from '@angular/core';
// interface Item {
//   name: string;
//   price: number;
// }
// @Component({
//   selector: 'app-shop',
//   templateUrl: './shop.component.html',
//   styleUrl: './shop.component.css'
// })
// export class ShopComponent {
//   items: Item[] = [
//     { name: 'Item 1', price: 10 },
//     { name: 'Item 2', price: 20 },
//     { name: 'Item 3', price: 30 }
//   ];

//   cart: Item[] = [];

//   addToCart(item: Item): void {
//     this.cart.push(item);
//   }

//   generateBill(): void {
//     let total = 0;
//     for (const item of this.cart) {
//       total += item.price;
//     }
//     alert(`Total bill: $${total}`);
//     this.clearCart();
//   }

//   clearCart(): void {
//     this.cart = [];
//   }
// }
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
    this.totalBill = this.selectedItems.reduce((sum, item) => sum + item.price, 0);
  }
}