import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/services';
import { PageResponseRoomDto } from '../../../services/models';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css'] // Corrected styleUrl to styleUrls
})
export class AllRoomsComponent implements OnInit {
onFilterChange($event: MatSelectChange) {
throw new Error('Method not implemented.');
}
  pageNumber: number = 0;
  size: number = 3;
  Types: string[] = [];
  search: boolean = false;
  PageResponseAllRoomDto: PageResponseRoomDto = {};
  pages: Array<number> = [];

  constructor(private RoomService: RoomService) {}

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
}
