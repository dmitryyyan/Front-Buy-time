import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Додайте ReactiveFormsModule

interface UserData {
  id: string; // Ensure the Id property is included
  firstName: string;
  lastName: string;
  email: string;
  telegramChatId: string;
  isTeacher: boolean;
  teacherNickname: string;
  description: string;
  rating: number;
  tags: string;
  message?: string;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  userId: string; // Ensure the TeacherId property is included
}

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.css'],
  imports: [CommonModule, HttpClientModule]
})
export class ConnectWalletComponent implements OnInit {
  userData: UserData | null = null;
  walletAddress: string | null = null;
  userId: string = '123'; // Замініть на реальний userId, якщо він доступний
  chatId: string | null = null;
  userForm: FormGroup;
  timeSlots: TimeSlot[] = []; // Додайте це поле для зберігання отриманих часових слотів

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchChatId();
  }

  fetchChatId(): void {
    this.http.get<{ chatId: string }>('http://localhost:3000/api/getCurrentChatId').subscribe(
      (response) => {
        this.chatId = response.chatId;
        console.log('Chat ID:', this.chatId); // Вивід chatId в консоль
        this.fetchUserData();
      },
      (error) => {
        console.error('Error fetching chat ID', error);
      }
    );
  }

  fetchUserData(): void {
    if (!this.chatId) {
      console.error('Chat ID is not defined');
      return;
    }
    this.http.get<UserData>(`http://localhost:5258/api/user/get-by-chat-id?chatId=${this.chatId}`).subscribe(
      (data) => {
        console.log('Fetched user data:', data);
        this.userId=data.id; // Log the fetched data
        if (data && !data.message) {
          this.userData = data; // Зберігаємо отримані дані користувача
          if (this.userForm) {
            this.userForm.patchValue({ isTeacher: data.isTeacher }, { emitEvent: false }); // Set the checkbox value without emitting event
          }
          console.log('User Data:', data); // Log the entire user data
          if (data.id) {
            console.log('User ID:', data.id); // Log the user ID
             // Викликати метод тут з потрібним userId
          } else {
            console.error('User ID is undefined');
          }
        } else {
          console.log('No user data available');
        }
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }



  async connectWallet() {
    try {
      // Перевірка наявності Phantom Wallet
      const provider = (window as any).solana;
      if (!provider || !provider.isPhantom) {
        alert('Phantom Wallet не знайдено. Встановіть його для продовження.');
        return;
      }

      // Підключення до гаманця
      const response = await provider.connect();
      this.walletAddress = response.publicKey.toString();
      console.log('Wallet Address:', this.walletAddress);

      // Збереження номера гаманця в базі даних
      this.saveWalletAddress();
    } catch (error) {
      console.error('Помилка підключення до гаманця:', error);
    }
  }

  saveWalletAddress() {
    if (!this.walletAddress) {
      alert('Гаманець не підключено.');
      return;
    }

    const apiUrl = 'http://localhost:5258/api/wallet/set-by-user-id';
    const payload = {
      userId: this.userId,
      walletType: 'Phantom',
      walletAddress: this.walletAddress,
    };
    console.log('Payload:', payload);

    this.http.post(apiUrl, payload).subscribe({
      next: (response) => {
        console.log('Гаманець успішно збережено:', response);
        alert('Гаманець успішно збережено!');
      },
      error: (error) => {
        console.error('Помилка збереження гаманця:', error);
        alert('Помилка збереження гаманця.');
      },
    });
  }
}