/* tslint:disable */
/* eslint-disable */
import { BookingDto } from '../models/booking-dto';
import { Role } from '../models/role';
export interface UserDto {
  bookings?: Array<BookingDto>;
  email?: string;
  id?: number;
  name?: string;
  phoneNumber?: string;
  role?: Array<Role>;
}
