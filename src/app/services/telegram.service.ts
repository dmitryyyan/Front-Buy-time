import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface TgButton{
  show(): void;
  hide(): void;
  setText(text: string): void;
}

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private apiUrl = 'http://localhost:5000/api/telegram'; // Змініть на ваш реальний URL

  constructor(private http: HttpClient) { }

  sendMessage(chatId: string, message: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sendMessage`, { chatId, message });
  }
}

