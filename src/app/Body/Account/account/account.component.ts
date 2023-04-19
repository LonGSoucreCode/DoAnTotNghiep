import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { WishListService } from 'src/app/Services/WishList.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit,OnDestroy {
  check!: boolean[];
  constructor(
    private WishlistService: WishListService,
    private route: Router
  ) {}
  ngOnDestroy(): void {
    this.WishlistService.ChangeFooterCheck(false);
  }

  ngOnInit(): void {
    this.WishlistService.ChangeFooterCheck(true);
    this.check = [false, false, false, false, false];
    setTimeout(() => {
      this.WishlistService.AccountCheckForm.subscribe({
        next: (num) => {
          if (num == -1) {
            this.route.navigate(['Account/OrderAndReturn']);
          }
          else if (num != -1) {
            this.CheckBold(num);
          }
        },
      });
    }, 500);
  }
  CheckBold(num: number) {
    this.check = [false, false, false, false, false];
    this.check[num] = true;
  }
}
