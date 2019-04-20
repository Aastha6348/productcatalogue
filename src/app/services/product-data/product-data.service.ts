import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private http: HttpClient) { }

  /**
   * This service is used to fetch data from json stored in assets folder
   */
  public getJSON(jsonFile): Observable<any> {
    return this.http.get(`./assets/${jsonFile}.json`);
  }
}
