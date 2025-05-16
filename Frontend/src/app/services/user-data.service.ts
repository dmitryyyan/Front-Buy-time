import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private chatId: string | null = null;

  setChatId(chatId: string) {
    this.chatId = chatId;
  }

  getChatId(): string | null {
    return this.chatId;
  }
}
