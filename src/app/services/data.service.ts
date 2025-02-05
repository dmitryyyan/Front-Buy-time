import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  getTeachers() {
    return fetch('connect_db.json.json')  // Шлях до вашого файлу
      .then(response => response.json())
      .catch(error => {
        console.error('Error loading JSON:', error);
        return [];
      });
  }
}
