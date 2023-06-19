import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, WishListProduct } from '../Model/product.model';
import { ProductServiceService } from '../Services/product-service.service';
import { WishListService } from '../Services/WishList.service';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  type: string = 'password';
  type2: string = 'password';
  User: User = {
    user_id: '',
    Email: 'dieudo452',
    password: '145678923',
    firstName: '',
    lastName: '',
    passwordcheck: '',
    credit: '',
    role_id: 0,
  };
  WishListProduct: WishListProduct = {
    wishList_id: 0,
    product_id: 0,
    size_id: 0,
  };
  UserRegister: any = {
    Name: '',
    Email: '',
    password: '',
    passwordcom: '',
    firstName: '',
    lastName: '',
  };
  CheckRegister: boolean[] = [false, false, false, false, false];
  SaveName: string[] = [];
  check!: boolean;
  LoginCheck: boolean[] = [];
  IDUser!: string;
  EmailParaphrase!: string;
  EmailSave!: string;
  constructor(
    private productServices: ProductServiceService,
    private WishListService: WishListService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.WishListService.LoginCheckForm.subscribe((c) => {
      this.check = c;
    });
    this.LoginCheck = [false, true, false];
    // 0 signin
    // 1 register
    // 2 error
  }

  ShowCloseForm() {
    this.WishListService.ChangeLoginCheck(true);
  }
  SignInAndRegister() {
    this.LoginCheck[0] = !this.LoginCheck[0];
    this.LoginCheck[1] = !this.LoginCheck[1];
  }
  LoginClick() {
    this.User.Email = this.User.Email.replace('@gmail.com', '');
    this.productServices.Login(this.User).subscribe({
      next: async (user) => {
        if (user == -1) {
          this.User.Email = this.User.Email + '@gmail.com';
          this.LoginCheck[2] = true;
        } else {
          await this.Login(user);
        }
      },
    });
  }

  async Login(id: number) {
    await this.productServices.GetUserID(id).subscribe({
      next: (user) => {
        console.log(user);
        sessionStorage.setItem(
          'NameUser',
          user.firstName + ' ' + user.lastName
        );
        this.SetItemIdUser(user.user_id);
        this.SetItemIdWishList(Number(user.user_id));
        this.SetItemIdBag(Number(user.user_id));
        sessionStorage.setItem('UserCheck', 'true');
        setTimeout(() => {
          this.RemoveCookie();
        }, 100);
        setTimeout(() => {
          if (user.role_id == 1) {
            this.route.navigate(['admin']);
          } else {
            this.route.navigate(['']);
          }
          setTimeout(() => {
            location.reload();
          }, 100);
        }, 500);
      },
      error: (Response) => {
        console.log(Response);
      },
    });
    if (this.LoginCheck[2] == true) {
      this.LoginCheck[2] = false;
    }
  }

  RemoveCookie() {
    this.WishListProduct.size_id = 0;
    let array = String(getCookie('CookieProduct')).split(',');
    if (array.length > 1) {
      for (var i = 1; i < array.length; i++) {
        this.WishListProduct.product_id = Number(array[i]);
        this.productServices
          .AddProductInWishList(this.WishListProduct)
          .subscribe({
            next: (wl) => {},
          });
        removeCookie('Product' + array[i], { path: '/' });
      }
      setCookie('CookieProduct', '0', { path: '/' });
    }
  }

  SetItemIdUser(id: string) {
    sessionStorage.setItem('IdUser', id);
  }
  SetItemIdWishList(id: number) {
    this.productServices.GetWishListByUserID(id).subscribe({
      next: (wluser) => {
        if (wluser != -1) {
          this.WishListProduct.wishList_id = wluser;
          sessionStorage.setItem('IdWishList', String(wluser));
        } else if (wluser == -1) {
          this.productServices.AddWishList(id).subscribe({
            next: (id) => {
              sessionStorage.setItem('IdWishList', String(id));
            },
          });
        }
      },
    });
  }
  SetItemIdBag(id: number) {
    this.productServices.GetBagByUserID(id).subscribe({
      next: (baguser) => {
        if (baguser != -1) {
          sessionStorage.setItem('IdBag', String(String(baguser)));
        } else if (baguser == -1) {
          this.productServices.AddBag(id).subscribe({
            next: (id) => {
              console.log(id);
              sessionStorage.setItem('IdBag', String(id));
            },
          });
        }
      },
    });
  }

  RegisterClick() {
    this.RegisterCheck();
    if (this.CheckRegister[0] == false) {
      this.CheckRegister[1] = false;
      this.CheckRegister[2] = false;
      this.CheckRegister[3] = false;
      this.CheckRegister[4] = false;

      this.SaveName = this.UserRegister.Name.split([' ']);
      this.UserRegister.firstName = this.SaveName[0];
      if (this.SaveName[1] == undefined) {
        this.SaveName[1] = '';
      }
      this.UserRegister.lastName = this.SaveName[1];
      this.UserRegister.Email = this.UserRegister.Email.replace(
        '@gmail.com',
        ''
      );
      let Emailcheck = this.UserRegister.Email.replace('@gmail.com', '');
      this.productServices.CheckEmailUser(Emailcheck).subscribe({
        next: (num) => {
          if (num > -1) {
            this.EmailParaphrase =
              'You already have an account. Please sign in or create a new account with another email.';
            this.CheckRegister[2] = true;
            this.CheckRegister[0] = true;
          } else if (num == -1) {
            this.User.Email = this.UserRegister.Email;
            this.User.password = this.UserRegister.password;
            this.productServices.Register(this.UserRegister).subscribe({
              next: (num) => {
                console.log(num);
              },
            });
            this.LoginClick();
          }
        },
      });
      console.log(this.UserRegister);
    }
  }
  RegisterCheck() {
    this.NameCheck();
    this.EmailCheck();
    this.PasswordCheck();
    this.PasswordComCheck();
  }
  NameCheck() {
    var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    let check: boolean = false;
    for (var i = 0; i < this.UserRegister.Name.length; i++) {
      if (format.test(this.UserRegister.Name[i]) == true) {
        check = true;
      }
    }
    if (this.UserRegister.Name == 0 || check == true) {
      this.CheckRegister[1] = true;
      this.CheckRegister[0] = true;
    }
    if (this.UserRegister.Name.length > 0 && check == false) {
      this.CheckRegister[1] = false;
      this.CheckRegister[0] = false;
    }
  }
  EmailCheck() {
    this.UserRegister.Email = this.EmailSave;
    let check: boolean = this.UserRegister.Email.includes('@gmail.com');
    if (this.UserRegister.Email.length == 0 || check == false) {
      this.CheckRegister[2] = true;
      this.CheckRegister[0] = true;
      this.EmailParaphrase = 'Please enter a valid email address';
    }
    if (this.UserRegister.Email.length > 0 && check == true) {
      this.CheckRegister[2] = false;
      this.CheckRegister[0] = false;
    }
  }
  PasswordCheck() {
    if (this.UserRegister.password.length < 8) {
      this.CheckRegister[0] = true;
      this.CheckRegister[3] = true;
    }
    if (this.UserRegister.password.length > 8) {
      this.CheckRegister[0] = false;
      this.CheckRegister[3] = false;
    }
  }
  PasswordComCheck() {
    if (this.UserRegister.password.length < 8) {
      this.CheckRegister[0] = true;
      this.CheckRegister[4] = true;
    }
    if (this.UserRegister.password.length > 8) {
      this.CheckRegister[0] = false;
      this.CheckRegister[4] = false;
    }
    if(this.UserRegister.password != this.UserRegister.passwordcom){
      this.CheckRegister[0] = true;
      this.CheckRegister[4] = true;
    }
  }
  ShowPass() {
    if (this.type == 'text') {
      this.type = 'password';
    } else {
      this.type = 'text';
    }
  }
  ShowPass2() {
    if (this.type2 == 'text') {
      this.type2 = 'password';
    } else {
      this.type2 = 'text';
    }
  }
}
