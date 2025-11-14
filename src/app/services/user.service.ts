import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_USER } from '../config/endpoints';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../models/user.model';
import * as queryString from 'query-string';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll(query: any) {
    const params = queryString.stringify(query);
    const uri = `${API_USER}?${params}`;
    return this.http.get(uri).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string) {
    const uri = `${API_USER}/${id}`;
    return this.http.get<User>(uri).pipe(
      catchError(this.handleError)
    );
  }

  getUserByNic(nic: string) {
    const uri = `${API_USER}/by_nic/${nic}`;
    return this.http.get<User>(uri).pipe(
      catchError(this.handleError)
    );
  }

  create(user: any) {
    const uri = `${API_USER}`;
    return this.http.post<User>(uri, user).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, user: any) {
    const uri = `${API_USER}/${id}`;
    return this.http.put<any>(uri, user).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string) {
    const uri = `${API_USER}/${id}`;
    return this.http.delete<any>(uri).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Please try again later.');
  }
}
