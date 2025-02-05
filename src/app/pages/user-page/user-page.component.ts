import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Для здійснення HTTP запитів
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserDataService } from './user-data.service';
import { TimeslotService } from '../../services/timeslot.service';

interface UserData {
  Id: string; // Ensure the Id property is included
  FirstName: string;
  LastName: string;
  Role: string;
  Email: string;
  Description: string;
  Tags: string;
  message?: string;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  TeacherId: string; // Ensure the TeacherId property is included
}

@Component({
  selector: 'app-user-page',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userData: UserData | null = null;
  timeSlots: TimeSlot[] = [];
  test = '';
  constructor(
    private userDataService: UserDataService,
    private http: HttpClient,
    private timeslotService: TimeslotService
  ) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.http.get<UserData>('http://localhost:3000/api/getCurrentUserData').subscribe(
      (data) => {
        console.log('Fetched user data:', data); // Log the fetched data
        if (data && !data.message) {
          this.userData = data; // Зберігаємо отримані дані користувача
          console.log('User Data:', data); // Log the entire user data
          if (data.Id) {
            console.log('User ID:', data.Id); // Log the user ID
            this.fetchTimeSlotsByTeacherId(data.Id); // Викликати метод тут з потрібним userId
          } else {
            console.error('User ID is undefined');
          }
        } else {
          console.log('No user data available');
        }
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  fetchTimeSlotsByTeacherId(userId: string): void {
    this.timeslotService.getAllTimeSlots().subscribe(
      (data) => {
        console.log('Fetched all time slots:', data); // Log all fetched data
        console.log(userId); // Log the user ID
        for (let slot of data) {
          console.log('Teacher ID:', slot.teacherId); // Log the TeacherId of each time slot
          if (slot.teacherId.toLowerCase() === userId.toLowerCase()) {
            console.log('Matching time slot row:', slot.id); // Log the entire row if there is a match
            this.timeSlots.push(slot); // Зберегти відповідні таймслоти
          }
        }
      },
      (error) => {
        console.error('Error fetching time slots', error);
      }
    );
  }
}
