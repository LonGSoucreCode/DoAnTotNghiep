import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/Model/product.model';
import { WishListService } from 'src/app/Services/WishList.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent implements OnInit {OrderCount!: number;
  UserCount!: number;
  Total: number = 0;
  BillList: any[] = [];
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
  constructor(
    private WishlistService: WishListService,
    private productServices: ProductServiceService // private route: Router
  ) {}
  ngOnInit(): void {
    this.WishlistService.ChangeAdmin(3);
    this.productServices.GetAllBill().subscribe({
      next: (listBill) => {
        this.OrderCount = listBill.length;
        var x = 0;
        for (var i = 0; i < listBill.length; i++) {
          this.GetBill(listBill[i], x);
          x++;
        }
      },
    });
    this.productServices.GetAllUser().subscribe({
      next: (listuser) => {
        this.UserCount = listuser.length;
      },
    });
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
  show(bill: Bill){
    this.BillCheck = true;
    this.BillDetail = bill;
  }
  Back(){
    this.BillCheck = false;
    this.BillDetail = null;
  }
}
