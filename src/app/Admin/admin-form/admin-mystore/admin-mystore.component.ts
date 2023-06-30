import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Category,
  CategoryAdd,
  CategoryUpdate,
  ListCode,
  Nsx,
  NsxAdd,
  NsxUpdate,
  brand,
  brandAdd,
  brandUpdate,
  imageproduct,
  imageproductAdd,
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
  ImgAdd: imageproductAdd = {
    image_Product_Main: '',
    image_Product_Detail: '',
    image_Product_Ass: '',
    image_Product_Cond: '',
  };
  MainImg!: File;
  DetailImg!: File;
  AssImg!: File;
  CondImg!: File;
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
    category1: '',
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
  ProductAdd: any = {
    product_Name: '',
    product_Price: '',
    image_Product_id: 0,
    brand_id: 0,
    category_id: 0,
    product_Story: 'null',
    sale_id: 0,
  };
  ProductUpdate: any = {
    product_id: 0,
    product_Name: '',
    product_Price: '',
    image_Product_id: 0,
    brand_id: 0,
    category_id: 0,
    product_Story: '',
    sale_id: 0,
  };
  BrandAdd: brandAdd = {
    brand_Name: '',
    nsx_id: 0,
  };
  BrandUpdate: any = {
    brand_id: '',
    brand_Name: '',
    nsx_id: '',
  };

  NsxAdd: NsxAdd = {
    nsx_Name: '',
  };
  NsxUpdate: any = {
    nsx_id: '',
    nsx_Name: '',
  };

  CategoryAdd: CategoryAdd = {
    category_Name: '',
  };
  CategoryUpdate: any = {
    category_id: 0,
    category_Name: '',
  };

  EditCheck: boolean = false;
  Choose: number = 1;
  ListBrand: any[] = [];
  ListCategory: any[] = [];
  ListCode: ListCode[] = [];
  ListNsx: any[] = [];
  constructor(
    private WishlistService: WishListService,
    private productServices: ProductServiceService,
    private route: Router,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.WishlistService.ChangeAdmin(1);
    this.ChangeList(1);
  }
  GetList(num: number) {
    this.ListProduct = [];
    if (num == 1) {
      this.Choose = 1;
      this.List = 'Product';
      this.productServices.GetAllProduct().subscribe({
        next: (listproduct) => {
          for (var i = 0; i < listproduct.length; i++) {
            this.GetProduct(listproduct[i], i);
          }
        },
      });
      this.productServices.GetAllImgProduct().subscribe({
        next: (listimg) => {
          this.ProductAdd.image_Product_id = listimg.length;
          this.ImgAdd.image_Product_Main = String(listimg.length + 1);
          this.ImgAdd.image_Product_Detail = String(listimg.length + 1);
          this.ImgAdd.image_Product_Ass = String(listimg.length + 1);
          this.ImgAdd.image_Product_Cond = String(listimg.length + 1);
        },
      });
    } else if (num == 2) {
      this.Choose = 2;
      this.List = 'Brand';
      this.productServices.GetAllBrand().subscribe({
        next: (listbrand) => {
          for (var i = 0; i < listbrand.length; i++) {
            this.GetBrand(listbrand[i], i);
          }
        },
      });
    } else if (num == 4) {
      this.Choose = 4;
      this.List = 'NSX';
      this.productServices.GetAllNsx().subscribe({
        next: (listNsx) => {
          for (var i = 0; i < listNsx.length; i++) {
            this.GetNsx(listNsx[i], i);
          }
        },
      });
    } else if (num == 5) {
      this.Choose = 5;
      this.List = 'Category';
      this.productServices.GetAllCategory().subscribe({
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
    this.GetNSX(Number(brand.nsx_id), Number(id));
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
    this.GetCategoryProduct(product.category_id, Number(product.product_id));
    this.GetImage(product.image_Product_id, Number(product.product_id));
    this.ListProduct.push(this.Product);
  }
  GetCategoryProduct(categoryid: number, id: number) {
    this.productServices.GetCategoryById(categoryid).subscribe({
      next: (category) => {
        this.ListProduct[id - 1].category = category.category_Name;
      },
    });
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
  GetNSX(nsxid: number, id: number) {
    this.productServices.GetNsxByID(nsxid).subscribe({
      next: (nsx) => {
        this.ListProduct[id].nsx = nsx.nsx_Name;
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
  Add() {
    if (this.Choose == 1) {
      this.productServices.GetAllBrand().subscribe({
        next: (listbrand) => {
          this.ListBrand = listbrand;
        },
      });
      this.productServices.GetAllCategory().subscribe({
        next: (listcategotry) => {
          this.ListCategory = listcategotry;
        },
      });
    } else if (this.Choose == 2) {
      this.productServices.GetAllNsx().subscribe({
        next: (listNsx) => {
          this.ListNsx = listNsx;
        },
      });
    }
    this.Num = 6;
  }
  Router(name: string, id: number) {
    this.route.navigate(['../product/', name, id]);
  }
  Back() {
    this.Num = this.Choose;
    this.EditCheck = false;
    if (this.Choose == 1) {
      this.ProductAdd.product_Name = '';
      this.ProductAdd.product_Price = '';
      this.ProductAdd.image_Product_id = 0;
      this.ProductAdd.brand_id = 0;
      this.ProductAdd.product_Story = '';
      this.ProductAdd.category_id = 0;
      this.ProductAdd.sale_id = 0;
      this.img.image_Product_Main = '';
      this.img.image_Product_Detail = '';
      this.img.image_Product_Ass = '';
      this.img.image_Product_Cond = '';
    } else if (this.Choose == 2) {
      this.BrandAdd.brand_Name = '';
      this.BrandAdd.nsx_id = 0;
    } else if (this.Choose == 4) {
      this.NsxAdd.nsx_Name = '';
    } else if (this.Choose == 5) {
      this.CategoryAdd.category_Name = '';
    }
  }

  AddProduct() {
    this.ProductAdd.image_Product_id = this.ProductAdd.image_Product_id + 1;
    this.ProductAdd.brand_id = Number(this.ProductAdd.brand_id);
    this.ProductAdd.category_id = Number(this.ProductAdd.category_id);
    this.ProductAdd.sale_id = 3;
    this.productServices.AddProduct(this.ProductAdd).subscribe({});
    this.productServices.AddImg(this.ImgAdd).subscribe({});
    this.UploadImage();
    setTimeout(() => {
      this.Back();
      this.GetList(this.Choose);
    }, 500);
  }
  DeleteRestoreProduct(id: number, vt: number) {
    if (this.ListProduct[vt - 1].Status == 'Active') {
      this.productServices.DeleteProduct(id).subscribe({});
      this.ListProduct[vt - 1].Status = 'Delete';
    } else if (this.ListProduct[vt - 1].Status == 'Delete') {
      this.productServices.RestoreProduct(id).subscribe({});
      this.ListProduct[vt - 1].Status = 'Active';
    }
  }
  EditProduct(product: product) {
    this.EditCheck = true;
    this.ProductAdd.product_Name = product.product_Name;
    this.ProductAdd.product_Price = product.product_Price;
    this.ProductAdd.category_id = product.category_id;
    this.ProductAdd.brand_id = Number(product.brand_id);
    this.ProductUpdate = this.ProductAdd;
    this.ProductUpdate.product_id = Number(product.product_id);
    this.productServices.GetImgProductByID(product.image_Product_id).subscribe({
      next: (img) => {
        this.img.image_Product_Main = img.image_Product_Main;
        this.img.image_Product_Detail = img.image_Product_Detail;
        this.img.image_Product_Ass = img.image_Product_Ass;
        this.img.image_Product_Cond = img.image_Product_Cond;
      },
    });
    this.Add();
  }
  UpdateProduct() {
    this.ProductUpdate.product_Price = this.ProductUpdate.product_Price.replace(
      '$',
      ''
    );
    this.productServices.UpdateProduct(this.ProductUpdate).subscribe({});
    setTimeout(() => {
      this.Back();
      this.GetList(this.Choose);
    }, 500);
  }

  AddBrand() {
    this.productServices.AddBrand(this.BrandAdd).subscribe({});
    setTimeout(() => {
      this.Back();
      this.GetList(this.Choose);
    }, 500);
  }
  DeleteBrand(id: number, vt: number) {
    this.productServices.DeleteBrand(id).subscribe({
      next: (a) => {},
    });
    this.ListProduct[vt - 1].Status = 'Delete';
  }
  RestoreBrand(id: number, vt: number) {
    this.productServices.RestoreBrand(id).subscribe({
      next: (a) => {},
    });
    this.ListProduct[vt - 1].Status = 'Active';
  }
  EditBrand(brand: brandUpdate) {
    this.EditCheck = true;
    this.BrandAdd.brand_Name = brand.brand_Name;
    this.BrandAdd.nsx_id = Number(brand.nsx_id);
    this.BrandUpdate = this.BrandAdd;
    this.BrandUpdate.brand_id = brand.brand_id;
    this.Add();
  }
  UpdateBrand() {
    this.productServices.UpdateBrand(this.BrandUpdate).subscribe({});
    setTimeout(() => {
      this.Back();
      this.GetList(this.Choose);
    }, 500);
  }

  AddNsx() {
    this.productServices.AddNsx(this.NsxAdd.nsx_Name).subscribe({});
    setTimeout(() => {
      this.Back();
      this.GetList(this.Choose);
    }, 500);
  }
  DeleteNsx(id: number, vt: number) {
    this.productServices.DeleteNsx(id).subscribe({
      next: (a) => {},
    });
    this.ListProduct[vt - 1].Status = 'Delete';
  }
  RestoreNsx(id: number, vt: number) {
    this.productServices.RestoreNsx(id).subscribe({
      next: (a) => {},
    });
    this.ListProduct[vt - 1].Status = 'Active';
  }
  EditNsx(nsx: NsxUpdate) {
    this.EditCheck = true;
    this.NsxAdd.nsx_Name = nsx.nsx_Name;
    this.NsxUpdate = this.NsxAdd;
    this.NsxUpdate.nsx_id = nsx.nsx_id;
    this.Add();
  }
  UpdateNsx() {
    this.productServices
      .UpdateCategory(Number(this.NsxUpdate.nsx_id), this.NsxUpdate.nsx_Name)
      .subscribe({});
    setTimeout(() => {
      this.Back();
      this.GetList(this.Choose);
    }, 500);
  }

  AddCategory() {
    this.productServices
      .AddCategory(this.CategoryAdd.category_Name)
      .subscribe({});
    setTimeout(() => {
      this.Back();
      this.GetList(this.Choose);
    }, 500);
  }
  DeleteCategory(id: number, vt: number) {
    this.productServices.DeleteCategory(id).subscribe({
      next: (a) => {},
    });
    this.ListProduct[vt - 1].Status = 'Delete';
  }
  RestoreCategory(id: number, vt: number) {
    this.productServices.RestoreCategory(id).subscribe({
      next: (a) => {},
    });
    this.ListProduct[vt - 1].Status = 'Active';
  }
  EditCategory(cate: CategoryUpdate) {
    this.EditCheck = true;
    this.CategoryAdd.category_Name = cate.category_Name;
    this.CategoryUpdate = this.CategoryAdd;
    this.CategoryUpdate.category_id = cate.category_id;
    this.Add();
  }
  UpdateCategory() {
    this.productServices
      .UpdateCategory(
        Number(this.CategoryUpdate.category_id),
        this.CategoryUpdate.category_Name
      )
      .subscribe({});
    setTimeout(() => {
      this.Back();
      this.GetList(this.Choose);
    }, 500);
  }

  UploadImage() {
    const filedata = new FormData();
    filedata.append(
      'image',
      this.MainImg,
      'P' + String(this.ProductAdd.image_Product_id)
    );
    this.http
      .post(
        'https://localhost:44323/api/ImageProduct/UpLoadImageMain',
        filedata
      )
      .subscribe();

    filedata.append(
      'image',
      this.DetailImg,
      'P' + String(this.ProductAdd.image_Product_id)
    );
    this.http
      .post(
        'https://localhost:44323/api/ImageProduct/UpLoadImageDetail',
        filedata
      )
      .subscribe();

    filedata.append(
      'image',
      this.AssImg,
      'P' + String(this.ProductAdd.image_Product_id)
    );
    this.http
      .post('https://localhost:44323/api/ImageProduct/UpLoadImageAss', filedata)
      .subscribe();

    filedata.append(
      'image',
      this.CondImg,
      'P' + String(this.ProductAdd.image_Product_id)
    );
    this.http
      .post(
        'https://localhost:44323/api/ImageProduct/UpLoadImageCond',
        filedata
      )
      .subscribe();
  }
  UploadDetailImg(e: any) {
    this.DetailImg = <File>e.target.files[0];
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.img.image_Product_Detail = event.target.result;
      };
    }
  }
  UploadAssImg(e: any) {
    this.AssImg = <File>e.target.files[0];
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.img.image_Product_Ass = event.target.result;
      };
    }
  }
  UploadCondImg(e: any) {
    this.CondImg = <File>e.target.files[0];
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.img.image_Product_Cond = event.target.result;
      };
    }
  }
  UploadMainImg(e: any) {
    this.MainImg = <File>e.target.files[0];
    if (e.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.img.image_Product_Main = event.target.result;
      };
    }
  }
}
