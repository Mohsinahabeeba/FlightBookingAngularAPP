import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BookingManagementComponent } from './booking-management/booking-management.component';
import { SearchflightsComponent } from './booking-management/searchflights/searchflights.component';
import { BookflightsComponent } from './bookflights/bookflights.component';
import { ManagebookingsComponent } from './booking-management/managebookings/managebookings.component';
import { BookinghistoryComponent } from './booking-management/bookinghistory/bookinghistory.component';
import { UserComponent } from './user/user.component';
import { BookingcheckoutComponent } from './bookingcheckout/bookingcheckout.component';
import { ManageairlinesComponent } from './manageinventory/manageairlines/manageairlines.component';
import { ManageinventoryComponent } from './manageinventory/manageinventory.component';
import { AddairlinesComponent } from './manageinventory/addairlines/addairlines.component';
import { UserService } from './shared/user.service';
import { AuthGuard } from './shared/auth.guard';
import {SearchService} from './shared/search.service'
import { TokenInterceptorService } from './shared/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BookingManagementComponent,
    SearchflightsComponent,
    BookflightsComponent,
    ManagebookingsComponent,
    BookinghistoryComponent,
    UserComponent,
    BookingcheckoutComponent,
    ManageairlinesComponent,
    ManageinventoryComponent,
    AddairlinesComponent,
     
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
  ],
  providers: [SearchService, UserService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
