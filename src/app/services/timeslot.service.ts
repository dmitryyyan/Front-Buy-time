import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeslotService {
  private apiUrl = 'http://localhost:5258/api/timeslot'; // Змініть на ваш реальний URL

  constructor(private http: HttpClient) { }

  getAllTimeSlots(): Observable<any[]> {
    console.log('Fetching slot data from:', `${this.apiUrl}/get-all`);
    return this.http.get<any[]>(`${this.apiUrl}/get-all`);
  }

  getTimeSlotsById(id: string): Observable<any> {
    console.log(`Fetching time slots for id: ${id}`);
    return this.http.get<any>(`${this.apiUrl}/get-by-id?id=${id}`);
  }

  getTimeSlotsByTeacherId(userId: string): Observable<any[]> {
    console.log(`Fetching time slots for teacher id: ${userId}`);
    return this.http.get<any[]>(`${this.apiUrl}/get-by-id?id=${userId}`);
  }


  createBook(timeSlotData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, timeSlotData);
  }
}
