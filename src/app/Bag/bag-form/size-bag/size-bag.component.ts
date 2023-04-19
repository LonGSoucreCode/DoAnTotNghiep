import { Component, Input, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-size-bag',
  templateUrl: './size-bag.component.html',
  styleUrls: ['./size-bag.component.css']
})
export class SizeBagComponent implements OnInit{

  @Input() SizeID!: number;
  SizeNumber!: number;
  constructor(
    private productServices: ProductServiceService
  ) {}
  ngOnInit(): void {
    this.productServices.GetSizeBySizeId(this.SizeID).subscribe({
      next: (size) => {
        this.SizeNumber = Number(String(size.size_Number).replace('.0',''));
      }
    })
  }

}
