import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class ImageService {

  constructor(private _httpClient: HttpClient) {
  }

  findOne(id: number, controller: Controllers): Observable<HttpResponse<string>> {
    return this._httpClient.get(`/${controller}/get-image/${id}`, {observe: 'response', responseType: 'text'});
  }

  loadVideo(url: string,params?:{[p:string]:any}): Observable<Blob> {
    return this._httpClient.get(url, {responseType: 'blob',params:params});
  }

}

export type Controllers = 'community' | 'platform' | 'team';
