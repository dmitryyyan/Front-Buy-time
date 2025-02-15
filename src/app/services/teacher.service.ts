import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:5258/api/user'; // Змініть на ваш реальний URL
  private timeSlotApiUrl = 'http://localhost:5258/api/timeslot';
  private bokingSlotApiUrl = 'http://localhost:5258/api/booking';

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

  getTeacherById(id: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/get-all`).pipe(
      map(teachers => teachers.find(teacher => teacher.id === id))
    );
  }

  createTimeSlot(timeSlotData: any): Observable<any> {
    console.log('Creating time slot:', timeSlotData); // Log the data being sent
    return this.http.post<any>(`${this.timeSlotApiUrl}/create`, timeSlotData);
  }

  getTimeSlotsByTeacherId(teacherId: string): Observable<any[]> {
    console.log('Fetching time slots data from:', teacherId);
    return this.http.get<any[]>(`${this.timeSlotApiUrl}/get-all`).pipe(
      map(timeSlots => timeSlots.filter(timeSlot => timeSlot.userId === teacherId))
    );
  }

  getBookingsByTimeslotIds(timeslotIds: string[]): Observable<any[]> {
    console.log('Fetching bookings data for timeslot IDs:', timeslotIds);
    
    return this.http.get<any[]>(`${this.bokingSlotApiUrl}/get-all`).pipe(
      map(bookings => bookings.filter(booking => {
        const matches = timeslotIds.includes(booking.timeslotId);
        console.log(`booking.timeslotId in timeslotIds:`, matches); // Log the result
        return matches;
      }))
    );
  }

  updateTimeSlot(slot: any): Observable<any> {
    return this.http.put(`${this.timeSlotApiUrl}/${slot.id}`, slot);
  }
}
