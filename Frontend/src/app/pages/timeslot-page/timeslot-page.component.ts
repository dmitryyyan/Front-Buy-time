import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { TimeslotService } from '../../services/timeslot.service';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telegramChatId: string;
  isTeacher: boolean;
  teacherNickname: string;
  description: string;
  rating: number;
  tags: string;
  message?: string;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  userId: string;
}

@Component({
  standalone: true,
  selector: 'app-timeslot-page',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './timeslot-page.component.html',
  styleUrls: ['./timeslot-page.component.css']
})
export class TimeslotPageComponent implements OnInit {
  userData: UserData | null = null;
  timeSlots: TimeSlot[] = [];
  chatId: string | null = null;
  userForm: FormGroup;
  isSubmitting = false;

  constructor(
    private userDataService: UserDataService,
    private http: HttpClient,
    private timeslotService: TimeslotService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      isTeacher: [false, Validators.required]
    });

    this.userForm.get('isTeacher')?.valueChanges.subscribe((value) => {
      if (this.userData && value !== this.userData.isTeacher && !this.isSubmitting) {
        this.submitUser();
      }
    });
  }

  ngOnInit(): void {
    this.fetchChatId();
  }

  fetchChatId(): void {
    this.http.get<{ chatId: string }>('http://localhost:3000/api/getCurrentChatId').subscribe(
      (response) => {
        this.chatId = response.chatId;
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
    this.http.get<UserData>(`http://localhost:5258/api/user/get-by-chat-id?chatId=${this.chatId}`).subscribe(
      (data) => {
        if (data && !data.message) {
          this.userData = data;
          this.userForm.patchValue({ isTeacher: data.isTeacher }, { emitEvent: false });
          if (data.id) {
            this.fetchTimeSlotsByTeacherId(data.id);
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
        // Фільтруємо таймслоти по userId, тут краще порівнювати lowerCase тільки якщо id з бази завжди у нижньому регістрі!
        this.timeSlots = data.filter(slot => slot.userId.toLowerCase() === userId.toLowerCase());
      },
      (error) => {
        console.error('Error fetching time slots', error);
      }
    );
  }

  submitUser(): void {
    if (this.userForm.valid && this.userData) {
      this.isSubmitting = true;
      const userId = this.userData.id;
      const isTeacher = this.userForm.get('isTeacher')?.value;

      this.http.put(`http://localhost:5258/api/user/toggle-is-teacher?userId=${userId}`, { isTeacher }).subscribe(response => {
        this.fetchUserData();
        this.fetchTimeSlotsByTeacherId(userId);
        alert(`Ви тепер ${isTeacher ? 'викладач' : 'студент'}`);
        this.isSubmitting = false;
      }, error => {
        console.error('Error updating user isTeacher status', error);
        this.isSubmitting = false;
      });
    }
  }

  getLionEmojis(rating: number): string {
    return '🦁'.repeat(rating);
  }

  navigateToUserPage(): void {
    this.router.navigate(['/user-page']);
  }
  button1Action() {
    this.router.navigate(['/teacher']);
  }
  button2Action() {
    this.router.navigate(['/add-timeslot']);
  }
  button3Action() {
    this.router.navigate(['/createbook']);
  }
}
