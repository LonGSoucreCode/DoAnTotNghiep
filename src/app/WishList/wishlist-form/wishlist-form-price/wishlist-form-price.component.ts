import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-wishlist-form-price',
  templateUrl: './wishlist-form-price.component.html',
  styleUrls: ['./wishlist-form-price.component.css'],
})
export class WishlistFormPriceComponent implements OnInit, OnChanges {
  @Input() price!: string;
  @Input() sizeid!: number;
  @Input() productid!: number;
  Price!: string;

  constructor(private productServices: ProductServiceService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.Price = this.price;
      if (this.sizeid != 0) {
        this.productServices
          .GetSizeByCTSizeId(this.productid, this.sizeid)
          .subscribe({
            next: (size) => {
              this.Price =
                '$' +
                String(
                  Number(String(this.Price.replace('$', ''))) +
                    Number(size.size_Surcharges)
                );
            },
          });
      }
    }
  }
  ngOnInit(): void {}
}
