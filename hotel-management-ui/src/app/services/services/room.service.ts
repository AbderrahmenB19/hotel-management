/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addNewRoom } from '../fn/room/add-new-room';
import { AddNewRoom$Params } from '../fn/room/add-new-room';
import { deleteRoomById } from '../fn/room/delete-room-by-id';
import { DeleteRoomById$Params } from '../fn/room/delete-room-by-id';
import { getAllAvailableRoom } from '../fn/room/get-all-available-room';
import { GetAllAvailableRoom$Params } from '../fn/room/get-all-available-room';
import { getAllRooms } from '../fn/room/get-all-rooms';
import { GetAllRooms$Params } from '../fn/room/get-all-rooms';
import { getAllRoomsByDateAndType } from '../fn/room/get-all-rooms-by-date-and-type';
import { GetAllRoomsByDateAndType$Params } from '../fn/room/get-all-rooms-by-date-and-type';
import { getAllRoomType } from '../fn/room/get-all-room-type';
import { GetAllRoomType$Params } from '../fn/room/get-all-room-type';
import { getRoomById } from '../fn/room/get-room-by-id';
import { GetRoomById$Params } from '../fn/room/get-room-by-id';
import { PageResponseRoomDto } from '../models/page-response-room-dto';
import { RoomDto } from '../models/room-dto';
import { updateRoomPhoto } from '../fn/room/update-room-photo';
import { UpdateRoomPhoto$Params } from '../fn/room/update-room-photo';

@Injectable({ providedIn: 'root' })
export class RoomService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateRoomPhoto()` */
  static readonly UpdateRoomPhotoPath = '/rooms/updateRoomPhoto/{roomId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRoomPhoto()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateRoomPhoto$Response(params: UpdateRoomPhoto$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateRoomPhoto(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateRoomPhoto$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateRoomPhoto(params: UpdateRoomPhoto$Params, context?: HttpContext): Observable<{
}> {
    return this.updateRoomPhoto$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `addNewRoom()` */
  static readonly AddNewRoomPath = '/rooms/addNewRoom';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addNewRoom()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNewRoom$Response(params: AddNewRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return addNewRoom(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addNewRoom$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNewRoom(params: AddNewRoom$Params, context?: HttpContext): Observable<number> {
    return this.addNewRoom$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getRoomById()` */
  static readonly GetRoomByIdPath = '/rooms/room-by-id/{roomId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRoomById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRoomById$Response(params: GetRoomById$Params, context?: HttpContext): Observable<StrictHttpResponse<RoomDto>> {
    return getRoomById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRoomById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRoomById(params: GetRoomById$Params, context?: HttpContext): Observable<RoomDto> {
    return this.getRoomById$Response(params, context).pipe(
      map((r: StrictHttpResponse<RoomDto>): RoomDto => r.body)
    );
  }

  /** Path part for operation `getAllRoomsByDateAndType()` */
  static readonly GetAllRoomsByDateAndTypePath = '/rooms/available-rooms-by-date-and-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRoomsByDateAndType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRoomsByDateAndType$Response(params?: GetAllRoomsByDateAndType$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRoomDto>> {
    return getAllRoomsByDateAndType(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllRoomsByDateAndType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRoomsByDateAndType(params?: GetAllRoomsByDateAndType$Params, context?: HttpContext): Observable<PageResponseRoomDto> {
    return this.getAllRoomsByDateAndType$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseRoomDto>): PageResponseRoomDto => r.body)
    );
  }

  /** Path part for operation `getAllRooms()` */
  static readonly GetAllRoomsPath = '/rooms/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRooms()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRooms$Response(params?: GetAllRooms$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRoomDto>> {
    return getAllRooms(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllRooms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRooms(params?: GetAllRooms$Params, context?: HttpContext): Observable<PageResponseRoomDto> {
    return this.getAllRooms$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseRoomDto>): PageResponseRoomDto => r.body)
    );
  }

  /** Path part for operation `getAllAvailableRoom()` */
  static readonly GetAllAvailableRoomPath = '/rooms/all-available-rooms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAvailableRoom()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAvailableRoom$Response(params?: GetAllAvailableRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRoomDto>> {
    return getAllAvailableRoom(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAvailableRoom$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAvailableRoom(params?: GetAllAvailableRoom$Params, context?: HttpContext): Observable<PageResponseRoomDto> {
    return this.getAllAvailableRoom$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseRoomDto>): PageResponseRoomDto => r.body)
    );
  }

  /** Path part for operation `getAllRoomType()` */
  static readonly GetAllRoomTypePath = '/rooms/Types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRoomType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRoomType$Response(params?: GetAllRoomType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return getAllRoomType(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllRoomType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRoomType(params?: GetAllRoomType$Params, context?: HttpContext): Observable<Array<string>> {
    return this.getAllRoomType$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

  /** Path part for operation `deleteRoomById()` */
  static readonly DeleteRoomByIdPath = '/rooms/deleteRoom/{roomId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRoomById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRoomById$Response(params: DeleteRoomById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteRoomById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteRoomById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRoomById(params: DeleteRoomById$Params, context?: HttpContext): Observable<number> {
    return this.deleteRoomById$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
