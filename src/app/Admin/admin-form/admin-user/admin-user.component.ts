import { Component, OnInit } from '@angular/core';
import { ListCode, User } from 'src/app/Model/product.model';
import { WishListService } from 'src/app/Services/WishList.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent implements OnInit {
  ListCode: ListCode[] = [];
  ListUser: any[] = [];
  User: any = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    credit: '',
    Status: '',
    role: '',
  };
  SearchCheck: boolean = false;
  SortCheck: boolean = true;
  search!: string;
  constructor(
    private WishlistService: WishListService,
    private productServices: ProductServiceService // private route: Router
  ) {}
  ngOnInit(): void {
    this.WishlistService.ChangeAdmin(2);
    this.productServices.GetListCode(3).subscribe({
      next: (list) => {
        this.ListCode = list;
      },
    });
    this.GetListUser();
  }
  GetUser(user: any, id: number) {
    this.User = user;
    this.User.id = id + 1;
    setTimeout(() => {
      this.GetActive(user.isActive, user.id);
      this.GetRole(user.role_id,user.id)
    }, 500);
    this.ListUser.push(this.User);
  }
  GetRole(role: number, id: number) {
    if (role == 1) {
      this.ListUser[id - 1].role = 'Admin';
    } else if(role == 2){
      this.ListUser[id - 1].role = 'User';
    }
  }
  GetActive(active: boolean, id: number) {
    if (active == true) {
      this.ListUser[id - 1].Status = 'Active';
    } else {
      this.ListUser[id - 1].Status = 'Delete';
    }
  }
  Search() {
    if (this.SearchCheck == true) {
      this.ListUser = [];
      if (this.search == null || this.search == '') {
        this.GetListUser();
        this.SearchCheck = false;
      } else {
        this.productServices.SearchUser(this.search).subscribe({
          next: (listBill) => {
            for (var i = 0; i < listBill.length; i++) {
              this.GetUser(listBill[i], i);
            }
          },
        });
      }
    } else if (this.SearchCheck == false) {
      this.SearchCheck = true;
    }
  }
  Sort() {
    this.ListUser = [];
    if (this.SortCheck == false) {
      this.GetListUser();
      this.SortCheck = true;
    } else if (this.SortCheck == true) {
      this.productServices.SortUser().subscribe({
        next: (listuser) => {
          for (var i = 0; i < listuser.length; i++) {
            this.GetUser(listuser[i], i);
          }
        },
      });
      this.SortCheck = false;
    }
  }
  GetListUser() {
    this.productServices.GetAllUser().subscribe({
      next: (listuser) => {
        for (var i = 0; i < listuser.length; i++) {
          this.GetUser(listuser[i], i);
        }
      },
    });
  }
}
