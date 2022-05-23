import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightBookingDetails, FlightDetails, PassengerDetails } from '../models/FlightDetails';
import { SearchService } from '../shared/search.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bookflights',
  templateUrl: './bookflights.component.html',
  styleUrls: ['./bookflights.component.css']
})
export class BookflightsComponent implements OnInit {

  @Input() userFlightData: FlightDetails = new FlightDetails();
  constructor(private _search: SearchService, private _router: Router, private route: ActivatedRoute, public httpc: HttpClient, private toastr: ToastrService) { }
  userBookingDetailsArray: any = [];
  passengerArray: Array<PassengerDetails> = [];
  newPassenger: any = {};
  userBookingData: any = {};
  FinalPrice:number=0;
  ngOnInit(): void {
    this._search.obj.subscribe(data => {
      this.userFlightData = data;
    })
this.FinalPrice=this.userFlightData.price;
    this.newPassenger = { passengerName: "", passengerAge: "", passengerGender: "", isMealOpted: "", price: this.userFlightData.price };
   // this.passengerArray.push(this.newPassenger);
  }
  bookFlight() {
    this.userBookingDetailsArray=[];
    console.log(this.passengerArray);
    this.userBookingData = { userId: localStorage.getItem('userId'), flightNo: this.userFlightData.flightNo, noOfPassengers: this.passengerArray.length, departureDateTime: this.userFlightData.departureDateTime, isOneWay: "", returnDateTime: "2022-05-29T00:00:00", tblPassengerDetails: this.passengerArray }
    this.userBookingDetailsArray.push(this.userBookingData);
    console.log(this.userBookingDetailsArray);
    this.httpc.post("http://localhost:25302/api/booking", this.userBookingDetailsArray).subscribe(res => { this.Success(res) }, res => this.Error);
    this.toastr.success('Ticket booked successfully','Success');
    this._router.navigate(['/bookingmanagement/searchflights'])
  }
  addRow(index: any) {
    this.newPassenger = { passengerName: "", passengerAge: "", passengerGender: "", isMealOpted: "", price: this.userFlightData.price };
    this.passengerArray.push(this.newPassenger);
    return true;
  }

  deleteRow(index: any) {
    if (this.passengerArray.length == 1) {
      return false;
    } else {
      this.passengerArray.splice(index, 1);
      return true;
    }
  }
  Error(res: any) {

    this.toastr.error('Something went wrong!!','Error');
  }
  Success(res: any) {
  
    this.toastr.success('Ticket booked successfully','Success');
 
  }
  Seats(e:any)
  {
    for (let index = 0; index < e.value; index++) {
      this.addRow(index);
      
    }
this.FinalPrice=this.userFlightData.price* e.value;
  }
}
