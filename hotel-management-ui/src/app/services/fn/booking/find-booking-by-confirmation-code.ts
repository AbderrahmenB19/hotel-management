/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingDto } from '../../models/booking-dto';

export interface FindBookingByConfirmationCode$Params {
  confirmationCode: string;
}

export function findBookingByConfirmationCode(http: HttpClient, rootUrl: string, params: FindBookingByConfirmationCode$Params, context?: HttpContext): Observable<StrictHttpResponse<BookingDto>> {
  const rb = new RequestBuilder(rootUrl, findBookingByConfirmationCode.PATH, 'get');
  if (params) {
    rb.path('confirmationCode', params.confirmationCode, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookingDto>;
    })
  );
}

findBookingByConfirmationCode.PATH = '/booking/get-by-confirmation-code/{confirmationCode}';
