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
    credit: '',
  };
  UpdateCheck: boolean = false;
  SaveCheck: boolean = false;
  String: string = 'Edit';
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
  Click() {
    if (this.String == 'Edit') {
      this.SaveCheck = true;
      this.UpdateCheck = true;
      this.String = 'Save';
    } else if (this.String == 'Save') {
      this.ProductService.UpdateDetailUser(this.User).subscribe({});
      this.WishlistService.ChangeName(
        this.User.firstName + ' ' + this.User.lastName
      );
      this.UpdateCheck = false;
      this.SaveCheck = false;
      this.String = 'Edit';
    }
  }
  Cancel() {
    this.ProductService.GetUserID(this.UserID).subscribe({
      next: (user) => {
        this.User = user;
      },
    });
    this.SaveCheck = false;
    this.UpdateCheck = false;
    this.String = 'Edit';
  }
}
