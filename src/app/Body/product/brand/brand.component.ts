import { Component, Input, OnInit } from '@angular/core';
import { brand, Nsx } from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {

  @Input() id!: string;
  brand: brand = {
    brand_id: '',
    brand_Name: '',
    nsx_id: '',
    isActive: false
  };
  Nsx: Nsx = {
    nsx_id: '',
    nsx_Name: '',
  };
  constructor(private productServices: ProductServiceService) {}

  ngOnInit(): void {
    this.productServices.GetBrandByID(this.id).subscribe({
      next: (brand) => {
        this.brand = brand;
        this.productServices.GetNsxByID(this.brand.nsx_id).subscribe({
          next: (nsx) => {
            this.Nsx = nsx;
          },
        });
      },
    });
  }
}
