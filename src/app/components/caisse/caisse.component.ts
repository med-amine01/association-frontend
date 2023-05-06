import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CaisseService } from 'src/app/services/caisse.service';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.css']
})
export class CaisseComponent {
  constructor(private caisseservice:CaisseService){}
  onSubmit(f:NgForm){
    console.log(f.value['amount'])
    this.caisseservice.depositMoney(f.value['amount']).subscribe(  data => {
      console.log(data)
    })
  }
}
