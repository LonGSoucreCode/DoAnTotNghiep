import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Category,
  ListCode,
  Nsx,
  brand,
  imageproduct,
  product,
} from 'src/app/Model/product.model';
import { WishListService } from 'src/app/Services/WishList.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-admin-mystore',
  templateUrl: './admin-mystore.component.html',
  styleUrls: ['./admin-mystore.component.css'],
})
export class AdminMystoreComponent implements OnInit {
  img: imageproduct = {
    image_Product_id: '',
    image_Product_Main: '',
    image_Product_Detail: '',
    image_Product_Ass: '',
    image_Product_Cond: '',
  };
  List: string = '';
  Num: number = 0;
  ListProduct: any[] = [];
  Product: any = {
    id: 0,
    product_id: '',
    product_Name: '',
    product_Price: '',
    image: '',
    brand: '',
    category: 0,
    Status: '',
  };
  Brand: any = {
    id: 0,
    brand_id: '',
    brand_Name: '',
    nsx: '',
    Status: '',
  };
  Nsx: any = {
    id: 0,
    nsx_id: '',
    nsx_Name: '',
    Status: '',
  };
  Category: any = {
    id: 0,
    category_id: 0,
    category_Name: '',
    Status: '',
  };
  ListBrand: any[] = [];
  ListCode: ListCode[] = [];
  http: any;
  constructor(
    private WishlistService: WishListService,
    private productServices: ProductServiceService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.WishlistService.ChangeAdmin(1);
    this.ChangeList(1);
  }
  GetList(num: number) {
    this.ListProduct = [];
    if (num == 1) {
      this.List = 'Product';
      this.productServices.GetAllProduct().subscribe({
        next: (listproduct) => {
          for (var i = 0; i < listproduct.length; i++) {
            this.GetProduct(listproduct[i], i);
          }
        },
      });
    } else if (num == 2) {
      this.List = 'Brand';
      this.productServices.GetAllBrand().subscribe({
        next: (listbrand) => {
          for (var i = 0; i < listbrand.length; i++) {
            this.GetBrand(listbrand[i], i);
          }
        },
      });
    } else if (num == 4) {
      this.List = 'NSX';
      this.productServices.GetAllNsx().subscribe({
        next: (listNsx) => {
          for (var i = 0; i < listNsx.length; i++) {
            this.GetNsx(listNsx[i], i);
          }
        },
      });
    } else if (num == 5) {
      this.List = 'Category';
      this.productServices.GetCategory().subscribe({
        next: (listcategory) => {
          for (var i = 0; i < listcategory.length; i++) {
            this.GetCategory(listcategory[i], i);
          }
        },
      });
    }
  }
  ChangeList(code: number) {
    this.Num = code;
    this.productServices.GetListCode(code).subscribe({
      next: (list) => {
        this.ListCode = list;
      },
    });
    this.GetList(code);
  }

  GetCategory(category: Category, id: number) {
    this.Category = category;
    this.Category.id = id + 1;
    setTimeout(() => {
      this.GetActive(category.isActive, id + 1);
    }, 500);
    console.log(this.Category);
    this.ListProduct.push(this.Category);
  }
  GetNsx(nsx: Nsx, id: number) {
    this.Nsx = nsx;
    this.Nsx.id = id + 1;
    setTimeout(() => {
      this.GetActive(nsx.isActive, id + 1);
    }, 500);
    this.ListProduct.push(this.Nsx);
  }
  GetBrand(brand: brand, id: number) {
    this.Brand = brand;
    this.Brand.id = id + 1;
    this.GetNSX(brand.nsx_id, Number(brand.brand_id));
    setTimeout(() => {
      this.GetActive(brand.isActive, id + 1);
    }, 500);
    this.ListProduct.push(this.Brand);
  }
  GetProduct(product: product, id: number) {
    this.Product = product;
    this.Product.id = id + 1;
    setTimeout(() => {
      this.GetActive(product.isActive, id + 1);
    }, 500);
    this.GetBrandProduct(product.brand_id, Number(product.product_id));
    this.GetImage(product.image_Product_id, Number(product.product_id));
    this.ListProduct.push(this.Product);
  }
  GetBrandProduct(brandid: string, id: number) {
    this.productServices.GetBrandByID(brandid).subscribe({
      next: (brand) => {
        this.ListProduct[id - 1].brand = brand.brand_Name;
      },
    });
  }
  GetImage(imageid: string, id: number) {
    this.productServices.GetImgProductByID(imageid).subscribe({
      next: (img) => {
        this.ListProduct[id - 1].image = img.image_Product_Main;
      },
    });
  }
  GetNSX(nsxid: string, id: number) {
    this.productServices.GetNsxByID(nsxid).subscribe({
      next: (nsx) => {
        this.ListProduct[id - 1].nsx = nsx.nsx_Name;
      },
    });
  }
  GetActive(active: boolean, id: number) {
    if (active == true) {
      this.ListProduct[id - 1].Status = 'Active';
    } else {
      this.ListProduct[id - 1].Status = 'Delete';
    }
  }
  AddProduct() {
    this.productServices.GetAllBrand().subscribe({
      next: (listbrand) => {
        this.ListBrand = listbrand;
        console.log(this.ListBrand);
      },
    });
    this.Num = 6;
  }
  Router(name: string, id: number) {
    this.route.navigate(['../product/', name, id]);
  }

  ClickBrand(idbrand: number) {}
  UploadDetailImg(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.img.image_Product_Detail = event.target.result;
      };
    }
  }
  UploadAssImg(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.img.image_Product_Ass = event.target.result;
      };
    }
  }
  UploadCondImg(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.img.image_Product_Cond = event.target.result;
      };
    }
  }
  UploadMainImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (
        file.type == 'image/png' ||
        file.type == 'image/jpeg' ||
        file.type == 'image/webp'
      ) {
        const formData = new FormData();
        formData.append('file', file);
        this.http
          .post(
            'https://localhost:44323/api/ImageProduct/UpLoadImageMain',
            formData
          )
          .subscribe((res: any) => {});
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (event: any) => {
          this.img.image_Product_Main = event.target.result;
        };
      }
    }
  }
}
