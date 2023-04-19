import { Component, Input, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-img-product-bag',
  templateUrl: './img-product-bag.component.html',
  styleUrls: ['./img-product-bag.component.css'],
})
export class ImgProductBagComponent implements OnInit {

  @Input() IdImg!: string;
  ImgProduct: string = '';
  constructor(
    private productServices: ProductServiceService
  ) {}
  ngOnInit(): void {
    this.productServices.GetImgProductByID(this.IdImg).subscribe({
      next: (img) => {
        this.ImgProduct = img.image_Product_Main;
      },
    });
  }
}
