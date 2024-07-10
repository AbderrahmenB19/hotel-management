import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { AllRoomsComponent } from './pages/booking_rooms/all-rooms/all-rooms.component';
import { FindMyBookingComponent } from './pages/find_my_booking/find-my-booking/find-my-booking.component';
import { RoomDetailsPageComponent } from './pages/booking_details/room-details-page/room-details-page.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ActivateAccountComponent } from './pages/auth/activate-account/activate-account.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { guardGuard } from './services/guard/guard.guard';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { ManageRoomsComponent } from './pages/admin/manage-rooms/manage-rooms.component';
import { ManageBookingsComponent } from './pages/admin/manage-bookings/manage-bookings.component';
import { AddNewRoomComponent } from './pages/admin/add-new-room/add-new-room.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path:'rooms', component:AllRoomsComponent
  },
  {
    path:'find-booking', component:FindMyBookingComponent, canActivate:[guardGuard]
  },{
    path:"booking-details/:roomId", component:RoomDetailsPageComponent , canActivate:[guardGuard]
  },
  {
    path:"login", component: LoginComponent
  },
  {
    path:"register", component: RegisterComponent
  },
  {
    path:"activate-account", component: ActivateAccountComponent
  },
  {
    path:"profile" , component:ProfileComponent , canActivate:[guardGuard]
  },{
    path:"admin" , component:AdminComponent ,canActivate:[guardGuard]
  },
  {
    path:"manage-rooms", component:ManageRoomsComponent,canActivate:[guardGuard ]
  }, {
    path:"manage-bookings",component:ManageBookingsComponent,canActivate:[guardGuard]
  }, 
  {
    path:'save-room/:roomId', component:AddNewRoomComponent , canActivate:[guardGuard]
  },
  { path: 'save-room', component: AddNewRoomComponent, canActivate: [guardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
