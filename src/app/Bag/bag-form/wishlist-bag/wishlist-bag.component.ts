import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BagProduct, WishListProduct } from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { WishListService } from 'src/app/Services/WishList.service';

@Component({
  selector: 'app-wishlist-bag',
  templateUrl: './wishlist-bag.component.html',
  styleUrls: ['./wishlist-bag.component.css'],
})
export class WishlistBagComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<BagProduct>();
  @Input() Id!: number;
  @Input() IdProduct!: string;
  @Input() IdSize!: number;
  iconcheck: boolean[] = [];
  CheckWishList!: boolean;
  ParaphraseBag!: string;
  WishListProduct: WishListProduct = {
    wishList_id: 0,
    product_id: 0,
    size_id: 0
  };
  BagProduct: any = {
    id: 0,
    product_id: 0,
    size_id: 0
  }
  WishListCount!: number;
  constructor(private productServices: ProductServiceService,
    private WishListService: WishListService) {}
  ngOnInit(): void {
    this.WishListService.WishList.subscribe((c) => {
      this.WishListCount = c;
    });
    this.iconcheck = [true, false];
    this.WishListProduct.wishList_id = Number(sessionStorage.getItem('IdWishList'));
    this.WishListProduct.product_id = Number(this.IdProduct);
    this.WishListProduct.size_id = this.IdSize;
    this.productServices
      .GetWishListProDuct(this.WishListProduct)
      .subscribe({
        next: (bag) => {
          if (bag > 0) {
            this.CheckWishList = true;
            this.ParaphraseBag = 'In your wishlist';
          } else {
            this.CheckWishList = false;
            this.ParaphraseBag = 'Move to wishlist';
          }
        },
      });
  }
  IConChange() {
    this.iconcheck[0] = !this.iconcheck[0];
    this.iconcheck[1] = !this.iconcheck[1];
    console.log(this.iconcheck[0], this.iconcheck[1]);
  }
  AddWishList(id: string) {
    this.WishListCount++;
    this.WishListService.WishListUpdate(this.WishListCount);
    this.productServices.AddProductInWishList(this.WishListProduct).subscribe({
      next: (wl) => {},
    });
  }
  Click() {
    this.BagProduct.id = this.Id;
    this.BagProduct.product_id = Number(this.IdProduct);
    this.BagProduct.size_id = this.IdSize;
    this.newItemEvent.emit(this.BagProduct);
    this.CheckWishList = !this.CheckWishList;
    setTimeout(() => {
      this.AddWishList(this.IdProduct);
    }, 1000);
  }
}
