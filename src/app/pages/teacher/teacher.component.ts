import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teachers: any[] = [];
  searchName: string = '';

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.fetchAllTeachers();
  }

  fetchAllTeachers(): void {
    this.teacherService.getAllTeachers().subscribe(
      (data) => {
        console.log('Fetched teachers data:', data); // Log the fetched data
        this.teachers = data; // Зберігаємо отримані дані викладачів
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
          this.teachers = data; // Зберігаємо отримані дані викладачів
        },
        (error) => {
          console.error('Error fetching searched teachers data', error);
        }
      );
    }
  }
}
