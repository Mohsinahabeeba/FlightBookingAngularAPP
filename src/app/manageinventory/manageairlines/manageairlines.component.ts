import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlightInventoryDetails } from '../../models/InventoryDetails';
@Component({
  selector: 'app-manageairlines',
  templateUrl: './manageairlines.component.html',
  styleUrls: ['./manageairlines.component.css']
})
export class ManageairlinesComponent implements OnInit {
  AirlinesDetails: Array<FlightInventoryDetails> = new Array<FlightInventoryDetails>();

  constructor(public httpc: HttpClient, private router: Router) { }

  ngOnInit(): void {
    //get all airlines
    this.getFlights();
  }
View(AirlinesDetails:any)
{

}
Block(AirlinesDetails:any)
{

}
getFlights() {
 
  const url = "http://localhost:5546/api/airline/inventory/getairlines";
  this.httpc.get(url).subscribe(res => this.Success(res), res => this.Error(res))
}
Error(res: any) {
  console.log(res);
}
Success(res: any) {
  console.log(res);
  this.AirlinesDetails =res;
  console.log(this.AirlinesDetails);
}
}
