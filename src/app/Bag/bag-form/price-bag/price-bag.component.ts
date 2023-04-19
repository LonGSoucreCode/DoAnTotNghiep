import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SizeProduct } from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-price-bag',
  templateUrl: './price-bag.component.html',
  styleUrls: ['./price-bag.component.css'],
})
export class PriceBagComponent implements OnChanges {
  SizeOut: SizeProduct = {
    cT_Size_id: 0,
    size_id: 0,
    product_id: 0,
    size_Quantity: 0,
    size_Surcharges: '',
    isActive: false,
  };
  @Input() productid!: number;
  @Input() sizeid!: number;
  @Input() price!: string;
  Price!: string;
  constructor(
    private productServices: ProductServiceService // private WishListService: WishListService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.price = this.price.replace('$', '');
      this.productServices
        .GetSizeByCTSizeId(this.productid, this.sizeid)
        .subscribe({
          next: (product) => {
            this.price ='$' + String(
              Number(this.price) + Number(product.size_Surcharges)
            );
          },
        });
    }
  }
}
