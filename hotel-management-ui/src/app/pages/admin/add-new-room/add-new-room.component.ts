import { Component, OnInit } from '@angular/core';
import { RoomDto } from '../../../services/models';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../services/services';

@Component({
  selector: 'app-add-new-room',
  templateUrl: './add-new-room.component.html',
  styleUrls: ['./add-new-room.component.css'] // corrected styleUrls
})
export class AddNewRoomComponent implements OnInit {
  roomRgister: RoomDto = {
    roomDescription: '',
    roomPrice: 0,
    roomType: '',
  };
  selectedRoomImage: any;
  selectedPicture: string | undefined;
  roomId: number | undefined;
  msg: string | undefined;

  constructor(private route: ActivatedRoute, private roomService: RoomService, private router: Router) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.params['roomId'];
    if (this.roomId) {
      this.roomService.getRoomById({ roomId: this.roomId }).subscribe({
        next: (val) => {
          this.roomRgister = {
            id: this.roomId,
            roomDescription: val.roomDescription,
            roomPrice: val.roomPrice,
            roomType: val.roomType,
            roomPhoto: val.roomPhoto, // Add this line to include the photo
          };
          this.selectedPicture = 'data:image/jpg;base64,' + this.roomRgister.roomPhoto;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  saveRoom() {
    this.roomService.addNewRoom({ body: this.roomRgister }).subscribe({
      next: (val) => {
        this.roomService.updateRoomPhoto({
          roomId: val,
          body: { file: this.selectedRoomImage }
        }).subscribe({
          next: (res) => {
            this.msg = 'Room saved successfully';
            setTimeout(() => {
              this.msg = undefined;
              this.router.navigate(['manage-rooms']);
            }, 2000); // 2000 milliseconds = 2 seconds
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onFileSelected(event: any) {
    this.selectedRoomImage = event.target.files[0];
    if (this.selectedRoomImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedRoomImage);
    }
  }
}
