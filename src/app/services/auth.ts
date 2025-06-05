import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface LoginDetails {
  userEmail: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5029/ApiCrud';

  constructor(private http: HttpClient) {}

  login(credentials: LoginDetails): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/Login`, credentials).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      message = `Client error: ${error.error.message}`;
    } else {
      message = `Server error (${error.status}): ${error.error?.message || error.message}`;
    }
    return throwError(() => new Error(message));
  }
}

