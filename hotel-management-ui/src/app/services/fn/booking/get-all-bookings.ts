/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseBookingDto } from '../../models/page-response-booking-dto';

export interface GetAllBookings$Params {
  page?: number;
  size?: number;
}

export function getAllBookings(http: HttpClient, rootUrl: string, params?: GetAllBookings$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookingDto>> {
  const rb = new RequestBuilder(rootUrl, getAllBookings.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
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

getAllBookings.PATH = '/booking/all';
