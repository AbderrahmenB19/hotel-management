/* tslint:disable */
/* eslint-disable */
import { RoomDto } from '../models/room-dto';
import { UserDto } from '../models/user-dto';
export interface BookingDto {
  bookingConfigurationCode?: string;
  checkInDate?: string;
  checkOutDate?: string;
  id?: number;
  numOfAdults?: number;
  numOfChildren?: number;
  room?: RoomDto;
  totalNumOfGuest?: number;
  user?: UserDto;
}
