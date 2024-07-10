/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingDto } from '../../models/booking-dto';

export interface SaveBooking$Params {
  roomId: number;
  userId: number;
      body: BookingDto
}

export function saveBooking(http: HttpClient, rootUrl: string, params: SaveBooking$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, saveBooking.PATH, 'post');
  if (params) {
    rb.path('roomId', params.roomId, {});
    rb.path('userId', params.userId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

saveBooking.PATH = '/booking/book-room/{roomId}/{userId}';
