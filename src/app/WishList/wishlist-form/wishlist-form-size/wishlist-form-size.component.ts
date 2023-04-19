import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  SizeOut,
  SizeProduct,
  WishListProduct
} from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-wishlist-form-size',
  templateUrl: './wishlist-form-size.component.html',
  styleUrls: ['./wishlist-form-size.component.css'],
})
export class WishlistFormSizeComponent implements OnInit {
  @Input() idproduct!: number;
  @Input() size!: number;
  @Output() newItemEvent = new EventEmitter<SizeOut>();
  SizeOut: any = {
    price: '',
    idproduct: 0,
    idsize: 0,
    idsizenew: 0
  };
  WishListAdd: WishListProduct = {
    wishList_id: 0,
    product_id: 0,
    size_id: 0,
  };
  WishListDelete: WishListProduct = {
    wishList_id: 0,
    product_id: 0,
    size_id: 0,
  };
  font: string = 'normal';
  checksize!: boolean;
  SizeProductList: SizeProduct[] = [];
  SizeNumber!: number;
  constructor(private productServices: ProductServiceService) {}
  ngOnInit(): void {
    this.WishListAdd.wishList_id = Number(sessionStorage.getItem('IdWishList'));
    this.WishListDelete.wishList_id = Number(sessionStorage.getItem('IdWishList'));
    if (this.size != 0) {
      this.productServices.GetSizeBySizeId(this.size).subscribe({
        next: (num) => {
          this.SizeNumber = Number(String(num.size_Number).replace('.0', ''));
        },
      });
    } else if (this.size == 0) {
      this.SizeNumber = this.size;
    }
    this.productServices.GetAllSizeByProductId(this.idproduct).subscribe({
      next: (size) => {
        this.SizeProductList = size;
      },
    });
  }
  Show() {
    this.checksize = !this.checksize;
  }
  ChangeSize(price: string, idproduct: number, size: number) {
    this.WishListAdd.product_id = idproduct;
    this.WishListAdd.size_id = size;
    this.WishListDelete.product_id = this.idproduct;
    this.WishListDelete.size_id = this.size;
    this.productServices.GetWishListProDuct(this.WishListAdd).subscribe({
      next: (num) => {
        if (num == -1) {
          this.SizeOut.price = price;
          this.SizeOut.idproduct = idproduct;
          this.SizeOut.idsize = this.size;
          this.SizeOut.idsizenew = size;
          this.newItemEvent.emit(this.SizeOut);
          this.productServices.GetSizeBySizeId(size).subscribe({
            next: (sizenum) => {
              this.SizeNumber = Number(
                String(sizenum.size_Number).replace('.0', '')
              );
            },
          });
          this.productServices.AddProductInWishList(this.WishListAdd).subscribe();
          this.productServices.DeleteProductInWishList(this.WishListDelete).subscribe();
          this.idproduct = idproduct;
          this.size = size;
        } else {
          alert('This Item/Size was already added.');
        }
        this.checksize = !this.checksize;
      },
    });
  }
}
