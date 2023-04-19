import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { WishListService } from 'src/app/Services/WishList.service';

@Component({
  selector: 'app-account-credit',
  templateUrl: './account-credit.component.html',
  styleUrls: ['./account-credit.component.css'],
})
export class AccountCreditComponent implements OnInit {
  check: boolean = false;
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
  BillList
  : any[] = [];
  Bill: any = {
    id: 0,
    bill_id: 0,
    user_id: 0,
    bill_Count: 0,
    bill_Total: '',
    bill_Status: false,
    createTime: ''
  };
  constructor(
    private ProductService: ProductServiceService,
    private WishlistService: WishListService
  ) {}
  ngOnInit(): void {
    this.WishlistService.ChangeAccount(1);
    this.UserID = Number(sessionStorage.getItem('IdUser'));
    this.ProductService.GetUserID(this.UserID).subscribe({
      next: (user) => {
        this.User = user;
      },
    });
    this.ProductService.GetAllBillByUser(this.UserID).subscribe({
      next: (ListBill) => {
        for(var i = 0; i < ListBill.length ; i++){
          if(ListBill[i].bill_Status == true){
            this.Bill = ListBill[i];
            this.Bill.id = i+1;
            this.BillList.push(this.Bill);
          }
        }
      },
    });
  }
  Click() {
    this.check = !this.check;
  }
}
