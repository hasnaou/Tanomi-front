import { Component, OnInit } from '@angular/core';

interface Product {
 id: number;
 name: string;
 description: string;
}

@Component({
 selector: 'app-drag-drop-test',
 templateUrl: './drag-drop-test.component.html',
 styleUrls: ['./drag-drop-test.component.css']
})
export class DragDropTestComponent implements OnInit {
 ngOnInit(): void {
 }

 availableProducts: Product[] = [
    { id: 1, name: 'Product 1', description: 'This is product 1' },
    { id: 2, name: 'Product 2', description: 'This is product 2' },
    { id: 3, name: 'Product 3', description: 'This is product 3' },
    // Add more products as needed
 ];

 selectedProducts: Product[] = [];

 dragStart(product: Product) {
    console.log('Drag started:', product.name);
 }

 dragEnd() {
    console.log('Drag ended');
 }

 drop(event: any) { // Adjusted to accept an event parameter
    console.log('Product dropped:', event.dragData.name);
    // Implement logic to add the dropped product to selectedProducts
    this.selectedProducts.push(event.dragData);
 }
}
