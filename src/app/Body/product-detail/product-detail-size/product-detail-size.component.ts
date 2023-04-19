import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SizeOut, SizeProduct } from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-product-detail-size',
  templateUrl: './product-detail-size.component.html',
  styleUrls: ['./product-detail-size.component.css'],
})
export class ProductDetailSizeComponent implements OnInit {
  @Input() idProduct!: number;
  @Input() size!: number;
  @Output() newItemEvent = new EventEmitter<SizeOut>();
  SizeOut: SizeOut = {
    price: '',
    idproduct: 0,
    idsize: 0,
  };
  SizeChoose!: boolean;
  SizeCheck!: boolean;
  SizeNumber!: number;
  font: string = 'bold';
  SizeProductList: SizeProduct[] = [];
  constructor(
    private productServices: ProductServiceService // private WishListService: WishListService
  ) {}
  ngOnInit(): void {
    this.SizeOut.idsize = this.size;
    this.SizeOut.idproduct = Number(this.idProduct);
    if (this.size != 0) {
      this.GetSize(this.size, '');
      this.SizeCheck = false;
    } else if (this.size == 0) {
      this.SizeCheck = false;
      this.SizeChoose = false;
    }
    this.productServices
      .GetAllSizeByProductId(Number(this.idProduct))
      .subscribe({
        next: (size) => {
          this.SizeProductList = size;
        },
      });
  }
  SizeShow() {
    this.SizeCheck = !this.SizeCheck;
  }
  GetSize(id: number, price: string) {
    if (price != '') {
      this.SizeOut.price = price;
      this.SizeOut.idsize = id;
      this.newItemEvent.emit(this.SizeOut);
    }
    this.SizeChoose = true;
    this.productServices.GetSizeBySizeId(id).subscribe({
      next: (Size) => {
        this.SizeNumber = Number(String(Size.size_Number).replace('.0', ''));
      },
    });
    this.SizeCheck = !this.SizeCheck;
  }
}
