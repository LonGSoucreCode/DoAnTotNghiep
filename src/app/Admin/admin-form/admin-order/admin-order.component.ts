import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/Model/product.model';
import { WishListService } from 'src/app/Services/WishList.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent implements OnInit {
  BillList: any[] = [];
  Total: number = 0;
  search!: string;
  Bill: any = {
    id: 0,
    bill_id: 0,
    name: '',
    bill_Count: 0,
    bill_Total: '',
    bill_Status: false,
    createTime: '',
  };
  BillDetail: any = {
    id: 0,
    bill_id: 0,
    name: '',
    bill_Count: 0,
    bill_Total: '',
    bill_Status: false,
    createTime: '',
  };
  BillCheck: boolean = false;
  SearchCheck: boolean = false;
  SortCheck: boolean = true;
  constructor(
    private WishlistService: WishListService,
    private productServices: ProductServiceService // private route: Router
  ) {}
  ngOnInit(): void {
    this.WishlistService.ChangeAdmin(3);
    this.ListBill();
  }
  GetBill(bill: Bill, id: number) {
    this.Bill.id = id;
    this.Bill = bill;
    this.Bill.createTime = bill.createTime.substring(0, 10);
    this.GetNameUser(bill.user_id, id);
    this.BillList.push(this.Bill);
    this.Total += Number((bill.bill_Total = bill.bill_Total.replace('-', '')));
  }
  GetNameUser(iduser: number, id: number) {
    this.productServices.GetUserID(iduser).subscribe({
      next: (user) => {
        this.BillList[id].name = user.firstName + ' ' + user.lastName;
      },
    });
  }
  show(bill: Bill) {
    this.BillCheck = true;
    this.BillDetail = bill;
  }
  Back() {
    this.BillCheck = false;
    this.BillDetail = null;
  }
  Search() {
    if (this.SearchCheck == true) {
      this.BillList = [];
      if (this.search == '') {
        this.ListBill();
        this.SearchCheck = false;
      } else {
        this.productServices.SearchBill(this.search).subscribe({
          next: (listBill) => {
            for (var i = 0; i < listBill.length; i++) {
              this.GetBill(listBill[i], i);
            }
          },
        });
      }
    } else if (this.SearchCheck == false) {
      this.SearchCheck = true;
    }
  }
  ListBill() {
    this.productServices.GetAllBill().subscribe({
      next: (listBill) => {
        for (var i = 0; i < listBill.length; i++) {
          this.GetBill(listBill[i], i);
        }
      },
    });
  }
  Sort() {
    this.BillList = [];
    if (this.SortCheck == false) {
      this.ListBill();
      this.SortCheck = true;
    } else if (this.SortCheck == true) {
      this.productServices.SortBill().subscribe({
        next: (listBill) => {
          for (var i = 0; i < listBill.length; i++) {
            this.GetBill(listBill[i], i);
          }
        },
      });
      this.SortCheck = false;
    }
  }
}
