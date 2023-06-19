import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { WishListProduct, WishListUser } from '../Model/product.model';
import { ProductServiceService } from '../Services/product-service.service';
import { WishListService } from '../Services/WishList.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  NameUser: any = 'null';
  UserID: any = 'null';
  WishListId: any = 'null';
  BagId: any = 'null';
  WishListProduct: any[] = [];
  WishListUser: WishListUser = {
    wishList_id: '',
    wishList_Count: '',
  };
  ObjectCheck: boolean[] = [];
  WishListCount!: number;
  UserCheck!: string;
  BagCount!: number;
  AccountCheck: boolean = false;
  search!: string;
  constructor(
    private productServices: ProductServiceService,
    private WishListService: WishListService,
    private Route: Router
  ) {}
  ngOnInit(): void {
    this.ObjectCheckForm();
    this.WishListService.ObjectCheckForm.subscribe();
    this.UserCheck = String(sessionStorage.getItem('NameUser'));
    this.WishListService.WishList.subscribe((c) => {
      this.WishListCount = c;
    });
    this.WishListService.Bag.subscribe((c) => {
      this.BagCount = c;
    });
    if (this.UserCheck != 'null') {
      this.NameUser = sessionStorage.getItem('NameUser');
      this.UserID = sessionStorage.getItem('IdUser');
      this.WishListId = sessionStorage.getItem('IdWishList');
      this.BagId = sessionStorage.getItem('BagId');
    }
  }

  ObjectCheckForm() {
    this.ObjectCheck = [false, false, false];
    this.WishListService.ObjectCheckForm.subscribe((num) => {
      this.ObjectCheck[num] = true;
    });

    if (this.ObjectCheck[0] == true) {
      this.WishListService.ChangeMinMaxSize(16, 28);
    } else if (this.ObjectCheck[1] == true) {
      this.WishListService.ChangeMinMaxSize(8, 15);
    } else if (this.ObjectCheck[2] == true) {
      this.WishListService.ChangeMinMaxSize(1, 7);
    }
  }
  ChangeObject(num: number) {
    this.WishListService.ChangeObject(num);
    this.ObjectCheckForm();
  }
  AccountClose() {
    this.AccountCheck = !this.AccountCheck;
  }
  LoginShow() {
    this.WishListService.ChangeLoginCheck(false);
  }
  SignOut() {
    sessionStorage.setItem('NameUser', 'null');
    sessionStorage.setItem('IdUser', 'null');
    sessionStorage.setItem('IdWishList', 'null');
    sessionStorage.setItem('BagId', 'null');
    this.Router('');
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  Router(link: string) {
    this.Route.navigate([link]);
    this.AccountClose();
  }
  Search(){
    this.WishListService.GetSearch(this.search);
    this.Route.navigate(['Search']);
    sessionStorage.setItem('search', this.search);
    setTimeout(() => {
      location.reload();
    }, 200);
  }
}
