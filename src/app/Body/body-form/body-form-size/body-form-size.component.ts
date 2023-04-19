import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CTSizeOut, Size } from 'src/app/Model/product.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-body-form-size',
  templateUrl: './body-form-size.component.html',
  styleUrls: ['./body-form-size.component.css'],
})
export class BodyFormSizeComponent implements OnInit, OnChanges {
  @Input() check!: boolean;
  @Input() MinSize!: number;
  @Input() MaxSize!: number;
  @Output() newItemEvent = new EventEmitter<any>();
  SizeList: Size[] = [];
  CheckSize: boolean[] = [];
  Size!: number;
  OutSize: CTSizeOut = {
    SizeID: 0,
    SizeCheck: false,
  };
  constructor(private productServices: ProductServiceService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.productServices.GetSize().subscribe({
        next: (size) => {
          this.SizeList = size;
          this.SizeList = this.SizeList.filter(
            (size) =>
              size.size_id >= this.MinSize && size.size_id <= this.MaxSize
          );
          this.SizeList.forEach((size) => {
            this.CheckSize[size.size_id] = false;
          });
        },
      });
    }
  }
  ngOnInit(): void {
    this.productServices.GetSize().subscribe({
      next: (size) => {
        this.SizeList = size;
        this.SizeList = this.SizeList.filter(
          (size) => size.size_id >= this.MinSize && size.size_id <= this.MaxSize
        );
        this.SizeList.forEach((size) => {
          this.CheckSize[size.size_id] = false;
        });
      },
    });
  }
  ClickSize(num: number, check: boolean) {
    this.CheckSize[num] = !this.CheckSize[num];
    this.OutSize.SizeID = num;
    this.OutSize.SizeCheck = !check;
    this.newItemEvent.emit(this.OutSize);
  }
}
