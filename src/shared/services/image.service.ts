import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable()
export class ImageService {

  videoCache: { name: string, val: any }[] = [];

  constructor(private _httpClient: HttpClient) {
  }

  findOne(id: number, controller: Controllers): Observable<HttpResponse<string>> {
    return this._httpClient.get(`/${controller}/get-image/${id}`, {observe: 'response', responseType: 'text'});
  }

  loadVideo(url: string, params?: { [p: string]: any }): Observable<Blob> {
    let found = this.videoCache.find(value => value.name == url);
    if (found) {
      let sub = new Subject<Blob>();
      setTimeout(() => sub.next(found.val), 100);
      console.log('from cahce');
      return sub.asObservable();
    }
    let obs = this.loadVideoS(url, params);
    obs.subscribe(value => this.videoCache.push({name: url, val: value}));
    return obs;
  }

  loadVideoS(url: string, params?: { [p: string]: any }): Observable<Blob> {
    return this._httpClient.get(url, {responseType: 'blob', params: params});
  }

}

export type Controllers = 'community' | 'platform' | 'team';
