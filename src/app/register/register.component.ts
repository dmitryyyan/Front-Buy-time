import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http: HttpClient ) {}

  onSubmit(form: any) {
    const userDetails = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      telegramChatId: form.telegramChatId,
      isTeacher: form.isTeacher,
      description: form.description,
      rating: 0,
      tags: form.tags
    };

    this.http.post('http://localhost:5258/api/user/add-user-details', userDetails)
      .subscribe(response => {
        console.log('User registered successfully', response);
      }, error => {
        console.error('Error registering user', error);
      });
  }
}
