import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { PageResponseRoomDto } from '../../../services/models';
import { RoomService } from '../../../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-rooms',
  templateUrl: './manage-rooms.component.html',
  styleUrl: './manage-rooms.component.css'
})
export class ManageRoomsComponent {
onDelete(arg0: number|undefined) {
this.RoomService.deleteRoomById({
  roomId:arg0 as number
}).subscribe({
  next: (data) => {
    
    this.msg =" room deleted successfully !!"
        setTimeout(()=>{
          this.msg=undefined
          this.getAllRooms()
        }, 3000)
  }
})
}
msg: string|undefined;


onFilterChange($event: MatSelectChange) {
  throw new Error('Method not implemented.');
  }
    pageNumber: number = 0;
    size: number = 3;
    Types: string[] = [];
    search: boolean = false;
    PageResponseAllRoomDto: PageResponseRoomDto = {};
    pages: Array<number> = [];
  
    constructor(private RoomService: RoomService, private router:Router) {}
  
    ngOnInit(): void {
      this.getAllRooms();
    }
  
    getAllRooms() {
      this.RoomService.getAllRooms({
        page: this.pageNumber,
        size: this.size
      }).subscribe({
        next: (val) => {
          console.log(val);
          this.PageResponseAllRoomDto = val;
          this.pages = Array(this.PageResponseAllRoomDto.totalPages)
            .fill(0)
            .map((x, i) => i);
            
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  
    goToLastPage() {
      this.pageNumber = this.PageResponseAllRoomDto.totalPages as number - 1;
      this.getAllRooms();
    }
  
    goToNextPage() {
      this.pageNumber++;
      this.getAllRooms();
    }
  
    goToPage(pageIndex: number) {
      this.pageNumber = pageIndex;
      this.getAllRooms();
    }
  
    goToPreviousPage() {
      this.pageNumber--;
      this.getAllRooms();
    }
  
    goToFirstPage() {
      this.pageNumber = 0;
      this.getAllRooms();
    }
  
    get isLastPage() {
      return this.pageNumber === (this.PageResponseAllRoomDto.totalPages as number) - 1;
    }
  
    getAllTypes(types: string[]) {
      this.Types = types;
    }
  
    onSearch(search: boolean) {
      this.search = search;
    }
    onEditRoom(roomId:any) {
      this.router.navigate(["save-room", roomId])
      }
  }
  