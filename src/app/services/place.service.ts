import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_PLACE } from '../config/endpoints';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Place } from '../models/place.model';
import * as queryString from 'query-string';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    const uri = `${API_PLACE}`;
    return this.http.get(uri).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string) {
    const uri = `${API_PLACE}/${id}`;
    return this.http.get<Place>(uri).pipe(
      catchError(this.handleError)
    );
  }

  create(place: any) {
    const uri = `${API_PLACE}`;
    return this.http.post<Place>(uri, place).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, place: any) {
    const uri = `${API_PLACE}/${id}`;
    return this.http.put<any>(uri, place).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string) {
    const uri = `${API_PLACE}/${id}`;
    return this.http.delete<any>(uri).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Please try again later.');
  }
}
