import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:5258/api/user'; // Змініть на ваш реальний URL
  private timeSlotApiUrl = 'http://localhost:5258/api/timeslot';
  private bokingSlotApiUrl = 'http://localhost:5258/api/booking';

  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-all`).pipe(
      catchError(error => {
        console.error('Error fetching teachers data', error);
        return throwError(error);
      })
    );
  }
  createUserIfNotExists(chatId: string): Promise<any> {
    return this.http.post('http://localhost:5258/api/user/create-if-not-exists', { chatId }).toPromise();
  }
  getTeachersByName(firstName: string, lastName: string): Observable<any[]> {
    const url = `${this.apiUrl}/get-by-first-and-last-name?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;
    return this.http.get<any[]>(url);
  }

  getTeacherById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-by-id?id=${id}`).pipe(
      map(teacher => {
        if (!teacher) {
          console.error('Teacher not found with id:', id);
          return null;
        }
        return teacher;
      }),
      catchError(error => {
        console.error('Error fetching teacher data', error);
        return throwError(error);
      })
    );
  }

  createTimeSlot(timeSlotData: any): Observable<any> {
    return this.http.post<any>(`${this.timeSlotApiUrl}/create`, timeSlotData).pipe(
      catchError(error => {
        console.error('Error creating time slot', error);
        return throwError(error);
      })
    );
  }

  getTimeSlotsByTeacherId(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.timeSlotApiUrl}/get-all`).pipe(
      map(timeSlots => timeSlots.filter(timeSlot => timeSlot.userId === teacherId))
    );
  }

  getBookingsByTimeslotIds(timeslotIds: string[]): Observable<any[]> {
    return this.http.get<any[]>(`${this.bokingSlotApiUrl}/get-all`).pipe(
      map(bookings => bookings.filter(booking => timeslotIds.includes(booking.timeslotId)))
    );
  }

  updateTimeSlot(slot: any): Observable<any> {
    return this.http.put(`${this.timeSlotApiUrl}/${slot.id}`, slot);
  }

  getTeacherWalletAddress(teacherId: string): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}/get-wallet-address?id=${teacherId}`).pipe(
      map(response => response?.walletAddress ?? ''),
      catchError(error => {
        console.error('Error fetching teacher wallet address', error);
        if (error.status === 404) {
          return throwError('Teacher wallet not found');
        }
        return throwError(error);
      })
    );
  }
  
  
  getTeacherWalletAddressByChatId(chatId: string): Observable<string> {
    return this.http.get<any>(`http://localhost:5258/api/wallet/get-wallet-address-by-chat-id?chatId=${chatId}`).pipe(
      map(response => response?.walletAddress ?? ''),
      catchError(error => {
        console.error('Error fetching teacher wallet address by chatId', error);
        return throwError(error);
      })
    );
  }
  saveWalletAddressByChatId(chatId: string, walletAddress: string): Observable<any> {
    return this.http.post<any>(
      'http://localhost:5258/api/wallet/set-wallet-address-by-chat-id',
      { chatId, walletAddress }
    );
  }
}
