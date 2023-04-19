import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishListProduct } from 'src/app/Model/product.model';
import { WishListService } from 'src/app/Services/WishList.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { getCookie } from 'typescript-cookie';

@Component({
  selector: 'app-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.css'],
})
export class WishlistListComponent implements OnInit {
  Product: any = {
    id: 0,
    product_id: 0,
    product_Name: '',
    product_Price: '',
    image_Product_id: '',
    brand_id: '',
    product_Story: '',
    sale_id: '',
    view_id: '',
    size_id: 0,
  };
  JuscontentCheck!: boolean;
  ParagraphButton!: string;
  Paragraph!: string;
  icon: string = 'bx-x';
  ListProduct: any[] = [];
  WishListProduct: WishListProduct[] = [];
  check: boolean[] = [];
  checkopacity: boolean[] = [];
  wlid!: any;
  IDUSer!: any;
  WishListCount!: number;
  WishListCountLength: number = 0;
  BagButton: boolean[] = [];
  NameUser: any;
  constructor(
    private productServices: ProductServiceService,
    private WishListService: WishListService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.NameUser = sessionStorage.getItem('NameUser');
    this.wlid = sessionStorage.getItem('IdWishList');
    this.IDUSer = sessionStorage.getItem('IdUser');
    this.WishListService.WishList.subscribe((c) => {
      this.WishListCount = c;
    });
    if (this.NameUser != 'null') {
      this.productServices.GetWishListAllProDuct(this.wlid).subscribe({
        next: (WishList) => {
          this.WishListProduct = WishList;
          if (this.WishListProduct.length >= 7) {
            this.WishListCountLength = 6;
          } else {
            this.WishListCountLength = this.WishListProduct.length;
          }
          for (var i = 0; i < this.WishListCountLength; i++) {
            this.GetProduct(
              this.WishListProduct[i].product_id,
              this.WishListProduct[i].size_id,
              i
            );
            this.check[i + 1] = false;
            this.checkopacity[i + 1] = false;
          }
        },
      });
    } else if (this.NameUser == 'null') {
      let array = String(getCookie('CookieProduct')).split(',');
      if (array.length > 1) {
        for (var i = 1; i < array.length; i++) {
          this.GetProduct(Number(array[i]),0,i-1);
        }
      }
    }
  }
  GetProduct(idproduct: number, size: number, id: number) {
    this.productServices.GetProductByID(idproduct).subscribe({
      next: (product) => {
        this.Product.id = id;
        this.Product = product;
        this.Product.size_id = size;
        this.ListProduct.push(this.Product);
      },
    });
  }
  Router(name: string, id: number, size: number) {
    if (size == 0) {
      this.route.navigate(['../product/', name, id]);
    }
    if (size != 0) {
      this.route.navigate(['../product/', name, id, size]);
    }
    if (name == 'WishList') {
      this.route.navigate(['WishList']);
    }
  }
}
