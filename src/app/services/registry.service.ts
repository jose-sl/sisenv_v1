import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_REGISTRY } from '../config/endpoints';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Registry } from '../models/registry.model';
import * as queryString from 'query-string';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    const uri = `${API_REGISTRY}`;
    return this.http.get(uri).pipe(
      catchError(this.handleError)
    );
  }

  create(registry: any) {
    const uri = `${API_REGISTRY}`;
    return this.http.post<Registry>(uri, registry).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Please try again later.');
  }
}
