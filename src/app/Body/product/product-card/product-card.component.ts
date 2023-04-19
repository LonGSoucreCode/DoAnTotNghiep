import { Component, Input, OnInit } from '@angular/core';
import { product } from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  @Input() idwl!: string;


  Product: product = {
    product_id: '',
    product_Name: '',
    product_Price: '',
    image_Product_id: '',
    brand_id: '',
    product_Story: '',
    sale_id: '',
    view_id: '',
    isActive: false,
    category_id: 0
  }

  constructor(private productServices: ProductServiceService) {}

  ngOnInit(): void {
      this.productServices.GetProductByID(Number(this.idwl)).subscribe({
        next: (product) => {
          this.Product = product;
          console.log(this.Product.brand_id);
        }
      })
  }
}
