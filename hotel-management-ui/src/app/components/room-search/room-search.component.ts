import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomService } from '../../services/services';
import { PageResponseRoomDto } from '../../services/models';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrl: './room-search.component.css'
})
export class RoomSearchComponent implements OnInit  {



   startDate :string|undefined
   endDate :string|undefined
   roomTypeSelected :string|undefined
   errorMsg :string[]=[]
  roomTypes:string[]=[]
  selectedRoomType:string=""
  pageNumber:number=0;
  size:number=2;
  pageResponseRoomDTO:PageResponseRoomDto={}
  pages: number= this.pageResponseRoomDTO.totalPages as number
  @Output() search:EventEmitter<boolean>= new EventEmitter<boolean>();
  @Output() types:EventEmitter<string[]>= new EventEmitter<string[]>();
  

  
  
  
  constructor(private RoomService:RoomService){
   
  }
  
  ngOnInit(): void {
    
    this.getAllRoomType()

  }
  
  getAllRoomType(): void {
    this.RoomService.getAllRoomType({}).subscribe({
      next: (data) => {
        this.types.emit(data);
        console.log(data)
        this.roomTypes = data;
      },error:(err)=>{
        console.log(err)
        this.errorMsg=err.error.error
      }
    
    })
  }
  onSearchRooms(){
    this.search.emit(true)
    this.RoomService.getAllRoomsByDateAndType({
      roomType:this.roomTypeSelected,
      size:this.size,
      page:this.pageNumber,
      checkInDate:this.startDate,
      checkOutDate:this.endDate
      

    }).subscribe({
      next:(val)=>{
     
        this.pageResponseRoomDTO=val
        console.log(val)
        
      }
      ,error:error=>{
        this.errorMsg=error.error.error
        console.log(error)
      }
    })
  }
  goToLastPage() {
    this.pageNumber=this.pages;
    this.onSearchRooms()
    }
    goToNextPage() {
    this.pageNumber++;
    this.onSearchRooms()
    }
    gotToPage(pageIndex: number) {
      this.pageNumber=pageIndex;
      this.onSearchRooms()
    
    }
    goToPreviousPage() {
      this.pageNumber--;
    this.onSearchRooms()
    
    
    }
    goToFirstPage() {
    this.pageNumber=0;
    this.onSearchRooms()
    }
    get isLastPage() {
      return this.pageNumber === this.pageResponseRoomDTO.totalPages as number - 1;
    }


}
