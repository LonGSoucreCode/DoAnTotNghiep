import { Component, OnInit } from '@angular/core';
import { WishListService } from 'src/app/Services/WishList.service';

@Component({
  selector: 'app-account-connectedservice',
  templateUrl: './account-connectedservice.component.html',
  styleUrls: ['./account-connectedservice.component.css']
})
export class AccountConnectedserviceComponent implements OnInit{
  constructor(private WishlistService: WishListService){}
  ngOnInit(): void {
    this.WishlistService.ChangeAccount(4);
  }

}
