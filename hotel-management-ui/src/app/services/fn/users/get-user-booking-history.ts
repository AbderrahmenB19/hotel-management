/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseBookingDto } from '../../models/page-response-booking-dto';

export interface GetUserBookingHistory$Params {
  page?: number;
  size?: number;
  userId: number;
}

export function getUserBookingHistory(http: HttpClient, rootUrl: string, params: GetUserBookingHistory$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookingDto>> {
  const rb = new RequestBuilder(rootUrl, getUserBookingHistory.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.path('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseBookingDto>;
    })
  );
}

getUserBookingHistory.PATH = '/users/get-user-bookings/{userId}';
