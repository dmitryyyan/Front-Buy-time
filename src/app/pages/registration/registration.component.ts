import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
  <h2>Teacher Registration</h2>
  <form [formGroup]="teacherForm" (ngSubmit)="onSubmit()">
    <label for="firstName">First Name:</label>
    <input id="firstName" formControlName="firstName" type="text" placeholder="Enter your first name" required>
    
    <label for="lastName">Last Name:</label>
    <input id="lastName" formControlName="lastName" type="text" placeholder="Enter your last name" required>
    
    <label for="role">Role:</label>
    <input id="role" formControlName="role" type="text" placeholder="Enter your role" required>
    
    <label for="email">Email:</label>
    <input id="email" formControlName="email" type="email" placeholder="Enter your email" required>
    
    <label for="description">Description:</label>
    <textarea id="description" formControlName="description" placeholder="Short description about your lessons"></textarea>

    <label for="tags">Tags (keywords):</label>
    <input id="tags" formControlName="tags" type="text" placeholder="e.g., English, Math" required>

    <!-- Нове поле для chatId -->
    <label for="telegramChatId">Chat ID:</label>
    <input id="telegramChatId" formControlName="telegramChatId" type="text" placeholder="Enter your Telegram Chat ID" required>
    
    <button type="submit" [disabled]="!teacherForm.valid">Register</button>
  </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      max-width: 400px;
      margin: auto;
    }
    label {
      margin-top: 10px;
    }
    input, textarea, button {
      padding: 10px;
      margin-top: 5px;
    }
  `]
})
export class RegistrationComponent {
  teacherForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: [''],
      tags: ['', Validators.required],
      telegramChatId: ['', Validators.required]  // Додано поле для chatId
    });
  }

  onSubmit() {
    if (this.teacherForm.valid) {
      const teacherData = this.teacherForm.value;
  
      // Перевірте, чи передається правильне значення
      console.log(teacherData);
  
      // Відправка даних на сервер
      this.http.post('http://localhost:5258/api/teachers', teacherData).subscribe({
        next: () => alert('Teacher registration successful!'),
        error: (err) => console.error('Error:', err)
      });
    }
  }
  
}
