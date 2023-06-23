import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductServiceService } from './product-service.service';
import { getCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  UserCheck!: string;
  UserID!: number;
  IdWishList: number = Number(sessionStorage.getItem('IdWishList'));
  IdBag: number = Number(sessionStorage.getItem('IdBag'));
  String: string = String(sessionStorage.getItem('search'));

  WishListCount: number = 0;
  private CountWishList = new BehaviorSubject<number>(this.WishListCount);
  WishList = this.CountWishList.asObservable();

  SearchString: string = this.String;
  private SearchBeha = new BehaviorSubject<string>(this.SearchString);
  Search = this.SearchBeha.asObservable();

  BagCount: number = 0;
  private CountBag = new BehaviorSubject<number>(this.BagCount);
  Bag = this.CountBag.asObservable();

  CreditNumber: number = 0;
  private NumberCredit = new BehaviorSubject<number>(this.CreditNumber);
  Credit = this.NumberCredit.asObservable();

  LoginCheckBool: boolean = Boolean(localStorage.getItem('LoginCheck'));
  private LoginCheck = new BehaviorSubject<boolean>(this.LoginCheckBool);
  LoginCheckForm = this.LoginCheck.asObservable();

  FooterCheckBool: boolean = false;
  private FooterCheck = new BehaviorSubject<boolean>(this.FooterCheckBool);
  FooterCheckForm = this.FooterCheck.asObservable();

  HeaderCheckBool: boolean = false;
  private HeaderCheck = new BehaviorSubject<boolean>(this.HeaderCheckBool);
  HeaderCheckForm = this.HeaderCheck.asObservable();

  Account: number = -1;
  private AccountCheck = new BehaviorSubject<number>(this.Account);
  AccountCheckForm = this.AccountCheck.asObservable();

  Admin: number = -1;
  private AdminCheck = new BehaviorSubject<number>(this.Admin);
  AdminCheckForm = this.AdminCheck.asObservable();

  Object: number = 0;
  private ObjectCheck = new BehaviorSubject<number>(this.Object);
  ObjectCheckForm = this.ObjectCheck.asObservable();

  MinSize: number = 15;
  private MinSizeCheck = new BehaviorSubject<number>(this.MinSize);
  MinSizeCheckForm = this.MinSizeCheck.asObservable();

  MaxSize: number = 28;
  private MaxSizeCheck = new BehaviorSubject<number>(this.MaxSize);
  MaxSizeCheckForm = this.MaxSizeCheck.asObservable();

  NameString: string = this.String;
  private Namebeha = new BehaviorSubject<string>(this.NameString);
  Name = this.Namebeha.asObservable();

  constructor(private productServices: ProductServiceService) {
    this.UserCheck = String(sessionStorage.getItem('NameUser'));
    this.Namebeha.next(this.UserCheck)
    if (this.UserCheck != 'null') {
      this.UserID = Number(sessionStorage.getItem('IdUser'));
      this.productServices.GetWishListAllProDuct(this.IdWishList).subscribe({
        next: (num) => {
          this.WishListCount = num.length;
          this.CountWishList.next(this.WishListCount);
        },
      });
      this.productServices.GetBagAllProDuct(this.IdBag).subscribe({
        next: (num) => {
          this.BagCount = num.length;
          this.CountBag.next(this.BagCount);
        },
      });
      this.productServices.GetUserID(this.UserID).subscribe({
        next: (user) => {
          this.NumberCredit.next(Number(user.credit));
        }
      })
    } else {
      this.CountBag.next(0);
      if (getCookie('CookieProduct') == '0' || getCookie('CookieProduct') == null) {
        this.CountWishList.next(0);
      } else {
        var string = String(getCookie('CookieProduct')).split(',');
        this.CountWishList.next(string.length-1
        );
      }
    }
    this.LoginCheck.next(this.LoginCheckBool);
    this.FooterCheck.next(this.FooterCheckBool);
    this.HeaderCheck.next(this.HeaderCheckBool);
  }

  WishListUpdate(num: number) {
    this.CountWishList.next(num);
    if (this.UserCheck != 'null') {
      this.productServices
        .SetWishListCountByUserID(this.UserID, num)
        .subscribe({
          next: (num) => {},
        });
    }
  }
  BagUpdate(num: number) {
    this.CountBag.next(num);
    if (this.UserCheck != 'null') {
      this.productServices.SetBagCountByUserID(this.UserID, num).subscribe({
        next: (num) => {},
      });
    }
  }
  ChangeLoginCheck(check: boolean) {
    this.LoginCheck.next(check);
    localStorage.setItem('LoginCheck', String(check));
  }
  ChangeFooterCheck(check: boolean) {
    this.FooterCheck.next(check);
  }
  ChangeHeaderCheck(check: boolean) {
    this.HeaderCheck.next(check);
  }
  ChangeAccount(num: number) {
    this.AccountCheck.next(num);
  }
  ChangeAdmin(num: number) {
    this.AdminCheck.next(num);
  }
  ChangeObject(num: number) {
    this.ObjectCheck.next(num);
  }
  ChangeMinMaxSize(min: number, max: number) {
    this.MinSizeCheck.next(min);
    this.MaxSizeCheck.next(max);
  }
  ChangeName(name: string){
    this.Namebeha.next(name);
  }
  GetSearch(string: string) {
    this.SearchBeha.next(string);
  }
}
