import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../models/team";

@Injectable()
export class TeamService {
  private controller = '/team';

  constructor(private _httpClient: HttpClient) {
  }

  findAll(): Observable<Team[]> {
    return this._httpClient.get<Team[]>(`${this.controller}/find-all`);
  }

  findAllAvailable(): Observable<Team[]> {
    return this._httpClient.get<Team[]>(`${this.controller}/find-all-available`);
  }

  findOne(id: number): Observable<Team> {
    return this._httpClient.get<Team>(`${this.controller}/find-one/${id}`);
  }

  save(obj: Team): Observable<Team> {
    return this._httpClient.post<Team>(`${this.controller}/save`, obj);
  }

  update(obj: Team): Observable<Team> {
    return this._httpClient.post<Team>(`${this.controller}/update`, obj);
  }

  delete(id: number): Observable<boolean> {
    return this._httpClient.get<boolean>(`${this.controller}/find-one/${id}`);
  }
}
