import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WishListProduct } from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { WishListService } from 'src/app/Services/WishList.service';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Component({
  selector: 'app-icon-product',
  templateUrl: './icon-product.component.html',
  styleUrls: ['./icon-product.component.css'],
})
export class IconProductComponent implements OnInit {
  @Input() id!: string;
  @Input() size!: number;
  @Input() icon!: string;
  NameUser: any;
  Iconcheck: boolean = false;
  WishListProduct: WishListProduct = {
    wishList_id: 0,
    product_id: 0,
    size_id: 0,
  };
  count!: number;
  CookieProduct!: string;
  constructor(
    private productServices: ProductServiceService,
    private WishListService: WishListService
  ) {}
  ngOnInit(): void {
    this.NameUser = sessionStorage.getItem('NameUser');
    this.WishListService.WishList.subscribe((c) => {
      this.count = c;
    });
    if (sessionStorage.getItem('NameUser') != 'null') {
      this.WishListProduct.wishList_id = Number(
        sessionStorage.getItem('IdWishList')
      );
      this.WishListProduct.product_id = Number(this.id);
      if (this.size != 0) {
        this.WishListProduct.size_id = this.size;
      } else if (this.size == 0) {
        this.WishListProduct.size_id = 0;
      }
      this.productServices.GetWishListProDuct(this.WishListProduct).subscribe({
        next: (iconproduct) => {
          if (Number(iconproduct) == -1) {
            this.Iconcheck = false;
          } else {
            this.Iconcheck = true;
          }
        },
      });
    } else {
      if (getCookie('Product' + this.id) == '0') {
        this.Iconcheck = true;
      } else {
        this.Iconcheck = false;
      }
    }
  }
  WishListCick() {
    this.Iconcheck = !this.Iconcheck;
  }

  AddWishList() {
    this.productServices.AddProductInWishList(this.WishListProduct).subscribe({
      next: (wl) => {},
    });
    this.count++;
    this.ChangeWishlistCount(this.count);
    this.WishListCick();
  }
  DeleteWishList(icon: string) {
    this.productServices
      .DeleteProductInWishList(this.WishListProduct)
      .subscribe({
        next: (wl) => {},
      });
    if (icon == 'bxs-heart') {
      this.count--;
      this.ChangeWishlistCount(this.count);
    }
    this.WishListCick();
  }

  ChangeWishlistCount(count: number) {
    this.WishListService.WishListUpdate(count);
  }
  AddWishListNoUser() {
    this.count++;
    this.ChangeWishlistCount(this.count);
    this.CookieProduct = String(getCookie('CookieProduct')) + ',' + this.id;
    setCookie('CookieProduct', this.CookieProduct, { path: '/' });
    setCookie('Product' + this.id, '0', { path: '/' });
    this.WishListCick();
  }
  DeleteWishListNoUser(icon: string) {
    if (icon == 'bxs-heart') {
      this.count--;
      this.ChangeWishlistCount(this.count);
    }
    removeCookie('Product' + this.id, { path: '/' });
    this.CookieProduct = String(getCookie('CookieProduct')).replace(
      ',' + this.id,
      ''
    );
    setCookie('CookieProduct', this.CookieProduct, { path: '/' });
    this.WishListCick();
  }
}
