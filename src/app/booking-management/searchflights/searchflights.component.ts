import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FlightDetails, SearchInputData } from '../../models/FlightDetails';
import { UserService } from '../../shared/user.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-searchflights',
  templateUrl: './searchflights.component.html',
  styleUrls: ['./searchflights.component.css']
})

export class SearchflightsComponent implements OnInit {
  public isdisabled:boolean=true;
  searchInputData: SearchInputData = new SearchInputData();
  flightDetails: Array<FlightDetails> = new Array<FlightDetails>();

  constructor(public httpc: HttpClient, private router: Router, private _searchService: SearchService, private _authService: UserService) { }

  ngOnInit(): void {
   //get all flights
   this.getFlights();
  }
  getFlights() {
 
    const url = "http://localhost:5546/api/airline/inventory/getairlines";
    this.httpc.get(url).subscribe(res => this.Success(res), res => this.Error(res))
  }
  searchFlights() {
    debugger;
    var searchdto = {
      fromLocation: this.searchInputData.fromLocation,
      toLocation: this.searchInputData.toLocation,
      noOfPassengers: this.searchInputData.noOfPassengers,
      departureDate:this.searchInputData.departureDate,
      returnDate:this.searchInputData.returnDate,
      isOneway:this.isdisabled
    }
    this.httpc.post("http://localhost:59282/api/search", searchdto).subscribe(res => { this.Success(res) }, res => this.Error);

  }

  bookFlight(obj: FlightDetails) {
    this._searchService.UserBookingObj(obj);
    this.router.navigate(['/bookflight']); 
      
  }

  Error(res: any) {
    this.flightDetails=[];
    console.log(res);
  }
  Success(res: any) {
    console.log(res); 
    if(res)   
    this.flightDetails = res;
    else
    this.flightDetails=[];
    console.log(this.flightDetails);
  }

  userLoggedIn(input:boolean):boolean{
    if(input){
      return this._authService.userLoggedIn();
    }
    else{
      return !this._authService.userLoggedIn();
    }
  }
  twoway()
  {
    this.isdisabled=false;
  }
  oneway()
  {
    this.isdisabled=true;
  }
}
