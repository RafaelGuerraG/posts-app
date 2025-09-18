import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../enviroments/enviroment';
import { Post, NewPost } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  getPosts(limit = 10): Observable<Post[]> {
    const params = new HttpParams().set('_limit', String(limit));
    return this.http.get<Post[]>(`${this.baseUrl}/posts`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createPost(payload: NewPost): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, payload).pipe(
      catchError(this.handleError)
    );
  }

  updatePost(id: number, payload: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${id}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  deletePost(id: number): Observable<void> {
    // La API responde {} – lo tipamos como void para la app
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    const msg = error.error?.message || error.message || 'HTTP error';
    return throwError(() => new Error(msg));
  }
}
