import { Component } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-timeslot',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './add-timeslot.component.html',
  styleUrls: ['./add-timeslot.component.css']
})
export class AddTimeslotComponent {
  timeSlotData: any = {
    teacherId: '',
    startTime: '',
    endTime: '',
    isAvailable: false
  };

  constructor(private teacherService: TeacherService) { }

  onSubmit(): void {
    this.teacherService.createTimeSlot(this.timeSlotData).subscribe(
      response => {
        console.log('Time slot created:', response);
        // Handle success (e.g., reset form, show message)
      },
      error => {
        console.error('Error creating time slot:', error);
        // Handle error (e.g., show error message)
      }
    );
  }
}
