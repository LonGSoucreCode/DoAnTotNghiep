import { Component, Input, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-bill-size',
  templateUrl: './bill-size.component.html',
  styleUrls: ['./bill-size.component.css']
})
export class BillSizeComponent implements OnInit{
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
