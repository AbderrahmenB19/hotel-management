/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseRoomDto } from '../../models/page-response-room-dto';

export interface GetAllRoomsByDateAndType$Params {
  page?: number;
  size?: number;
  checkInDate?: string;
  checkOutDate?: string;
  roomType?: string;
}

export function getAllRoomsByDateAndType(http: HttpClient, rootUrl: string, params?: GetAllRoomsByDateAndType$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRoomDto>> {
  const rb = new RequestBuilder(rootUrl, getAllRoomsByDateAndType.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('checkInDate', params.checkInDate, {});
    rb.query('checkOutDate', params.checkOutDate, {});
    rb.query('roomType', params.roomType, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseRoomDto>;
    })
  );
}

getAllRoomsByDateAndType.PATH = '/rooms/available-rooms-by-date-and-type';
