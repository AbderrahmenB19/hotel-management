/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteUserById } from '../fn/users/delete-user-by-id';
import { DeleteUserById$Params } from '../fn/users/delete-user-by-id';
import { getAllUsers } from '../fn/users/get-all-users';
import { GetAllUsers$Params } from '../fn/users/get-all-users';
import { getMyInfo } from '../fn/users/get-my-info';
import { GetMyInfo$Params } from '../fn/users/get-my-info';
import { getUserBookingHistory } from '../fn/users/get-user-booking-history';
import { GetUserBookingHistory$Params } from '../fn/users/get-user-booking-history';
import { getUserById } from '../fn/users/get-user-by-id';
import { GetUserById$Params } from '../fn/users/get-user-by-id';
import { PageResponseBookingDto } from '../models/page-response-booking-dto';
import { PageResponseUserDto } from '../models/page-response-user-dto';
import { UserDto } from '../models/user-dto';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getUserBookingHistory()` */
  static readonly GetUserBookingHistoryPath = '/users/get-user-bookings/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserBookingHistory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserBookingHistory$Response(params: GetUserBookingHistory$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookingDto>> {
    return getUserBookingHistory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserBookingHistory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserBookingHistory(params: GetUserBookingHistory$Params, context?: HttpContext): Observable<PageResponseBookingDto> {
    return this.getUserBookingHistory$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBookingDto>): PageResponseBookingDto => r.body)
    );
  }

  /** Path part for operation `getMyInfo()` */
  static readonly GetMyInfoPath = '/users/get-logged-In-profile-info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyInfo$Response(params?: GetMyInfo$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return getMyInfo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyInfo(params?: GetMyInfo$Params, context?: HttpContext): Observable<UserDto> {
    return this.getMyInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/users/get-by-id/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: GetUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return getUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: GetUserById$Params, context?: HttpContext): Observable<UserDto> {
    return this.getUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/users/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: GetAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseUserDto>> {
    return getAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: GetAllUsers$Params, context?: HttpContext): Observable<PageResponseUserDto> {
    return this.getAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseUserDto>): PageResponseUserDto => r.body)
    );
  }

  /** Path part for operation `deleteUserById()` */
  static readonly DeleteUserByIdPath = '/users/delete-by-id/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserById$Response(params: DeleteUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserById(params: DeleteUserById$Params, context?: HttpContext): Observable<number> {
    return this.deleteUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
