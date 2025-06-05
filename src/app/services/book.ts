import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BookViewModel {
  id: number;
  name: string;
  author: string;
  price: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})

export class Book {

  private apiUrl = 'http://localhost:5029/ApiCrud';

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

  addBook(newBook: BookViewModel): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${this.apiUrl}/AddBook`, newBook);
  }

  getBookById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Book?id=${id}`); 
  }

  updateBook(newBook: BookViewModel): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${this.apiUrl}/UpdateBook`, newBook);
  }
}
