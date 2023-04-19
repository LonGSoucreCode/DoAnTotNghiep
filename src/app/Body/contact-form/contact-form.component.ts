import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit{

  EmailAndPhone: boolean[] = [];

  constructor(){}
  ngOnInit(): void {
    this.EmailAndPhone = [false,false]
  }
  ShowInput(num: number){
    this.EmailAndPhone[num] = !this.EmailAndPhone[num];
  }

}
