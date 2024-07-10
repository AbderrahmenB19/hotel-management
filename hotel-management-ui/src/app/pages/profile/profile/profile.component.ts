// profile-page.component.ts
import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserDto, BookingDto } from '../../../services/models';
import { UsersService } from '../../../services/services';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserDto = {};
 
  displayedColumns: string[] = ['bookingCode', 'checkInDate', 'checkOutDate', 'totalGuests', 'roomType', 'roomPhoto'];
  dataSource: MatTableDataSource<BookingDto> = new MatTableDataSource<BookingDto>();
  modal: any;

  constructor(private userService: UsersService, private dialog: MatDialog , private tokenSerivce:TokenService) {}

  ngOnInit(): void {
    this.getMyInfo();
  }

  getMyInfo() {
    this.userService.getMyInfo({}).subscribe({
      next: (data: UserDto) => {
        this.user = data;
        this.dataSource.data = data.bookings || []; 
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleLogout() {
    this.tokenSerivce.logout()
    window.location.reload()
    
  }

  handleDeleteProfile() {
    
  }

  openImageModal(imageUrl: string) {
    this.dialog.open(ImageModalComponent, {
      data: imageUrl,
      height: '400px',
      width: '600px',
    });
  }
}
