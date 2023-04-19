import { Component,Input,OnInit } from '@angular/core';
import { imageproduct } from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-image-product',
  templateUrl: './image-product.component.html',
  styleUrls: ['./image-product.component.css']
})
export class ImageProductComponent implements OnInit{


  @Input() id!: string;

  img: imageproduct = {
    image_Product_Ass: '',
    image_Product_Cond: '',
    image_Product_Detail: '',
    image_Product_Main: '',
    image_Product_id: '',
  }
  constructor(private productServices: ProductServiceService) {}
  ngOnInit(): void {
    this.productServices.GetImgProductByID(this.id).subscribe({
      next: (image) =>
      {
        this.img = image;
      },
      error: (response) => {
        console.log(response)
      }
    })
  }

}
