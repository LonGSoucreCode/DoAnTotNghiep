import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BagProductAdd,
  brand,
  imageproduct,
  Nsx,
  product,
  WishListProduct,
} from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { WishListService } from 'src/app/Services/WishList.service';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  id!: string;
  CookieProduct!: string;
  Price!: string;
  product: product = {
    product_id: '',
    product_Name: '',
    product_Price: '',
    image_Product_id: '',
    brand_id: '',
    product_Story: '',
    sale_id: '',
    view_id: '',
    isActive: false,
    category_id: 0,
  };
  image: imageproduct = {
    image_Product_id: '',
    image_Product_Main: '',
    image_Product_Detail: '',
    image_Product_Ass: '',
    image_Product_Cond: '',
  };
  brand: brand = {
    brand_id: '',
    brand_Name: '',
    nsx_id: '',
    isActive: false,
  };
  Nsx: Nsx = {
    nsx_id: '',
    nsx_Name: '',
    isActive: false,
  };

  DetailDelivery: boolean[] = [];
  IconCheck: boolean[] = [];
  NameUser: any;
  WishListProduct: WishListProduct = {
    wishList_id: 0,
    product_id: 0,
    size_id: 0,
  };
  BagProduct: BagProductAdd = {
    bag_id: 0,
    product_id: 0,
    size_id: 0,
    quality: 0,
  };
  BagButton: any = {
    color: '',
    background: '',
    paraphrase: '',
  };
  count!: number;
  BagCount: number = 0;

  constructor(
    private productServices: ProductServiceService,
    private WishListService: WishListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.NameUser = sessionStorage.getItem('NameUser');
    this.WishListProduct.wishList_id = Number(
      sessionStorage.getItem('IdWishList')
    );
    this.BagProduct.bag_id = Number(sessionStorage.getItem('IdBag'));
    this.WishListService.WishList.subscribe((c) => {
      this.count = c;
    });
    this.WishListService.Bag.subscribe((c) => {
      this.BagCount = c;
    });
    this.DetailDelivery = [true, false, true];
    // 0 detail
    // 1 delivery
    this.IconCheck = [false, true, false];
    // 0,1 icon
    // 2 iconclick
    this.route.paramMap.subscribe({
      next: (param) => {
        const id = param.get('id');
        if (id) {
          this.id = id;
          this.InfoDetailProduct(Number(id));
          this.WishListProduct.product_id = Number(id);
          this.BagProduct.product_id = Number(id);
        }
        const size = param.get('size');
        if (size) {
          this.WishListProduct.size_id = Number(size);
          this.BagProduct.size_id = Number(size);
        }
      },
    });
    this.IconWishList();
    this.BagCheck();
  }

  BagCheck() {
    if (this.NameUser != 'null') {
      this.productServices.GetBagProDuct(this.BagProduct).subscribe({
        next: (iconproduct) => {
          if (Number(iconproduct) == -1) {
            this.BagButton.paraphrase = 'Add To Bag';
          } else {
            this.BagButton.paraphrase = 'In Your Bag';
          }
        },
      });
    } else {
      this.BagButton.paraphrase = 'Add To Bag';
    }
  }

  IconWishList() {
    if (this.NameUser != 'null') {
      this.productServices.GetWishListProDuct(this.WishListProduct).subscribe({
        next: (iconproduct) => {
          if (Number(iconproduct) == -1) {
            this.IconCheck[1] = true;
            this.IconCheck[0] = false;
          } else {
            this.IconCheck[0] = true;
            this.IconCheck[1] = false;
          }
        },
      });
    } else {
      if (getCookie('Product' + this.id) != null) {
        this.IconCheck[0] = true;
        this.IconCheck[1] = false;
      } else {
        this.IconCheck[1] = true;
        this.IconCheck[0] = false;
      }
    }
  }
  ChangeDetailAndDeliverry(num: number) {
    if (num == 1) {
      this.DetailDelivery[0] = false;
      this.DetailDelivery[1] = true;
      this.DetailDelivery[2] = false;
    } else if (num == 0) {
      this.DetailDelivery[0] = true;
      this.DetailDelivery[1] = false;
      this.DetailDelivery[2] = true;
    }
  }
  IConChange() {
    if (this.IconCheck[2] == false) {
      this.IconCheck[0] = !this.IconCheck[0];
      this.IconCheck[1] = !this.IconCheck[1];
    } else if (this.IconCheck[2] == true) {
      this.IconCheck[2] = !this.IconCheck[2];
    }
  }
  IConClick() {
    this.IconCheck[2] = true;
    if (this.NameUser != 'null') {
      this.productServices.GetWishListProDuct(this.WishListProduct).subscribe({
        next: (iconproduct) => {
          if (Number(iconproduct) == -1) {
            this.AddWishList();
          } else {
            this.DeleteWishList();
          }
        },
      });
    } else {
      if (getCookie('Product' + this.id) == '0') {
        this.count--;
        this.WishListService.WishListUpdate(this.count);
        removeCookie('Product' + this.id, { path: '/' });
        this.CookieProduct = String(getCookie('CookieProduct')).replace(
          ',' + this.id,
          ''
        );
        setCookie('CookieProduct', this.CookieProduct, { path: '/' });
      } else if (getCookie('Product' + this.id) == null) {
        this.count++;
        this.WishListService.WishListUpdate(this.count);
        this.CookieProduct = String(getCookie('CookieProduct')) + ',' + this.id;
        setCookie('CookieProduct', this.CookieProduct, { path: '/' });
        setCookie('Product' + this.id, '0', { path: '/' });
      }
    }
    setTimeout(() => {
      this.IconWishList();
    }, 100);
  }
  InfoDetailProduct(id: number) {
    this.productServices.GetProductByID(id).subscribe({
      next: (product) => {
        this.product = product;
        this.Price = product.product_Price;
        this.productServices
          .GetImgProductByID(this.product.image_Product_id)
          .subscribe({
            next: (img) => {
              this.image = img;
            },
          }),
          this.productServices.GetBrandByID(this.product.brand_id).subscribe({
            next: (brand) => {
              this.brand = brand;
              this.productServices
                .GetNsxByID(Number(this.brand.nsx_id))
                .subscribe({
                  next: (nsx) => {
                    this.Nsx = nsx;
                  },
                });
            },
          });
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  AddWishList() {
    this.count++;
    this.WishListService.WishListUpdate(this.count);
    this.productServices.AddProductInWishList(this.WishListProduct).subscribe();
  }
  DeleteWishList() {
    this.count--;
    this.WishListService.WishListUpdate(this.count);
    this.productServices
      .DeleteProductInWishList(this.WishListProduct)
      .subscribe();
  }
  Onclick(even: any) {
    this.Price =
      '$' +
      String(
        Number(this.product.product_Price.replace('$', '')) + Number(even.price)
      );
    this.BagProduct.size_id = even.idsize;
    this.WishListProduct.size_id = even.idsize;
    this.IconWishList();
  }
  AddBag(paraphrase: string) {
    if (paraphrase == 'Add To Bag') {
      if (this.NameUser == 'null') {
        this.WishListService.ChangeLoginCheck(false);
      } else {
        this.BagProduct.bag_id = Number(sessionStorage.getItem('IdBag'));
        this.BagProduct.quality = 1;
        this.productServices.AddProductInBag(this.BagProduct).subscribe();
        this.BagButton.paraphrase = 'In Your Bag';
        this.BagCount++;
        this.WishListService.BagUpdate(this.BagCount);
      }
    } else if (paraphrase == 'In Your Bag') {
      this.router.navigate(['Bag']);
    }
  }
}
