/* tslint:disable */
/* eslint-disable */
import { RoomDto } from '../models/room-dto';
export interface PageResponseRoomDto {
  content?: Array<RoomDto>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
