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
  NameUser!: string;
  Title!: string[];
  Num!: number;
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
    this.Title = ['Dashboard','My Strore','User','Message','Team']
    this.check = [false, false, false, false, false];
    this.NameUser = String(sessionStorage.getItem('NameUser'));
    setTimeout(() => {
      this.WishlistService.AdminCheckForm.subscribe({
        next: (num) => {
          if (num == -1) {
            this.Route.navigate(['admin/dashboard']);
            this.check = [true, false, false, false, false];
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
  SignOut() {
    sessionStorage.setItem('NameUser', 'null');
    sessionStorage.setItem('IdUser', 'null');
    sessionStorage.setItem('IdWishList', 'null');
    sessionStorage.setItem('BagId', 'null');
    setTimeout(() => {
      location.reload();
      this.Router('')
    }, 500);
  }
  Router(link: string) {
    this.Route.navigate([link]);
  }
  CheckBold(num: number) {
    this.check = [false, false, false, false, false];
    this.check[num] = true;
  }
}
