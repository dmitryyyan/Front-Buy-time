import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private apiUrl = 'http://localhost:5258/api/booking';

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<any[]> {
    console.log('Fetching slot data from:', `${this.apiUrl}/get-all`);
    return this.http.get<any[]>(`${this.apiUrl}/get-all`);
  }

  getBookingById(id: string): Observable<any> {
    console.log(`Fetching time slots for id: ${id}`);
    return this.http.get<any>(`${this.apiUrl}/get-by-id?id=${id}`);
  }
}
