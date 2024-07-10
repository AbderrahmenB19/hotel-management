import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, BookingService, RoomService, UsersService } from '../../../services/services';
import { BookingDto, RoomDto } from '../../../services/models';

@Component({
  selector: 'app-room-details-page',
  templateUrl: './room-details-page.component.html',
  styleUrl: './room-details-page.component.css'
})
export class RoomDetailsPageComponent implements OnInit {
selectedPhoto: any=`https://picsum.photos/200/300?random=${Math.random()}`

  constructor(private acivatedRoute:ActivatedRoute , private roomService:RoomService, private BookingService:BookingService , private router:Router , private userService:UsersService){}
  roomId:Number|undefined
  room:RoomDto={
    roomDescription: '',
    roomPrice: 0,
    roomType: '',
  }
  bookoingDto:BookingDto={}
  userId:number|undefined
  Msg:string|undefined
  failed:boolean=false
  ngOnInit(): void {
    this.userService.getMyInfo({}).subscribe({
      next: (response) => {
        this.userId=response.id
    },error:err=>{
      console.log(err)
    }
  })
    this.roomId= this.acivatedRoute.snapshot.params['roomId']
    this.roomService.getRoomById({
      roomId: this.roomId as number
    }).subscribe({
      next: (data) => {
        console.log(data)
        this.room = data
        
      },
      error:err=>{
        console.log(err)
      }
    })

  }
  navigateToRoomsPage() {
    this.router.navigate(["/rooms"]);
  }
  
  SaveBooking() {
  this.BookingService.saveBooking({
    userId: this.userId as number,
    roomId: this.room.id as number,
    body: this.bookoingDto
  }).subscribe({
    next: (res) => {
      this.Msg='your booking saved successfully'
      setTimeout(()=>{
        this.Msg=undefined
      },3000)
        
      
    },error:err=>{
      this.Msg=err.error.error
      this.failed=true;
      setTimeout(()=>{
        this.Msg=undefined
      },3000)
    }
    
  })
  }



}
