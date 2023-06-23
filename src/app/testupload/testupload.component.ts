import { Component, OnInit } from '@angular/core';
import { WishListService } from '../Services/WishList.service';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../Services/product-service.service';
import { imageproduct, imageproducts } from '../Model/product.model';

@Component({
  selector: 'app-testupload',
  templateUrl: './testupload.component.html',
  styleUrls: ['./testupload.component.css'],
})
export class TestuploadComponent implements OnInit {
  list: imageproduct[] = [];
  selectFile!: File;

  img: imageproducts = {
    image_Product_id: 0,
    image_Product_Main: '',
    image_Product_Detail: '',
    image_Product_Ass: '',
    image_Product_Cond: '',
  };

  constructor(
    private productservice: ProductServiceService,
    private WishlistService: WishListService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.WishlistService.ChangeFooterCheck(true);
    this.WishlistService.ChangeHeaderCheck(true);
    this.productservice.GetAllImgProduct().subscribe({
      next: (l) => {
        this.img.image_Product_id = l.length + 1;
        // for (var i = 1; i <= l.length; i++) {
        //   this.img.image_Product_id = Number(l[i - 1].image_Product_id);
        //   this.img.image_Product_Main = String(l[i - 1].image_Product_id);
        //   this.img.image_Product_Detail = String(l[i - 1].image_Product_id);
        //   this.img.image_Product_Ass = String(l[i - 1].image_Product_id);
        //   this.img.image_Product_Cond = String(l[i - 1].image_Product_id);
        //   this.productservice.UpdateLink(this.img).subscribe({
        //     next: (c) => {
        //       console.log(c);
        //     },
        //   });
        //   console.log(this.img);
        // }
      },
    });
  }
  change(event: any) {
    this.selectFile = <File>event.target.files[0];
  }
  UploadImage() {
    const filedata = new FormData();
    filedata.append(
      'image',
      this.selectFile,
      'P' + String(this.img.image_Product_id)
    );
    this.http
      .post(
        'https://localhost:44323/api/ImageProduct/UpLoadImageCond',
        filedata
      )
      .subscribe();
  }
}

//
