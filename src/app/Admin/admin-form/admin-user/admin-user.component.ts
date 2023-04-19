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
  };
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
    this.productServices.GetAllUser().subscribe({
      next: (listuser) => {
        for (var i = 0; i < listuser.length; i++) {
          this.GetUser(listuser[i],i);
        }
      },
    });
  }
  GetUser(user: any,id: number) {
    this.User = user;
    this.User.id = id+1;
    setTimeout(() => {
      this.GetActive(user.isActive, user.id);
    }, 500);
    this.ListUser.push(this.User);
  }
  GetActive(active: boolean, id: number) {
    if (active == true) {
      this.ListUser[id-1].Status = 'Active';
    } else {
      this.ListUser[id-1].Status = 'Delete';
    }
  }
}
