import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apartment, Bike, reservation, myreservation } from '../shared/models';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service'
import { DatePipe } from '@angular/common';
import { EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  // Define API
  //apiURL = 'http://localhost:5000';
  apiURL = 'https://webike-joree.herokuapp.com/';

  constructor(private auth: AuthService, private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.activeJWT()}`
    })
  }

  getApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(this.apiURL + '/apartments', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getApartment(id: number): Observable<Apartment> {
    return this.http.get<Bike>(this.apiURL + '/getApartment/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getBike(id: number): Observable<Bike> {
    return this.http.get<Bike>(this.apiURL + '/getBike/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getBikes(id: number, start: string, end: string): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.apiURL + '/apartments/' + id + '/' + start + '/' + end + '/bikes', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  addBikes(bike: Bike): any {
    return this.http.post(this.apiURL + '/addBikes', bike, this.httpOptions)
      .subscribe((res: any) => {
        if (res.success) {
          console.log(res);
        }
      });
  }

  deleteBike(id: number): any {
    return this.http.delete(this.apiURL + '/bikes/delete/' + id, this.httpOptions)
      .subscribe((res: any) => {
        if (res.success) {
          console.log(res);
        }
      });
  }

  deleteApartment(id: number): any {
    return this.http.delete(this.apiURL + '/apartments/delete/' + id, this.httpOptions)
      .subscribe((res: any) => {
        if (res.success) {
          console.log(res);
        }
      });
  }

  addApartment(apartment: Apartment): any {
    return this.http.post(this.apiURL + '/addApartment', apartment, this.httpOptions)
      .subscribe((res: any) => {
        if (res.success) {
          console.log(res);
        }
      });
  }

  bookBikes(reservation: reservation, emit: EventEmitter<any>): any {
    return this.http.post(this.apiURL + '/bookBikes', reservation, this.httpOptions)
      .subscribe((res: any) => {
        if (res.success) {
          console.log(res);
          emit.emit('Done!');
        }
      });
  }

  get_reservations(): Observable<myreservation[]> {
    return this.http.get<myreservation[]>(this.apiURL + '/myreservations', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}