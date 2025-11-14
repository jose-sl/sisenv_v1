import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_TRANSPORT } from '../config/endpoints';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Transport } from '../models/transport.model';
import * as queryString from 'query-string';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    const uri = `${API_TRANSPORT}`;
    return this.http.get(uri).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string) {
    const uri = `${API_TRANSPORT}/${id}`;
    return this.http.get<Transport>(uri).pipe(
      catchError(this.handleError)
    );
  }

  create(transport: any) {
    const uri = `${API_TRANSPORT}`;
    return this.http.post<Transport>(uri, transport).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, transport: any) {
    const uri = `${API_TRANSPORT}/${id}`;
    return this.http.put<any>(uri, transport).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string) {
    const uri = `${API_TRANSPORT}/${id}`;
    return this.http.delete<any>(uri).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Please try again later.');
  }
}
