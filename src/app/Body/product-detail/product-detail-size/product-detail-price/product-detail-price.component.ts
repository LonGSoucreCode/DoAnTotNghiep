import { Component, Input, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-product-detail-price',
  templateUrl: './product-detail-price.component.html',
  styleUrls: ['./product-detail-price.component.css']
})
export class ProductDetailPriceComponent implements OnInit{
  @Input() id!: number;
  @Input() Surcharges!: string;
  Price!: string;
  constructor(
    private productServices: ProductServiceService,
    // private WishListService: WishListService
  ) {}
  ngOnInit(): void {
    this.productServices.GetProductByID(this.id).subscribe({
      next: (product) => {
        this.Price = product.product_Price.replace('$','');
        this.Price = this.Price.replace(',','');
        this.Price = String(Number(this.Price) + Number(this.Surcharges));
      }
    })
  }

}
