import { Component, Input, OnInit } from '@angular/core';
import { BillProduct } from 'src/app/Model/product.model';
import { WishListService } from 'src/app/Services/WishList.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-bill-productlist',
  templateUrl: './bill-productlist.component.html',
  styleUrls: ['./bill-productlist.component.css'],
})
export class BillProductlistComponent implements OnInit {
  @Input() BillID!: number;
  ListProduct: any[] = [];
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
    createTime: '',
  };
  BillProduct: BillProduct[] = [];
  constructor(
    private productServices: ProductServiceService,
    private WishlistService: WishListService
  ) {}
  ngOnInit(): void {
    this.productServices.GetAllByBillID(this.BillID).subscribe({
      next: (bill) => {
        this.BillProduct = bill;
        this.BillProduct.forEach((product) => {
          this.GetProduct(product.product_id, product.size_id, 1);
        });
      },
    });
  }
  GetProduct(idproduct: number, size: number, quality: number) {
    this.productServices.GetProductByID(idproduct).subscribe({
      next: (product) => {
        this.product = product;
        this.product.size_id = size;
        this.product.quality = quality;
        this.ListProduct.push(product);
      },
    });
  }
}
