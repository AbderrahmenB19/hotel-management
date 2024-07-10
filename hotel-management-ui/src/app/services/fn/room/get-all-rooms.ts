/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseRoomDto } from '../../models/page-response-room-dto';

export interface GetAllRooms$Params {
  page?: number;
  size?: number;
}

export function getAllRooms(http: HttpClient, rootUrl: string, params?: GetAllRooms$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRoomDto>> {
  const rb = new RequestBuilder(rootUrl, getAllRooms.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
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

getAllRooms.PATH = '/rooms/all';
