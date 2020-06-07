import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addUser(user: any): Observable<any> {
    return this.http.post<any>('https://441f71fb2118.ngrok.io/api/create-user', user, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('Added User'))
      );
  }

  getUser(id): Observable<any[]> {
    return this.http.get<any[]>('https://441f71fb2118.ngrok.io/api/get-user/' + id)
      .pipe(
        tap(_ => console.log(`user fetched: ${id}`)),
        catchError(this.handleError<any[]>(`Get user id=${id}`))
      );
  }

  getUserList(): Observable<any[]> {
    return this.http.get<any[]>('https://441f71fb2118.ngrok.io/api')
      .pipe(
        tap(songs => console.log('users fetched!')),
        catchError(this.handleError<any[]>('Get users', []))
      );
  }

  updateUser(id, user: any): Observable<any> {
    return this.http.put('https://441f71fb2118.ngrok.io/api/update-user/' + id, user, this.httpOptions)
      .pipe(
        tap(_ => console.log(`user updated: ${id}`)),
        catchError(this.handleError<any[]>('Update user'))
      );
  }

  deleteUser(id): Observable<any[]> {
    return this.http.delete<any[]>('https://441f71fb2118.ngrok.io/api/delete-user/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`user deleted: ${id}`)),
        catchError(this.handleError<any[]>('Delete user'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
