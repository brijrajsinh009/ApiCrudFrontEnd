import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginDetails, ApiResponse, UserRegistration } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  login(credentials: LoginDetails): Observable<ApiResponse<any | null>> {
    const headers = new HttpHeaders({
      'skip': 'true'
    });
    return this.http.post<ApiResponse<any | null>>(`${this.apiUrl}/Login`, credentials, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  registration(userDetails: UserRegistration): Observable<ApiResponse<any | null>> {
    const headers = new HttpHeaders({
      'skip': 'true'
    });
    return this.http.post<ApiResponse<any | null>>(`${this.apiUrl}/Register`, userDetails, { headers }).pipe(
      map(response => response)
    );
  }

  getToken(refreshToken: string) {
    return this.http.post<ApiResponse<any | null>>(
      `${this.apiUrl}/Tokens`,
      JSON.stringify(refreshToken),
      { headers: { 'Content-Type': 'application/json', 'skip': 'true' } }
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      message = `Client error: ${error.error.message}`;
    } else {
      message = `Server error : ${error.error?.message || error.message}`;
    }
    return throwError(() => new Error(message));
  }
}

