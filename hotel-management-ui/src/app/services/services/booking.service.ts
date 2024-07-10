/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { BookingDto } from '../models/booking-dto';
import { cancelBooking } from '../fn/booking/cancel-booking';
import { CancelBooking$Params } from '../fn/booking/cancel-booking';
import { findBookingByConfirmationCode } from '../fn/booking/find-booking-by-confirmation-code';
import { FindBookingByConfirmationCode$Params } from '../fn/booking/find-booking-by-confirmation-code';
import { getAllBookings } from '../fn/booking/get-all-bookings';
import { GetAllBookings$Params } from '../fn/booking/get-all-bookings';
import { PageResponseBookingDto } from '../models/page-response-booking-dto';
import { saveBooking } from '../fn/booking/save-booking';
import { SaveBooking$Params } from '../fn/booking/save-booking';

@Injectable({ providedIn: 'root' })
export class BookingService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveBooking()` */
  static readonly SaveBookingPath = '/booking/book-room/{roomId}/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveBooking()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveBooking$Response(params: SaveBooking$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return saveBooking(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveBooking$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveBooking(params: SaveBooking$Params, context?: HttpContext): Observable<string> {
    return this.saveBooking$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `findBookingByConfirmationCode()` */
  static readonly FindBookingByConfirmationCodePath = '/booking/get-by-confirmation-code/{confirmationCode}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findBookingByConfirmationCode()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBookingByConfirmationCode$Response(params: FindBookingByConfirmationCode$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingDto>> {
    return findBookingByConfirmationCode(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findBookingByConfirmationCode$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBookingByConfirmationCode(params: FindBookingByConfirmationCode$Params, context?: HttpContext): Observable<BookingDto> {
    return this.findBookingByConfirmationCode$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookingDto>): BookingDto => r.body)
    );
  }

  /** Path part for operation `getAllBookings()` */
  static readonly GetAllBookingsPath = '/booking/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBookings()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBookings$Response(params?: GetAllBookings$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookingDto>> {
    return getAllBookings(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBookings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBookings(params?: GetAllBookings$Params, context?: HttpContext): Observable<PageResponseBookingDto> {
    return this.getAllBookings$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBookingDto>): PageResponseBookingDto => r.body)
    );
  }

  /** Path part for operation `cancelBooking()` */
  static readonly CancelBookingPath = '/booking/cancel/{bookingId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cancelBooking()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelBooking$Response(params: CancelBooking$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return cancelBooking(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cancelBooking$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelBooking(params: CancelBooking$Params, context?: HttpContext): Observable<string> {
    return this.cancelBooking$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
