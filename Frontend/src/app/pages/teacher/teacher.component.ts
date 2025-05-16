import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';

interface UserData {
  id: string; // Ensure the Id property is included
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  tags: string;
  message?: string;
  isTeacher: boolean;
  rating: number;
}

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  userData: UserData | null = null;
  teachers: any[] = [];
  searchName: string = '';

  constructor(private teacherService: TeacherService, private router: Router) { }

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
    console.log('Fetching all teachers data', this.userData);
    this.fetchAllTeachers();
  }

  fetchAllTeachers(): void {
    this.teacherService.getAllTeachers().subscribe(
      (data) => {
        console.log('Fetched teachers data:', data); // Log the fetched data
        this.teachers = data.filter(teacher => teacher.isTeacher); // Filter and store only teachers
        this.teachers.forEach(teacher => {
          console.log('Teacher ID:', teacher.id); // Log each teacher's ID
        });
      },
      (error) => {
        console.error('Error fetching teachers data', error);
      }
    );
  }

  searchTeachers(): void {
    if (this.searchName.trim() === '') {
      this.fetchAllTeachers();
    } else {
      const [firstName, lastName] = this.searchName.split(' ');
      this.teacherService.getTeachersByName(firstName, lastName).subscribe(
        (data) => {
          console.log('Fetched searched teachers data:', data); // Log the fetched data
          this.teachers = data.filter(teacher => teacher.isTeacher); // Filter and store only teachers
          this.teachers.forEach(teacher => {
            console.log('Teacher ID:', teacher.id); // Log each teacher's ID
          });
        },
        (error) => {
          console.error('Error fetching searched teachers data', error);
        }
      );
    }
  }

  viewTeacherDetails(teacherId: string): void {
    this.router.navigate(['/teach-info', teacherId]);
  }
}

