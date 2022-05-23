import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingHistoryDetails } from '../../models/FlightDetails';
@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})

export class BookinghistoryComponent implements OnInit {
  isBookingHistoryRequired: boolean = false;
  emailId: string = '';
  pnr: string = '';
  bookingHistoryDetails: BookingHistoryDetails = new BookingHistoryDetails();
  bookingHistoryDetailsArray: Array<BookingHistoryDetails> = new Array<BookingHistoryDetails>();
  constructor(public httpc: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getBookingHistoryAll();
  }
  getBookingHistoryAll() {
    this.isBookingHistoryRequired = true;
    let userid=localStorage.getItem('userId');
    const url = "http://localhost:25302/api/booking/historyall/"+userid ;
    this.httpc.get(url).subscribe(res => this.Success(res), res => this.Error(res))
  }
  Error(res: any) {
    console.log(res);
  }
  Success(res: any) {
    if (this.isBookingHistoryRequired)
      this.bookingHistoryDetailsArray = res;
  }
}
