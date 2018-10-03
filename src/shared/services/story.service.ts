import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Story} from "../models/story";

@Injectable()
export class StoryService {
  private controller = '/story';

  constructor(private _httpClient: HttpClient) {
  }

  findAll(): Observable<Story[]> {
    return this._httpClient.get<Story[]>(`${this.controller}/find-all`);
  }

  findAllAvailable(): Observable<Story[]> {
    return this._httpClient.get<Story[]>(`${this.controller}/find-all-available`);
  }

  findOne(id: number): Observable<Story> {
    return this._httpClient.get<Story>(`${this.controller}/find-one/${id}`);
  }

  save(obj: Story,form): Observable<Story> {
    let data = new FormData(form);
    data.append('storyJson',JSON.stringify(obj));
    return this._httpClient.post<Story>(`${this.controller}/save`, data,{headers:new HttpHeaders().append('enctype','enctype')});
  }

  update(obj: Story,form): Observable<Story> {
    let data = new FormData(form);
    data.append('storyJson',JSON.stringify(obj));
    return this._httpClient.post<Story>(`${this.controller}/update`, data,{headers:new HttpHeaders().append('enctype','enctype')});
  }

  delete(id: number): Observable<boolean> {
    return this._httpClient.get<boolean>(`${this.controller}/delete/${id}`);
  }
}
