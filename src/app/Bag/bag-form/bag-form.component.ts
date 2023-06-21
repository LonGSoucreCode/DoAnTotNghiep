import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import {
  BagProduct,
  BagProductAdd,
  Bill,
  BillProduct,
  UpdateUser,
} from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { WishListService } from 'src/app/Services/WishList.service';

@Component({
  selector: 'app-bag-form',
  templateUrl: './bag-form.component.html',
  styleUrls: ['./bag-form.component.css'],
})
export class BagFormComponent implements OnInit {
  product: any = {
    id: 0,
    product_id: 0,
    product_Name: '',
    product_Price: '',
    image_Product_id: '',
    brand_id: '',
    product_Story: '',
    sale_id: '',
    view_id: '',
    size_id: 0,
    quality: '',
  };
  BagProduct: BagProduct = {
    bag_id: 0,
    product_id: 0,
    size_id: 0,
  };
  Bill: Bill = {
    bill_id: 0,
    user_id: 0,
    bill_Count: 0,
    bill_Total: '',
    bill_Status: false,
    createTime: '',
  };
  UserUpdate: UpdateUser = {
    user_id: 0,
    credit: '',
  };
  BillProduct: BillProduct = {
    bill_id: 0,
    product_id: 0,
    product_price: '',
    size_id: 0,
    createTime: '',
  };
  String: string = 'Go To Checkout';
  NameUser: any;
  ListProduct: any[] = [];
  BagAddProduct: BagProductAdd[] = [];
  check: boolean[] = [];
  checkopacity: boolean[] = [];
  bagid!: any;
  BagCount: number = 0;
  Total: number = 0;
  Delivery: number = 24;
  SavePrice: string = '';
  Credit: number = 0;
  CancelBill!: boolean;
  OrderCheck!: boolean;
  CheckOutBool: boolean[] = [true, true];
  constructor(
    private productServices: ProductServiceService,
    private WishListService: WishListService,
    private route: Router
  ) {}

  Onclick(event: any) {
    console.log(event);
    this.Count(event.id, event.product_id, event.size_id);
  }

  ngOnInit(): void {
    this.NameUser = sessionStorage.getItem('NameUser');
    if (this.NameUser != 'null') {
      this.CancelBill = false;
      this.bagid = sessionStorage.getItem('IdBag');
      this.Bill.user_id = Number(sessionStorage.getItem('IdUser'));
      this.UserUpdate.user_id = Number(sessionStorage.getItem('IdUser'));
      this.WishListService.Bag.subscribe((c) => {
        this.BagCount = c;
      });
      this.WishListService.Credit.subscribe((c) => {
        this.Credit = c;
      });
      this.productServices.GetBagAllProDuct(this.bagid).subscribe({
        next: (bag) => {
          this.BagAddProduct = bag;
          this.Bill.bill_Count = bag.length;
          for (var i = 0; i < this.BagAddProduct.length; i++) {
            this.GetProduct(
              this.BagAddProduct[i].product_id,
              this.BagAddProduct[i].size_id,
              this.BagAddProduct[i].quality,
              i
            );
            this.check[i + 1] = false;
            this.checkopacity[i + 1] = false;
          }
        },
      });
      this.productServices.GetBillByUser(this.Bill.user_id).subscribe({
        next: (bill) => {
          console.log(bill);
          this.Bill.bill_id = bill.bill_id;
          this.BillProduct.bill_id = bill.bill_id;
          if (bill.bill_Total != '0' && bill.bill_Count > 0) {
            this.String = 'Done';
          }
        },
      });
    }
  }
  GetProduct(idproduct: number, size: number, quality: number, id: number) {
    this.productServices.GetProductByID(idproduct).subscribe({
      next: (product) => {
        this.product.id = id;
        this.product = product;
        this.SavePrice = product.product_Price.replace('$', '');
        this.SavePrice = this.SavePrice.replace(',', '');
        this.product.size_id = size;
        this.TotalCount(idproduct, size, this.SavePrice, id);
        this.product.quality = quality;
        this.ListProduct.push(product);
      },
    });
  }
  async Count(id: number, idproduct: number, size: number) {
    this.String = 'Go To Checkout';
    this.checkopacity[id] = !this.checkopacity[id];
    this.DeleteBag(idproduct, size);
    await setTimeout(() => {
      this.BagCount--;
      this.WishListService.BagUpdate(this.BagCount);
      this.check[id] = !this.check[id];
    }, 1000);
    this.Cancel();
  }
  DeleteBag(idproduct: number, size: number) {
    this.BagProduct.bag_id = this.bagid;
    this.BagProduct.product_id = idproduct;
    this.BagProduct.size_id = size;
    this.productServices.DeleteProductInBag(this.BagProduct).subscribe({
      next: (bag) => {},
    });
  }
  TotalDown(price: string) {
    this.Bill.bill_Count--;
    setTimeout(() => {
      this.SavePrice = price.replace('$', '');
      this.SavePrice = this.SavePrice.replace(',', '');
      this.Total -= Number(this.SavePrice);
    }, 1000);
  }
  TotalCount(productid: number, sizeid: number, price: string, id: number) {
    this.productServices.GetSizeByCTSizeId(productid, sizeid).subscribe({
      next: (product) => {
        price = String(Number(price) + Number(product.size_Surcharges));
        this.ListProduct[id].product_Price = '$' + price;
        this.Total += Number(price);
      },
    });
  }
  Router(name: string, id: number, size: number) {
    if (size == 0) {
      this.route.navigate(['../product/', name, id]);
    }
    if (size != 0) {
      this.route.navigate(['../product/', name, id, size]);
    }
    if (name == '') {
      this.route.navigate(['']);
    }
  }
  CheckOut(string: string) {
    var TotalNumber = this.Total + this.Delivery;
    this.Bill.bill_Total = String(TotalNumber).replace('.00', '');
    if (string == 'Go To Checkout') {
      this.OrderCheck = false;
      this.CancelBill = true;
      this.String = 'Save and Continue';
    } else if (string == 'Go To Order') {
      this.OrderCheck = true;
      this.CancelBill = true;
      this.String = 'Save and Continue';
    } else if (string == 'Save and Continue') {
      if (this.OrderCheck == true) {
        this.CancelBill = false;
        this.String = 'Done';
      } else if (this.OrderCheck == false) {
        if (this.Credit < Number(this.Bill.bill_Total)) {
          alert('So Du Khong Du');
          this.Cancel();
          this.String = 'Go To Order';
        } else {
          this.CancelBill = false;
          this.String = 'Done';
        }
      }
    } else if (string == 'Done') {
      this.ListProduct.forEach((product) => {
        this.BillProduct.product_id = product.product_id;
        this.BillProduct.product_price = product.product_Price;
        this.BillProduct.size_id = product.size_id;
        this.productServices.CreateBillProduct(this.BillProduct).subscribe();
        this.DeleteBag(product.product_id, product.size_id);
      });
      this.BagCount = 0;
      this.WishListService.BagUpdate(this.BagCount);

      if (this.OrderCheck == true) {
        this.Bill.bill_Status = false;
      } else if (this.OrderCheck == false) {
        this.UserUpdate.credit = String(
          this.Credit - Number(this.Bill.bill_Total)
        );
        this.productServices.UpdateUser(this.UserUpdate).subscribe();
        this.Bill.bill_Status = true;
      }

      this.Bill.bill_Count = this.ListProduct.length;
      this.Bill.bill_Total = '-' + String(TotalNumber).replace('.00', '');
      this.productServices.UpdateBill(this.Bill).subscribe();

      this.Bill.bill_Count = 0;
      this.Bill.bill_Status = true;
      this.Bill.bill_Total = '0';
      this.productServices.CreateBill(this.Bill).subscribe();
    }
  }
  Cancel() {
    this.String = 'Go To Checkout';
    this.CancelBill = false;
    this.Bill.bill_Count = 0;
    this.Bill.bill_Total = '0';
    this.productServices.UpdateBill(this.Bill).subscribe();
  }
}
