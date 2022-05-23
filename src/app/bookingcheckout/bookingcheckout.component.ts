import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightBookingDetails, FlightDetails, PassengerDetails } from '../models/FlightDetails';
import { SearchService } from '../shared/search.service';
@Component({
  selector: 'app-bookingcheckout',
  templateUrl: './bookingcheckout.component.html',
  styleUrls: ['./bookingcheckout.component.css']
})
export class BookingcheckoutComponent implements OnInit {
  @Input() userFlightData: FlightDetails = new FlightDetails();
  
  constructor(private _search: SearchService, private _router: Router, private route: ActivatedRoute, public httpc: HttpClient) { }
  userBookingDetailsArray: any = [];
  passengerArray: Array<PassengerDetails> = [];
  newPassenger: any = {};
  userBookingData: any = {};
  ngOnInit(): void {
    this._search.obj.subscribe(data => {
      this.userFlightData = data;
    })

    this.newPassenger = { passengerName: "", passengerAge: "", passengerGender: "", isMealOpted: "", price: this.userFlightData.price };
    this.passengerArray.push(this.newPassenger);
  }
calculatePrice(e:any)
{

}
bookFlight() {
  console.log(this.passengerArray);
  this.userBookingData = { userId: localStorage.getItem('userId'), flightNo: this.userFlightData.flightNo, noOfPassengers: this.passengerArray.length, departureDateTime: this.userFlightData.departureDateTime, isOneWay: "", returnDateTime: "2022-05-29T00:00:00", tblPassengerDetails: this.passengerArray }
  this.userBookingDetailsArray.push(this.userBookingData);
  console.log(this.userBookingDetailsArray);
  this.httpc.post("http://localhost:48531/api/flight/booking", this.userBookingDetailsArray).subscribe(res => { this.Success(res) }, res => this.Error);
}
Error(res: any) {
  console.log(res);
}
Success(res: any) {
  console.log(res.response);
  alert(res.response);
}
}
