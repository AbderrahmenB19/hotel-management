/* tslint:disable */

import { BookingDto } from "./booking-dto";

/* eslint-disable */
export interface RoomDto {
  id?: number;
  roomDescription: string;
  roomPhoto?: Array<string>;
  roomPrice: number;
  roomType: string;
  bookings?:Array<BookingDto>
}
