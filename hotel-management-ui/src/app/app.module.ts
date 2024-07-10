import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './pages/home/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule } from '@angular/material/icon';
import { RoomSearchComponent } from './components/room-search/room-search.component'
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { MatButtonModule } from '@angular/material/button';
import { AllRoomsComponent } from './pages/booking_rooms/all-rooms/all-rooms.component';
import { FindMyBookingComponent } from './pages/find_my_booking/find-my-booking/find-my-booking.component';
import { RoomDetailsPageComponent } from './pages/booking_details/room-details-page/room-details-page.component';
import { LoginComponent } from './pages/auth/login/login.component';

import { RegisterComponent } from './pages/auth/register/register.component';
import { ActivateAccountComponent } from './pages/auth/activate-account/activate-account.component';
import { CodeInputModule } from 'angular-code-input';
import { authInterceptor } from './services/interceptor/auth.interceptor';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { ImageModalComponent } from './pages/profile/image-modal/image-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { ManageRoomsComponent } from './pages/admin/manage-rooms/manage-rooms.component';
import { ManageBookingsComponent } from './pages/admin/manage-bookings/manage-bookings.component';
import { AddNewRoomComponent } from './pages/admin/add-new-room/add-new-room.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    RoomSearchComponent,
    RoomCardComponent,
    AllRoomsComponent,
    FindMyBookingComponent,
    RoomDetailsPageComponent,
    LoginComponent,
    RegisterComponent,
      ActivateAccountComponent,
      ProfileComponent,
      ImageModalComponent,
      AdminComponent,
      ManageRoomsComponent,
      ManageBookingsComponent,
      AddNewRoomComponent,
     
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    CodeInputModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideNativeDateAdapter(),


  
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
