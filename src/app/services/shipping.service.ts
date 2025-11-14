import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { API_SHIPPING } from '../config/endpoints';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Shipping } from '../models/shipping.model';
import * as queryString from 'query-string';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private http: HttpClient) {
  }

  getAll(query: any) {
    const params = queryString.stringify(query);
    const uri = `${API_SHIPPING}?${params}`;
    return this.http.get(uri).pipe(
      catchError(this.handleError)
    );
  }

  // getAll(query: any) {
  //   let params: any = new HttpParams();
  //   console.log(query.pilotId)
  //   console.log(query.status)
  //   params = params.set('pilotId', query.pilotId);
  //   params = params.set('status', query.status);
  //   const uri = `${API_SHIPPING}`;
  //   return this.http.get(uri,{params: params}).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  getById(id: string) {
    const uri = `${API_SHIPPING}/${id}`;
    return this.http.get<Shipping>(uri).pipe(
      catchError(this.handleError)
    );
  }

  create(shipping: any) {
    const uri = `${API_SHIPPING}`;
    return this.http.post<Shipping>(uri, shipping).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, shipping: any) {
    const uri = `${API_SHIPPING}/${id}`;
    return this.http.put<any>(uri, shipping).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string) {
    const uri = `${API_SHIPPING}/${id}`;
    return this.http.delete<any>(uri).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Please try again later.');
  }
}
