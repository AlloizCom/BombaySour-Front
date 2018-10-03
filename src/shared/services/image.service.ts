import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class ImageService {

  constructor(private _httpClient: HttpClient) {
  }

  findOne(id: number, controller: Controllers): Observable<string> {
    return this._httpClient.get(`/${controller}/get-image/${id}`, {responseType: "text"});
  }

}

export type Controllers = 'community'|'platform'|'team';
