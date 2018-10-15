import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable()
export class ImageService {

  constructor(private _httpClient: HttpClient) {
  }

  findOne(id: number, controller: Controllers): Observable<HttpResponse<string>> {
    return this._httpClient.get(`/${controller}/get-image/${id}`, {observe: 'response', responseType: 'text'});
  }
}

export type Controllers = 'community' | 'platform' | 'team' | 'film' | 'story';
