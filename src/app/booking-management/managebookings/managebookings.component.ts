import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingHistoryDetails } from '../../models/FlightDetails';
@Component({
  selector: 'app-managebookings',
  templateUrl: './managebookings.component.html',
  styleUrls: ['./managebookings.component.css']
})
export class ManagebookingsComponent implements OnInit {
  isBookingHistoryRequired: boolean = false;
  emailId: string = '';
  pnr: string = '';
  bookingHistoryDetails: BookingHistoryDetails = new BookingHistoryDetails();
  bookingHistoryDetailsArray: Array<BookingHistoryDetails> = new Array<BookingHistoryDetails>();
  constructor(public httpc: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getBookingHistoryAll();
  }
  View(BookingDetails: any) {

  }
  Download(BookingDetails: any) {

  }
  Cancel(BookingDetails: any) {
    this.pnr=BookingDetails.pnr;
    this.cancelBooking();
  }
  getBookingHistoryByEmail() {
    this.isBookingHistoryRequired = true;
    const url = "http://localhost:25302/api/booking/history/" + this.emailId;
    this.httpc.get(url).subscribe(res => this.Success(res), res => this.Error(res))
  }

  getBookingHistoryByPnr() {
    this.isBookingHistoryRequired = true;
    const url = "http://localhost:25302/api/booking/ticket/" + this.pnr;
    this.httpc.get(url).subscribe(res => this.Success(res), res => this.Error(res))
  }
  getBookingHistoryAll() {
    this.isBookingHistoryRequired = true;
    let userid=localStorage.getItem('userId');
    const url = "http://localhost:25302/api/booking/historyall/"+userid ;
    this.httpc.get(url).subscribe(res => this.Success(res), res => this.Error(res))
  }
  cancelBooking() {
    if (confirm("Are you sure you want to cancel the booking with PNR " + this.pnr + "?")) {
      const url = "http://localhost:25302/api/booking/cancel/" + this.pnr;
      this.httpc.delete(url).subscribe(res => this.Success(res), res => this.Error(res))
    }
  }

  Error(res: any) {
    console.log(res);
  }
  Success(res: any) {
    if (this.isBookingHistoryRequired)
      this.bookingHistoryDetailsArray = res;
  }
}
