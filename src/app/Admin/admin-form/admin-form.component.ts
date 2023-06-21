import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishListService } from 'src/app/Services/WishList.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent implements OnInit, OnDestroy {
  check!: boolean[];
  Title!: string[];
  Num!: number;
  NameUser: any;
  constructor(
    private WishlistService: WishListService,
    private productServices: ProductServiceService,
    private Route: Router
  ) {}
  ngOnDestroy(): void {
    this.WishlistService.ChangeFooterCheck(false);
    this.WishlistService.ChangeHeaderCheck(false);
  }

  ngOnInit(): void {
    this.NameUser = sessionStorage.getItem('NameUser');
    if (this.NameUser == 'null') {
      this.Route.navigate(['Admin/Login']);
    } else {
      if (sessionStorage.getItem('RoleUser') == '2') {
        this.Route.navigate(['']);
      }
      this.Title = ['Dashboard', 'My Strore', 'User', 'Order'];
      this.check = [false, false, false, false];
      setTimeout(() => {
        this.WishlistService.AdminCheckForm.subscribe({
          next: (num) => {
            if (num == -1) {
              this.Route.navigate(['admin/dashboard']);
              this.check = [true, false, false, false];
            } else if (num != -1) {
              this.CheckBold(num);
            }
            this.Num = num;
          },
        });
      }, 500);
      this.WishlistService.ChangeFooterCheck(true);
      this.WishlistService.ChangeHeaderCheck(true);
    }
  }
  SignOut() {
    sessionStorage.setItem('NameUser', 'null');
    sessionStorage.setItem('IdUser', 'null');
    sessionStorage.setItem('IdWishList', 'null');
    sessionStorage.setItem('BagId', 'null');
    setTimeout(() => {
      location.reload();
      this.Route.navigate(['Admin/Login']);
    }, 500);
  }
  CheckBold(num: number) {
    this.check = [false, false, false, false];
    this.check[num] = true;
  }
}
