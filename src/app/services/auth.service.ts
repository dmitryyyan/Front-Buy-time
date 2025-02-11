import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  getCurrentUser() {
    // Mock implementation, replace with actual logic to get the current user
    return { id: '12345', name: 'John Doe' };
  }
}
