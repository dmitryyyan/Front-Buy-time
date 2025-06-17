import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../react-ton-connect/teacher.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatCheckboxModule } from '@angular/material/checkbox'; // Import MatCheckboxModule
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-timeslot',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule // Ensure MatCardModule is included
  ],
  templateUrl: './createtimeslot.html',
  styleUrls: ['./createtimeslot.css']
})
export class AddTimeslotComponent implements OnInit {
  chatId: string | null = null;
  teacher: any;
  timeSlotData: any = {
    userId: '',
    startTime: '',
    endTime: '',
    isAvailable: false
  };
  selectedDate: string = '';
  timeIntervals: string[] = [];
  selectedIntervals: string[] = [];

  message: string = '';

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router // Inject HttpClient
  ) { }

  // Button methods
  button1Action() {
    this.router.navigate(['/teacher']);
  }

  button2Action() {
    this.router.navigate(['/add-timeslot']);
  }

  button3Action() {
    this.router.navigate(['/createbook']);
  }

  navigateToUserPage() {
    this.router.navigate(['/user-page']);
  }

  ngOnInit(): void {
    this.fetchChatId();
  }

  fetchChatId(): void {
    this.http.get<{ chatId: string }>('http://localhost:3000/api/getCurrentChatId').subscribe(
      (response) => {
        this.chatId = response.chatId;
        console.log('Chat ID:', this.chatId); // Log chatId to console
        this.fetchUserData();
      },
      (error) => {
        console.error('Error fetching chat ID', error);
      }
    );
  }

  fetchUserData(): void {
    if (!this.chatId) {
      console.error('Chat ID is not defined');
      return;
    }
    this.http.get<{ id: string }>(`http://localhost:5258/api/user/get-by-chat-id?chatId=${this.chatId}`).subscribe(
      (data) => {
        console.log('Fetched user data:', data); // Log the fetched data
        if (data && data.id) {
          this.timeSlotData.userId = data.id; // Set the userId
          console.log('User ID:', data.id); // Log the user ID
        } else {
          console.error('User ID is undefined');
        }
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  selectTimeSlot(startTime: string, endTime: string): void {
    this.timeIntervals = this.generateTimeIntervals(startTime, endTime);
  }

  generateTimeIntervals(startTime: string, endTime: string): string[] {
    const intervals: string[] = [];
    let start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    while (start < end) {
      const next = new Date(start.getTime() + 30 * 60000);
      intervals.push(`${this.formatTime(start)} - ${this.formatTime(next)}`);
      start = next;
    }

    return intervals;
  }

  formatTime(date: Date): string {
    return date.toTimeString().slice(0, 5);
  }

  toggleIntervalSelection(interval: string): void {
    const index = this.selectedIntervals.indexOf(interval);
    if (index > -1) {
      this.selectedIntervals.splice(index, 1);
    } else {
      this.selectedIntervals.push(interval);
    }
  }

  formatDateTime(date: string, time: string): string {
    const dateTime = new Date(`${date}T${time}:00`);
    dateTime.setHours(dateTime.getHours() + 2); // Adjust time by adding 2 hours
    return dateTime.toISOString();
  }

  onSubmit(): void {
    const timeSlots = this.selectedIntervals.map(interval => {
      const [start, end] = interval.split(' - ');
      return {
        userId: this.timeSlotData.userId,
        startTime: this.formatDateTime(this.selectedDate, start),
        endTime: this.formatDateTime(this.selectedDate, end),
        isAvailable: true
      };
    });

    let successCount = 0;
    let errorCount = 0;

    timeSlots.forEach(slot => {
      console.log('Creating time slot:', slot); // Log the data being sent
      this.teacherService.createTimeSlot(slot).subscribe(
        response => {
          console.log('Time slot created:', response);
          this.message = 'Successfully created time slot';
          successCount++;
         // if (successCount + errorCount === timeSlots.length) {
         //   this.showResultMessage(successCount, errorCount);
         // }
        },
        error => {
          console.error('Error creating time slot:', error);
          errorCount++;
          this.message = 'Error creating time slot';
          //if (successCount + errorCount === timeSlots.length) {
           // this.showResultMessage(successCount, errorCount);
         // }
        }
      );
    });
  }

  showResultMessage(successCount: number, errorCount: number): void {
    const message = `Successfully created ${successCount} time slots. ${errorCount} errors occurred.`;
    alert(message); // Use alert instead of MatSnackBar
  }
}
