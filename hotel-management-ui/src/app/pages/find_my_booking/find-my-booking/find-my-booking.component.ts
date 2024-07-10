import { Component } from '@angular/core';
import { BookingService, RoomService } from '../../../services/services';
import { BookingDto } from '../../../services/models';

@Component({
  selector: 'app-find-my-booking',
  templateUrl: './find-my-booking.component.html',
  styleUrl: './find-my-booking.component.css'
})
export class FindMyBookingComponent {
  constructor(private bookingService:BookingService) { }
  findAvecSuccess:boolean=false
  errorMsg:string|undefined

  bookingCode:string="";
  bookingDetails:BookingDto={}
  private _roomImage: string | undefined;
  selectedPhoto:any
  public get roomImage(): string | undefined {
    if(this.selectedPhoto){
      this._roomImage="data:image/jpg;base64 ,"+this.selectedPhoto
    }
    return `https://picsum.photos/200/300?random=${Math.random()}`;
  }
  public set roomImage(value: string | undefined) {
    this._roomImage = value;
  }
  findBooking(){
    this.bookingService.findBookingByConfirmationCode({
      confirmationCode:this.bookingCode
    }).subscribe({
      next:val=>{
        this.bookingDetails=val
        this.selectedPhoto=val.room?.roomPhoto
        this.findAvecSuccess= true
        
      },error:err=>{
        console.log(err)
      }
    })
  }

}
