import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginDetails, ApiResponse } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  login(credentials: LoginDetails): Observable<ApiResponse<any | null>> {
    return this.http.post<ApiResponse<any | null>>(`${this.apiUrl}/Login`, credentials).pipe(
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

