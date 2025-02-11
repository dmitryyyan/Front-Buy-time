import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-createbook',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css']
})
export class CreatebookComponent implements OnInit {
  bookingForm: FormGroup;
  teachers: any[] = [];
  timeslots: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.bookingForm = this.fb.group({
      teacherId: ['', Validators.required],
      timeslotId: ['', Validators.required],
      message: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.http.get('http://localhost:5258/api/teacher/get-all').subscribe((data: any) => {
      this.teachers = data;
      console.log(this.teachers);
    });
  }

  loadTimeslots(teacherId: string): void {
    console.log('Loading timeslots for teacher:', teacherId);
    this.http.get('http://localhost:5258/api/timeslot/get-all').subscribe((data: any) => {
      this.timeslots = data.filter((timeslot: any) => timeslot.userId === teacherId && timeslot.isAvailable === true);
      if (this.timeslots.length > 0) {
        console.log('Matching timeslots:', this.timeslots);
      } else {
        console.log('No matching timeslots found');
      }
    });
  }

  onTeacherChange(event: any): void {
    const teacherId = event.target.value;
    this.loadTimeslots(teacherId);
  }

 

  submitBooking(): void {
    if (this.bookingForm.valid) {
      const bookingData = {
        userId: '231363D4-5AC6-4E9D-B0C8-54BC41053EF6', // Використовуйте статичний userId
        timeslotId: this.bookingForm.get('timeslotId')?.value,
        status: this.bookingForm.get('status')?.value,
        message: this.bookingForm.get('message')?.value,
      };

      console.log('Booking data:', bookingData);

      this.http.post('http://localhost:5258/api/booking/create', bookingData).subscribe(response => {
        console.log('Booking successful', response);
      }, error => {
        console.error('Booking failed', error);
        console.error('Error response:', error); // Log the error response for debugging
      });
    }
  }
}
