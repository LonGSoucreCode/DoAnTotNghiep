import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/Model/product.model';
import { WishListService } from 'src/app/Services/WishList.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-account-orderandreturn',
  templateUrl: './account-orderandreturn.component.html',
  styleUrls: ['./account-orderandreturn.component.css'],
})
export class AccountOrderandreturnComponent implements OnInit {
  IdUser!: number;
  OrAndRe: any = {
    CheckOrder: true,
    CheckReturn: false,
    MainParaphrase: '',
    Paraphrase: '',
    name: '',
    icon: '',
    button: '',
  };
  BillList: any[] = [];
  Bill: any = {
    id: 0,
    bill_id: 0,
    user_id: 0,
    bill_Count: 0,
    bill_Total: '',
    bill_Status: false,
    createTime: '',
  };
  BillCheck: boolean[] = [];
  constructor(
    private productServices: ProductServiceService,
    private WishlistService: WishListService
  ) {}
  ngOnInit(): void {
    this.IdUser = Number(sessionStorage.getItem('IdUser'));
    this.BillListCheck();
    this.Check();
  }
  BillListCheck() {
    this.productServices.GetAllBillByUser(this.IdUser).subscribe({
      next: (ListBill) => {
        for (var i = 0; i < ListBill.length; i++) {
          if (ListBill[i].bill_Count > 0 || ListBill[i].bill_Total != '0') {
            this.BillCheck[i] = true;
            this.Bill = ListBill[i];
            this.Bill.id = i + 1;
            this.BillList.push(this.Bill);
          }
        }
      },
    });
  }
  Check() {
    this.WishlistService.ChangeAccount(0);
    if (this.OrAndRe.CheckOrder == true) {
      this.OrAndRe.MainParaphrase =
        'Track your orders, request a return or check your order history';
      this.OrAndRe.Paraphrase =
        "When you've placed an order, you'll find all the details here.";
      this.OrAndRe.name = 'orders';
      this.OrAndRe.icon = 'down';
      this.OrAndRe.button = 'Shop new in';
    } else if (this.OrAndRe.CheckReturn == true) {
      this.OrAndRe.MainParaphrase =
        'Check the progress of your returns, reschedule collection and print your return documents';
      this.OrAndRe.Paraphrase =
        'You can start a return request from the order tracker.';
      this.OrAndRe.name = 'returns';
      this.OrAndRe.icon = 'up';
      this.OrAndRe.button = 'View Orders';
    }
  }
  Click(num: number) {
    if (num == 0) {
      this.OrAndRe.CheckOrder = true;
      this.OrAndRe.CheckReturn = false;
      this.BillListCheck();
    } else if (num == 1) {
      this.OrAndRe.CheckReturn = true;
      this.OrAndRe.CheckOrder = false;
      this.BillList = [];
    }
    this.Check();
  }
  See(id: number) {
    this.BillCheck[id] = !this.BillCheck[id];
  }
}
