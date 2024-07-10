/* tslint:disable */
/* eslint-disable */
import { BookingDto } from '../models/booking-dto';
export interface PageResponseBookingDto {
  content?: Array<BookingDto>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
