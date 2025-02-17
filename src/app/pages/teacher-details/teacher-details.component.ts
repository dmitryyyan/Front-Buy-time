import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {
  teacher: any;
  timeSlots: any[] = [];
  bookings: any[] = [];
  userId: string = ''; // Add userId property
  message: string = ''; // Add message property

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private http: HttpClient // Inject HttpClient
  ) { }

  ngOnInit(): void {
    const teacherId = this.route.snapshot.paramMap.get('id');
    this.teacherService.getTeacherById(teacherId).subscribe(
      (data) => {
        console.log('Fetched teacher details:', data);
        this.teacher = data;
      },
      (error) => {
        console.error('Error fetching teacher details', error);
      }
    );

    this.teacherService.getTimeSlotsByTeacherId(teacherId).subscribe(
      (data) => {
        console.log('Fetched time slots:', data);
        this.timeSlots = data;
        console.log('timeslots:', this.timeSlots);
        
        const timeslotIds = this.timeSlots.map(slot => {
          console.log('slot.id:', slot.id);
          return slot.id;
        });
        console.log('timeslotIds:', timeslotIds);
        this.teacherService.getBookingsByTimeslotIds(timeslotIds).subscribe(
          (data) => {
            this.bookings = data.filter(booking => timeslotIds.includes(booking.timeslotId));
            console.log('Fetched bookings:', this.bookings);
            this.compareUserIdWithAllUsers(); // Fetch user details for bookings
          },
          (error) => {
            console.error('Error fetching bookings', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching time slots', error);
      }
    );

    this.fetchChatId(); // Fetch user ID on initialization
  }

  fetchChatId(): void {
    this.http.get<{ chatId: string }>('http://localhost:3000/api/getCurrentChatId').subscribe(
      (response) => {
        const chatId = response.chatId;
        console.log('Chat ID:', chatId);
        this.fetchUserData(chatId);
      },
      (error) => {
        console.error('Error fetching chat ID', error);
      }
    );
  }

  fetchUserData(chatId: string): void {
    this.http.get<any>(`http://localhost:5258/api/user/get-by-chat-id?chatId=${chatId}`).subscribe(
      (data) => {
        console.log('Fetched user data:', data);
        if (data && !data.message) {
          this.userId = data.id;
          console.log('User ID:', this.userId);
        } else {
          console.log('No user data available');
        }
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  compareUserIdWithAllUsers(): void {
    this.http.get<any[]>('http://localhost:5258/api/user/get-all').subscribe(
      (users) => {
        this.bookings.forEach(booking => {
          const matchingUser = users.find(user => user.id === booking.userId);
          if (matchingUser) {
            booking.user = matchingUser;
          }
        });
        console.log('Bookings with user details:', this.bookings);
      },
      (error) => {
        console.error('Error fetching all users', error);
      }
    );
  }

  bookTimeSlot(slot: any) {
    if (this.userId) {
      const bookingData = {
        userId: this.userId,
        timeslotId: slot.id,
        status: 'booked',
        message: ''
      };

      console.log('Booking data:', bookingData);

      this.http.post('http://localhost:5258/api/booking/create', bookingData).subscribe(response => {
        console.log('Booking successful', response);
        this.message = 'Букінг успішно відправлений!';
        slot.isAvailable = false; // Update slot availability
      }, error => {
        console.error('Booking failed', error);
        this.message = 'Помилка при відправленні букінгу.';
      });
    } else {
      console.error('User ID is not available');
      this.message = 'Помилка: User ID is not available.';
    }
  }

  navigateToTeacherList() {
    this.router.navigate(['/teacher']);
  }
}
