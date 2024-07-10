/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RoomDto } from '../../models/room-dto';

export interface GetRoomById$Params {
  roomId: number;
}

export function getRoomById(http: HttpClient, rootUrl: string, params: GetRoomById$Params, context?: HttpContext): Observable<StrictHttpResponse<RoomDto>> {
  const rb = new RequestBuilder(rootUrl, getRoomById.PATH, 'get');
  if (params) {
    rb.path('roomId', params.roomId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RoomDto>;
    })
  );
}

getRoomById.PATH = '/rooms/room-by-id/{roomId}';
