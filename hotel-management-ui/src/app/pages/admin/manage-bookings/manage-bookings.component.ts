import { Component, OnInit } from '@angular/core';
import { BookingDto, PageResponseBookingDto } from '../../../services/models';
import { BookingService } from '../../../services/services';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent implements OnInit {

  pageNumber: number = 0;
  size: number = 3;
  pageResponseBookingDTO: PageResponseBookingDto = {};
  pages: Array<number> = [];

  searchTerm: string = '';
  filteredBookings: BookingDto[] = [];
  content: BookingDto[] = [];
  msg: string|undefined;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.getAllBooking();
  }

  getAllBooking() {
    this.bookingService.getAllBookings({
      page: this.pageNumber,
      size: this.size
    }).subscribe({
      next: data => {
        this.pageResponseBookingDTO = data;
         this.pages = Array(this.pageResponseBookingDTO.totalPages)
        .fill(0)
        .map((x, i) => i);
        this.filteredBookings = [...this.pageResponseBookingDTO.content || []];
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleSearchChange(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.searchTerm) {
      this.filteredBookings = this.pageResponseBookingDTO.content?.filter(booking =>
        booking.bookingConfigurationCode?.toLowerCase().includes(this.searchTerm)
      ) || [];
    } else {
      this.filteredBookings = [...this.pageResponseBookingDTO.content || []];
    }
  }

  cancelBooking(bookingId: any): void {
    this.bookingService.cancelBooking({
      bookingId: bookingId
    }).subscribe({
      next:val=>{
        this.msg =" booking cancelled successfully"
        setTimeout(()=>{
          this.msg=undefined
          this.getAllBooking()
        }, 3000)
      }
    })
  }

  goToLastPage() {
    this.pageNumber = this.pageResponseBookingDTO.totalPages as number - 1;
    this.getAllBooking();
  }

  goToNextPage() {
    this.pageNumber++;
    this.getAllBooking();
  }

  goToPage(pageIndex: number) {
    this.pageNumber = pageIndex;
    this.getAllBooking();
  }

  goToPreviousPage() {
    this.pageNumber--;
    this.getAllBooking();
  }

  goToFirstPage() {
    this.pageNumber = 0;
    this.getAllBooking();
  }

  get isLastPage() {
    return this.pageNumber === (this.pageResponseBookingDTO.totalPages as number) - 1;
  }

}
