import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { WishListService } from 'src/app/Services/WishList.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit {
  UserID!: number;
  User: any = {
    address: '',
    user_id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    credit: ''
  };
  constructor(
    private ProductService: ProductServiceService,
    private WishlistService: WishListService
  ) {}
  ngOnInit(): void {
    this.WishlistService.ChangeAccount(2);
    this.UserID = Number(sessionStorage.getItem('IdUser'));
    this.ProductService.GetUserID(this.UserID).subscribe({
      next: (user) => {
        this.User = user;
      },
    });
  }
}
