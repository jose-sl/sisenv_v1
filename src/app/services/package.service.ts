import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_PACKAGE } from '../config/endpoints';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Package } from '../models/package.model';
import * as queryString from 'query-string';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) {
  }

  getAll(query: any) {
    const params = queryString.stringify(query);
    const uri = `${API_PACKAGE}?${params}`;
    return this.http.get(uri).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string) {
    const uri = `${API_PACKAGE}/${id}`;
    return this.http.get<Package>(uri).pipe(
      catchError(this.handleError)
    );
  }

  create(packages: any) {
    const uri = `${API_PACKAGE}`;
    return this.http.post<Package>(uri, packages).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, packages: any) {
    const uri = `${API_PACKAGE}/${id}`;
    return this.http.put<any>(uri, packages).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string) {
    const uri = `${API_PACKAGE}/${id}`;
    return this.http.delete<any>(uri).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Please try again later.');
  }
}
