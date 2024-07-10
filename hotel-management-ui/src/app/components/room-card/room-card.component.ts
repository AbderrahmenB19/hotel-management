import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoomDto } from '../../services/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  constructor(private router:Router){}
  
  
  private _roomDTO: RoomDto | undefined;
  
  private _selectedPhoto: string | undefined;
  public get roomDTO(): RoomDto | undefined {
    return this._roomDTO;
  }

  @Input()
  public set roomDTO(value: RoomDto | undefined) {
    this._roomDTO = value;
  }
  
  public get selectedPhoto(): string | undefined {
    if(this._roomDTO?.roomPhoto){
      return this._selectedPhoto = 'data:image/jpg;base64,'+ this._roomDTO.roomPhoto;
    }
    return `https://picsum.photos/200/300?random=${Math.random()}`;
  }
  public set selectedPhoto(value: string | undefined) {
    this._selectedPhoto=value;
    
    
  }

 
  onvieworBook(){
    this.router.navigate(['booking-details' , this.roomDTO?.id])
  }



  

}
