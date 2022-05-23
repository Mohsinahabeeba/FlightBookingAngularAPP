import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingManagementComponent } from './booking-management/booking-management.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { SearchflightsComponent } from './booking-management/searchflights/searchflights.component';
import { ManagebookingsComponent } from './booking-management/managebookings/managebookings.component';
import { BookinghistoryComponent } from './booking-management/bookinghistory/bookinghistory.component';
import { BookflightsComponent } from './bookflights/bookflights.component';
import { ManageinventoryComponent } from './manageinventory/manageinventory.component';
import { AddairlinesComponent } from './manageinventory/addairlines/addairlines.component';
import { ManageairlinesComponent } from './manageinventory/manageairlines/manageairlines.component';
import { BookingcheckoutComponent } from './bookingcheckout/bookingcheckout.component';

const routes: Routes = [
  
    {path:'',redirectTo:'/user/login',pathMatch:'full'},
 
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path:'bookingmanagement',
    component:BookingManagementComponent,
    children:[ {
      path:'searchflights',
      component:SearchflightsComponent
    }
    ,
    {
      path:'managebookings',
      component:ManagebookingsComponent
    }
    ,
    {
      path:'bookinghistory',
      component:BookinghistoryComponent
    }]
  },
  {
    path:'manageinventory',
    component:ManageinventoryComponent,
    children:[ {
      path:'addairlines',
      component:AddairlinesComponent
    }
    ,
    {
      path:'manageairlines',
      component:ManageairlinesComponent
    }
   ]
  },
 {
  path: 'bookflight', component: BookflightsComponent,
 },
 {
  path: 'bookingcheckout', component:BookingcheckoutComponent,
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
