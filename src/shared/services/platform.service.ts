import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Platform} from "../models/platform";

@Injectable()
export class PlatformService {
  private controller = '/platform';

  constructor(private _httpClient: HttpClient) {
  }

  findAll(): Observable<Platform[]> {
    return this._httpClient.get<Platform[]>(`${this.controller}/find-all`);
  }

  findAllAvailable(): Observable<Platform[]> {
    return this._httpClient.get<Platform[]>(`${this.controller}/find-all-available`);
  }

  findOne(id: number): Observable<Platform> {
    return this._httpClient.get<Platform>(`${this.controller}/find-one/${id}`);
  }

  save(obj: Platform): Observable<Platform> {
    return this._httpClient.post<Platform>(`${this.controller}/save`, obj);
  }

  update(obj: Platform): Observable<Platform> {
    return this._httpClient.post<Platform>(`${this.controller}/update`, obj);
  }

  delete(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>(`${this.controller}/find-one/${id}`);
  }
}
