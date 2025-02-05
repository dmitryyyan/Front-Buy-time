// src/app/chat.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // робимо сервіс доступним в усьому додатку
})
export class ChatService {
  private chatId: string | null = null;

  // Метод для збереження chatId
  setChatId(chatId: string): void {
    this.chatId = chatId;
  }

  // Метод для отримання chatId
  getChatId(): string | null {
    return this.chatId;
  }
}
