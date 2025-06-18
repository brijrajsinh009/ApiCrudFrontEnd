import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { ApiResponse,BookViewModel } from '../models/model';

@Injectable({
  providedIn: 'root'
})

export class Book {

  private messageSubject = new Subject<any>();

  public message$ = this.messageSubject.asObservable();

  sendMessage(message: any): void {
    this.messageSubject.next(message);
  }

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<BookViewModel[]> {
    return this.http.get<ApiResponse<BookViewModel[]>>(`${this.apiUrl}/Books`)
      .pipe(
        map(response => response.data)
      );
  }

  deleteBook(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/DeleteBook?id=${id}`);
  }

  addBook(newBook: FormData): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${this.apiUrl}/AddBook`, newBook);
  }

  getBookById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Book?id=${id}`);
  }

  updateBook(newBook: BookViewModel): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${this.apiUrl}/UpdateBook`, newBook);
  }
}
