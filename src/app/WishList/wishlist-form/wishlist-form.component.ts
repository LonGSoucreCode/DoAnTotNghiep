import { Component, Output, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BagProductAdd, WishListProduct } from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { WishListService } from 'src/app/Services/WishList.service';

@Component({
  selector: 'app-wishlist-form',
  templateUrl: './wishlist-form.component.html',
  styleUrls: ['./wishlist-form.component.css'],
})
export class WishlistFormComponent implements OnInit {
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
  BagButton: boolean[] = [];
  constructor(
    private productServices: ProductServiceService,
    private WishListService: WishListService,
    private route: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.wlid = sessionStorage.getItem('IdWishList');
    this.IDUSer = sessionStorage.getItem('IdUser');
    if (this.wlid != 'null') {
      this.ParagraphButton = 'Shop Now';
      this.Paragraph =
        'Add your favourite items to your wishlist and they’ll appear here.';
      await this.WishListService.WishList.subscribe((c) => {
        this.WishListCount = c;
      });
      this.productServices.GetWishListAllProDuct(this.wlid).subscribe({
        next: (WishList) => {
          this.WishListProduct = WishList;
          for (var i = 0; i < this.WishListProduct.length; i++) {
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
    } else if (this.wlid == 'null') {
      this.ParagraphButton = 'Sign In';
      this.Paragraph =
        'Looking for your wishlist? Sign in to pick up where you left off.';
      this.WishListCount = 0;
    }
    this.CheckList();
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
  async Count(id: number) {
    this.checkopacity[id] = !this.checkopacity[id];
    await setTimeout(() => {
      this.WishListCount--;
      this.WishListService.WishListUpdate(this.WishListCount);
      this.check[id] = !this.check[id];
    }, 1000);
    this.CheckList();
  }
  LoginShow() {
    this.WishListService.ChangeLoginCheck(false);
  }
  CheckList() {
    if (this.WishListCount > 4) {
      this.JuscontentCheck = false;
    } else {
      this.JuscontentCheck = true;
    }
  }
  Onclick(event: any) {
    this.ListProduct.forEach((product) => {
      if (
        product.product_id == event.idproduct &&
        product.size_id == event.idsize
      ) {
        console.log(product);
        product.size_id = event.idsizenew;
      }
    });
  }
  Router(name: string, id: number, size: number) {
    if (size == 0) {
      this.route.navigate(['../product/', name, id]);
    }
    if (size != 0) {
      this.route.navigate(['../product/', name, id, size]);
    }
  }
}
