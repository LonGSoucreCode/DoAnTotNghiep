import { Component, Input, OnInit } from '@angular/core';
import { Size } from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-product-detail-sizenumber',
  templateUrl: './product-detail-sizenumber.component.html',
  styleUrls: ['./product-detail-sizenumber.component.css'],
})
export class ProductDetailSizenumberComponent implements OnInit {
  @Input() id!: number;
  @Input() font!: string;
  Size: Size = {
    size_id: 0,
    size_Number: 0,
    isActive: false
  }
  constructor(
    private productServices: ProductServiceService
  ) // private WishListService: WishListService
  {}
  ngOnInit(): void {
    this.productServices.GetSizeBySizeId(this.id).subscribe({
      next: (size) => {
        this.Size = size;
        if(String(this.Size.size_Number).includes('.0') == true){
          this.Size.size_Number = Number(String(this.Size.size_Number).replace('.0',''));
        }
      }
    })
  }
}
