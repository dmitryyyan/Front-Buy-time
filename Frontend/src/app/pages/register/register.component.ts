import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string = '';
  loading: boolean = false;

  userId: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telegramChatId: ['', Validators.required],
      isTeacher: [false, Validators.required],
      description: ['', Validators.required],
      rating: [0, Validators.required],
      tags: ['', Validators.required],
   });
  }

  ngOnInit(): void {
    this.fetchChatId();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.http.post('http://localhost:5258/api/user/add-user-details', this.registerForm.value).subscribe(
        (response: any) => {
          this.message = 'Реєстрація успішна!';
          this.loading = false;
          console.log(response);
          setTimeout(() => this.router.navigate(['/user-page']), 1500);
        },
        (error) => {
          this.message = 'Помилка реєстрації.';
          this.loading = false;
        }
      );
    }
  }

  fetchChatId(): void {
    this.http.get<{ chatId: string }>('http://localhost:3000/api/getCurrentChatId').subscribe(
      (response) => {
        const chatId = response.chatId;
        console.log('Chat ID:', chatId);
        // Автоматично підставляємо chatId у форму
        this.registerForm.patchValue({ telegramChatId: chatId });
      },
      (error) => {
        console.error('Error fetching chat ID', error);
      }
    );
  }

  
}
