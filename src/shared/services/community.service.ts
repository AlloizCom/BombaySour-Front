import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Community} from "../models/community";

@Injectable()
export class CommunityService {
  private controller = '/community';

  constructor(private _httpClient: HttpClient) {
  }

  findAll(): Observable<Community[]> {
    return this._httpClient.get<Community[]>(`${this.controller}/find-all`);
  }

  findAllAvailable(): Observable<Community[]> {
    return this._httpClient.get<Community[]>(`${this.controller}/find-all-available`);
  }

  findOne(id: number): Observable<Community> {
    return this._httpClient.get<Community>(`${this.controller}/find-one/${id}`);
  }

  save(obj: Community): Observable<Community> {
    return this._httpClient.post<Community>(`${this.controller}/save`, obj);
  }

  update(obj: Community): Observable<Community> {
    return this._httpClient.post<Community>(`${this.controller}/update`, obj);
  }

  delete(id: number): Observable<boolean> {
    return this._httpClient.get<boolean>(`${this.controller}/find-one/${id}`);
  }
}
