import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Assuming you have an AuthService to get the current user

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

  constructor(private route: ActivatedRoute, private teacherService: TeacherService, @Inject(AuthService) private authService: AuthService) { }

  ngOnInit(): void {
    const teacherId = this.route.snapshot.paramMap.get('id');
    this.teacherService.getTeacherById(teacherId).subscribe(
      (data) => {
        console.log('Fetched teacher details:', data); // Log the fetched data
        this.teacher = data;
      },
      (error) => {
        console.error('Error fetching teacher details', error);
      }
    );

    this.teacherService.getTimeSlotsByTeacherId(teacherId).subscribe(
      (data) => {
        console.log('Fetched time slots:', data); // Log the fetched data
        this.timeSlots = data;
      },
      (error) => {
        console.error('Error fetching time slots', error);
      }
    );

    this.teacherService.getBookingsByTeacherId(teacherId).subscribe(
      (data) => {
        console.log('Fetched bookings:', data); // Log the fetched data
        this.bookings = data;
      },
      (error) => {
        console.error('Error fetching bookings', error);
      }
    );
  }

  bookTimeSlot(slot: any) {
    const currentUser = this.authService.getCurrentUser();
    slot.isAvailable = false;
    slot.userId1 = currentUser.id;
    this.teacherService.updateTimeSlot(slot).subscribe(
      (response) => {
        console.log('Time slot updated successfully', response);
      },
      (error) => {
        console.error('Error updating time slot', error);
      }
    );
  }
}
