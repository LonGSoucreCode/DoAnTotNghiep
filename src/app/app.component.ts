import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from './Services/product-service.service';
import { WishListService } from './Services/WishList.service';
import { getCookie, getCookies, setCookie } from 'typescript-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  UserCheck!: string;
  FooterCheck!: boolean;
  HeaderCheck!: boolean;
  IDUser!: string;
  constructor(
    private productServices: ProductServiceService,
    private WishListService: WishListService
  ) {}
  ngOnInit(): void {
    this.WishListService.FooterCheckForm.subscribe({
      next: (bool) => {
        this.FooterCheck = bool;
      }
    })
    this.WishListService.HeaderCheckForm.subscribe({
      next: (bool) => {
        this.HeaderCheck = bool;
      }
    })
    localStorage.setItem('LoginCheck', 'true');
    this.UserCheck = String(sessionStorage.getItem('NameUser'));
    if (this.UserCheck != 'null') {
      this.IDUser = String(sessionStorage.getItem('IdUser'));
      this.productServices.GetUserID(Number(this.IDUser)).subscribe({
        next: (user) => {
          sessionStorage.setItem(
            'NameUser',
            user.firstName + ' ' + user.lastName
          );
          sessionStorage.setItem('IdUser', user.user_id);
          this.productServices
            .GetWishListByUserID(Number(user.user_id))
            .subscribe({
              next: (wluser) => {
                if (wluser != -1) {
                  sessionStorage.setItem('IdWishList', String(wluser));
                }
              },
            });
          this.productServices.GetBagByUserID(Number(user.user_id))
          .subscribe({
            next: (baguser) => {
              sessionStorage.setItem('IdBag',String(String(baguser)));
            }
          })
        },
      });
      console.log(
        sessionStorage.getItem('NameUser'),
        sessionStorage.getItem('IdUser'),
        sessionStorage.getItem('IdWishList'),
        sessionStorage.getItem('IdBag')
      );
    } else if (this.UserCheck == 'null') {
      if(getCookie('CookieProduct') == null || getCookie('CookieProduct') == undefined){
        setCookie('CookieProduct','0',{path: '/'});
      }
      sessionStorage.setItem('NameUser', 'null');
      sessionStorage.setItem('IdUser', 'null');
      sessionStorage.setItem('IdWishList', 'null');
      sessionStorage.setItem('IdBag', 'null');
      console.log(
        sessionStorage.getItem('NameUser'),
        sessionStorage.getItem('IdUser'),
        sessionStorage.getItem('IdWishList'),
        sessionStorage.getItem('IdBag'),
      );
    }
  }
  title = 'ShoeSneaker';
}
