import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:5258/api/teacher'; // Змініть на ваш реальний URL
  private timeSlotApiUrl = 'http://localhost:5258/api/timeslot';

  constructor(private http: HttpClient) { }

  getAllTeachers(): Observable<any[]> {
    console.log('Fetching teachers data from:', `${this.apiUrl}/get-all`);
    return this.http.get<any[]>(`${this.apiUrl}/get-all`);
  }

  getTeachersByName(firstName: string, lastName: string): Observable<any[]> {
    const url = `${this.apiUrl}/get-by-first-and-last-name?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;
    console.log('Fetching teachers data from:', url);
    return this.http.get<any[]>(url);
  }

  createTimeSlot(timeSlotData: any): Observable<any> {
    return this.http.post<any>(`${this.timeSlotApiUrl}/create`, timeSlotData);
  }
}
