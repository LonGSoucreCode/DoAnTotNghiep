import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { BagProductAdd } from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { WishListService } from 'src/app/Services/WishList.service';

@Component({
  selector: 'app-wishlist-form-bag',
  templateUrl: './wishlist-form-bag.component.html',
  styleUrls: ['./wishlist-form-bag.component.css'],
})
export class WishlistFormBagComponent implements OnInit, OnChanges {
  @Input() productid!: number;
  @Input() sizeid!: number;

  Bag: BagProductAdd = {
    bag_id: 0,
    product_id: 0,
    size_id: 0,
    quality: 1,
  };
  BagCount: number = 0;
  BagButton!: boolean;
  Paraphrase!: string;
  constructor(
    private productServices: ProductServiceService,
    private WishListService: WishListService,
    private Route: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.Bag.bag_id = Number(sessionStorage.getItem('IdWishList'));
      this.Bag.product_id = this.productid;
      this.Bag.size_id = this.sizeid;
      this.BagCheck();
    }
  }
  ngOnInit(): void {
    this.WishListService.Bag.subscribe((c) => {
      this.BagCount = c;
    });
  }
  BagClick(check: boolean) {
    if (check == true) {
      this.Route.navigate(['Bag']);
    } else if (check == false) {
      if (this.sizeid != 0) {
        this.productServices.AddProductInBag(this.Bag).subscribe();
        this.BagButton = true;
        this.Paraphrase = 'In Your Bag';
        this.BagCount++;
        this.WishListService.BagUpdate(this.BagCount);
      }
      else{
        alert('no');
      }
    }
  }
  BagCheck() {
    this.productServices.GetBagProDuct(this.Bag).subscribe({
      next: (bag) => {
        if (bag == -1) {
          this.BagButton = false;
          this.Paraphrase = 'Add To Bag';
        } else {
          this.BagButton = true;
          this.Paraphrase = 'In Your Bag';
        }
      },
    });
  }
}
