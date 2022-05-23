import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightDetails } from '../../models/FlightDetails';
import { FlightInventoryDetails } from '../../models/InventoryDetails';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addairlines',
  templateUrl: './addairlines.component.html',
  styleUrls: ['./addairlines.component.css']
})
export class AddairlinesComponent implements OnInit {
  flightData: FlightInventoryDetails = new FlightInventoryDetails();
  flightDataArray: Array<FlightInventoryDetails> = new Array<FlightInventoryDetails>();

  constructor(public httpc: HttpClient, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.flightData = { flightNo: "", flightName: "", fromLocation: "", toLocation: "", departureDateTime: "", arrivalDateTime: "", price: 0, noOfSeats: 0, mealOption: "Y", remarks: "" };
    this.flightDataArray.push(this.flightData);
  }
  addRow(index: any) {
    this.flightData = { flightNo: "", flightName: "", fromLocation: "", toLocation: "", departureDateTime: "", arrivalDateTime: "", price: 0, noOfSeats: 0, mealOption: "Y", remarks: "" };
    this.flightDataArray.push(this.flightData);
    console.log(this.flightDataArray);
    return true;
  }

  deleteRow(index: any) {
    if (this.flightDataArray.length == 1) {
      return false;
    } else {
      this.flightDataArray.splice(index, 1);
      return true;
    }
  }

  addInventory() {
    debugger;
    this.httpc.post("http://localhost:5546/api/airline/inventory/add", this.flightDataArray).subscribe(res => { this.Success(res) }, res => this.Error);

  }

  Error(res: any) {
    this.toastr.error('Something went wrong!!','Error');
    console.log(res);
  }
  Success(res: any) {
    console.log(res);
    this.flightDataArray=[];
    this.flightData = { flightNo: "", flightName: "", fromLocation: "", toLocation: "", departureDateTime: "", arrivalDateTime: "", price: 0, noOfSeats: 0, mealOption: "Y", remarks: "" };
    this.flightDataArray.push(this.flightData);
    this.toastr.success('Airline added successfully','Success');
  }
}
