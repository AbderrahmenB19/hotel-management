/* tslint:disable */
/* eslint-disable */
import { UserDto } from '../models/user-dto';
export interface PageResponseUserDto {
  content?: Array<UserDto>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
