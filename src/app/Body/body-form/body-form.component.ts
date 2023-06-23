import { Component, OnInit } from '@angular/core';
import {
  brand,
  Category,
  product,
  SizeProduct,
} from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { WishListService } from 'src/app/Services/WishList.service';
import { getCookie } from 'typescript-cookie';

@Component({
  selector: 'app-body-form',
  templateUrl: './body-form.component.html',
  styleUrls: ['./body-form.component.css'],
})
export class BodyFormComponent implements OnInit {
  UserCheck!: string;
  icon: string = 'bxs-heart';
  check!: boolean[];
  // 0 filter
  // 1 sort
  // 2 category
  // 3 brand
  // 4 size
  // 5 sale
  // 6 price
  allcardcheck: boolean = false;
  num!: number;
  products: product[] = [];
  CategoryList: Category[] = [];
  CheckCategory: boolean[] = [];
  CategoryNumber: number[] = [];
  BrandList: brand[] = [];
  CheckBrand: boolean[] = [];
  BrandNumber: number[] = [];
  SizeNumber: number[] = [];
  SizeCount: number = 0;
  SizeCountAddress: number = 0;
  MaxSize: number = 0;
  MinSize: number = 0;
  SortType!: string;
  SizeProduct: SizeProduct[] = [];
  CookieProduct!: string;
  constructor(
    private productServices: ProductServiceService,
    private WishListService: WishListService
  ) {}
  count!: number;
  name!: string;
  checkproduct!: boolean;
  ngOnInit(): void {
    this.GetCategory();
    this.GetBrand();
    this.GetMinMaxSize();
    this.UserCheck = String(sessionStorage.getItem('NameUser'));
    this.GetProduct();
    this.CookieProduct = String(getCookie('CookieProduct'));
    this.WishListService.WishList.subscribe((c) => {
      this.count = c;
    });
    this.check = [false, false, false, false, false, false, false];
    this.allcardcheck = false;
  }
  GetProduct() {
    this.productServices.GetAllProduct().subscribe({
      next: (product) => {
        this.products = product.filter((item) => item.isActive == true);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  Check(number: number) {
    if (number == 0) {
      this.allcardcheck = !this.allcardcheck;
    }
    this.check[number] = !this.check[number];
  }
  GetCategory() {
    this.productServices.GetAllCategory().subscribe({
      next: (category) => {
        this.CategoryList = category;
        this.CategoryList.forEach((cateroy) => {
          this.CheckCategory[cateroy.category_id] = false;
          this.CategoryNumber[cateroy.category_id - 1] = 0;
        });
        this.CategoryNumber[category.length] = 0;
      },
    });
  }
  GetBrand() {
    this.productServices.GetAllBrand().subscribe({
      next: (brand) => {
        this.BrandList = brand;
        this.BrandList.forEach((brand) => {
          this.CheckBrand[Number(brand.brand_id)] = false;
          this.BrandNumber[Number(brand.brand_id) - 1] = 0;
        });
        this.BrandNumber[brand.length] = 0;
      },
    });
  }
  GetMinMaxSize() {
    this.WishListService.MinSizeCheckForm.subscribe((min) => {
      this.MinSize = min;
    });
    this.WishListService.MaxSizeCheckForm.subscribe((max) => {
      this.MaxSize = max;
    });
  }
  // FilterSize() {
  //   this.products.forEach((product) => {
  //     this.checkproduct = false;
  //     for (var i = 0; i < this.SizeNumber.length; i++) {
  //       for (var j = 0; j < this.SizeNumber.length; j++) {
  //         this.productServices
  //           .GetAllSizeBySizeId(this.SizeNumber[i])
  //           .subscribe({ next: (size) => {
  //             size.forEach((s => {
  //               if(Number(product.product_id) == s.product_id){
  //                 console.log(product.product_id,s.size_id)
  //                 this.checkproduct = true;
  //               }
  //             }))
  //           } });
  //       }
  //     }
  //     if (this.checkproduct == false) {
  //       product.isActive = false;
  //     }
  //   });
  //   console.log(this.products)
  // }

  ClickSize(event: any) {
    // console.log(event);
    // if (event.SizeCheck == true) {
    //   console.log(this.SizeCountAddress);
    //   this.SizeNumber[this.SizeCountAddress] = event.SizeID;
    //   this.SizeCount++;
    //   this.SizeCountAddress++;
    // } else if (event.SizeCheck == false) {
    //   for (let i = 0; i < this.SizeNumber.length; i++) {
    //     if (this.SizeNumber[i] == event.SizeID) {
    //       this.SizeNumber[i] = 0;
    //       this.SizeCount--;
    //     }
    //   }
    // }
    // console.log(this.SizeNumber);
    // this.Filter();
  }
  ClickBrand(num: string) {
    if (this.CheckBrand[Number(num)] == true) {
      this.BrandNumber[Number(num) - 1] = 0;
      this.CheckBrand[Number(num)] = false;
      this.BrandNumber[this.BrandNumber.length - 1] = --this.BrandNumber[
        this.BrandNumber.length - 1
      ];
    } else if (this.CheckBrand[Number(num)] == false) {
      this.BrandNumber[Number(num) - 1] = Number(num);
      this.CheckBrand[Number(num)] = true;
      this.BrandNumber[this.BrandNumber.length - 1] = ++this.BrandNumber[
        this.BrandNumber.length - 1
      ];
    }
    this.Filter();
  }
  ClickCatefory(num: number) {
    if (this.CheckCategory[num] == true) {
      this.CategoryNumber[num - 1] = 0;
      this.CheckCategory[num] = false;
      this.CategoryNumber[this.CategoryNumber.length - 1] = --this
        .CategoryNumber[this.CategoryNumber.length - 1];
    } else if (this.CheckCategory[num] == false) {
      this.CategoryNumber[num - 1] = num;
      this.CategoryNumber[this.CategoryNumber.length - 1] = ++this
        .CategoryNumber[this.CategoryNumber.length - 1];
      this.CheckCategory[num] = true;
    }
    this.Filter();
  }
  Filter() {
    this.productServices.GetAllProduct().subscribe({
      next: (product) => {
        this.products = product;
        if (this.CategoryNumber[this.CategoryNumber.length - 1] != 0) {
          this.FilterCategory();
        }
        if (this.BrandNumber[this.BrandNumber.length - 1] != 0) {
          this.FilterBrand();
        }
        if (this.SizeCount > 0) {
          // this.FilterSize();
        }
        setTimeout(() => {
          this.products = this.products.filter((item) => item.isActive == true);
        }, 75);

        // if (this.products[0] == null) {
        //   this.products = product;
        // }
        // console.log(this.products);
      },
    });
  }
  FilterBrand() {
    this.products.forEach((product) => {
      this.checkproduct = false;
      for (var i = 0; i < this.BrandNumber.length - 1; i++) {
        if (Number(product.brand_id) == this.BrandNumber[i]) {
          this.checkproduct = true;
        }
      }
      if (this.checkproduct == false) {
        product.isActive = false;
      }
    });
  }
  FilterCategory() {
    this.products.forEach((product) => {
      this.checkproduct = false;
      for (var i = 0; i < this.CategoryNumber.length - 1; i++) {
        if (Number(product.category_id) == this.CategoryNumber[i]) {
          this.checkproduct = true;
        }
      }
      if (this.checkproduct == false) {
        product.isActive = false;
      }
    });
  }
  Sort(type: string) {
    this.SortType = type;
    this.products.forEach((product) => {
      product.product_Price = product.product_Price.replace('$', '');
      product.product_Price = product.product_Price.replace(',', '');
      Number(product.product_Price);
    });
    this.QuickSort(0, this.products.length - 1);
    this.products.forEach((product) => {
      product.product_Price = product.product_Price.replace('$', '');
      product.product_Price = product.product_Price.replace(',', '');
    });
    this.products.forEach((product) => {
      product.product_Price = '$' + product.product_Price;
    });
  }

  Swap(a: number, b: number) {
    let save: product = this.products[a];
    this.products[a] = this.products[b];
    this.products[b] = save;
  }
  Partion(l: number, h: number) {
    let p: number = Number(this.products[h].product_Price);
    let i: number = l - 1;
    for (var j = l; j < h; j++) {
      if (this.SortType == 'High') {
        if (Number(this.products[j].product_Price) > p) {
          i++;
          this.Swap(i, j);
        }
      }
      if (this.SortType == 'Low') {
        if (Number(this.products[j].product_Price) < p) {
          i++;
          this.Swap(i, j);
        }
      }
    }
    this.Swap(i + 1, h);
    return i + 1;
  }
  QuickSort(l: number, h: number) {
    let pi: number;
    if (l < h) {
      pi = this.Partion(l, h);
      this.QuickSort(l, pi - 1);
      this.QuickSort(pi + 1, h);
    }
  }
}
