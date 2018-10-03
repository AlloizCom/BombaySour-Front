import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Film} from "../models/film";

@Injectable()
export class FilmService {
  private controller = '/film';

  constructor(private _httpClient: HttpClient) {
  }

  findAll(): Observable<Film[]> {
    return this._httpClient.get<Film[]>(`${this.controller}/find-all`);
  }

  findAllAvailable(): Observable<Film[]> {
    return this._httpClient.get<Film[]>(`${this.controller}/find-all-available`);
  }

  findOne(id: number): Observable<Film> {
    return this._httpClient.get<Film>(`${this.controller}/find-one/${id}`);
  }

  save(obj: Film,form): Observable<Film> {
    let data = new FormData(form);
    data.append('filmJson',JSON.stringify(obj));
    return this._httpClient.post<Film>(`${this.controller}/save`, data,{headers:new HttpHeaders().append('enctype','enctype')});
  }

  update(obj: Film,form): Observable<Film> {
    let data = new FormData(form);
    data.append('filmJson',JSON.stringify(obj));
    return this._httpClient.post<Film>(`${this.controller}/update`, data,{headers:new HttpHeaders().append('enctype','enctype')});
  }

  delete(id: number): Observable<boolean> {
    return this._httpClient.get<boolean>(`${this.controller}/delete/${id}`);
  }
}
