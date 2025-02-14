import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    @Inject(AuthService) private authService: AuthService
  ) { }

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
        console.log('timeslots:', this.timeSlots);
        
        const timeslotIds = this.timeSlots.map(slot => {
          console.log('slot.id:', slot.id); // Log slot.id
          return slot.id;
        });
        console.log('timeslotIds:', timeslotIds);
        this.teacherService.getBookingsByTeacherId(teacherId).subscribe( // Pass teacherId instead of timeslotIds
          (data) => {
            // Log the fetched data
            this.bookings = data.filter(booking => timeslotIds.includes(booking.timeslotId));
            console.log('Fetched bookings:', this.bookings); 
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

  navigateToTeacherList() {
    this.router.navigate(['/teacher']);
  }
}
