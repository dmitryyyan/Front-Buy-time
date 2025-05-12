import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TimeslotService } from '../../services/timeslot.service';
import { UserDataService } from '../../services/user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  SystemProgram,
} from '@solana/web3.js';
import { Buffer } from 'buffer';

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      signTransaction: (transaction: Transaction) => Promise<Transaction>;
    };
  }
}

enum BookingInstructionType {
  ExpertCancel = 2,
  ConfirmMeeting = 3,
}

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
  

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  userId: string;
  userDetails?: UserDetails; // Використання нового інтерфейсу UserDetails
  userData?: { id: string }; // Add userData property with id field
  isConfirmed?: boolean; // Add isConfirmed property
}

interface  userDetails {
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
@Component({
  selector: 'app-time-slot',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.css']
})
export class TimeSlotComponent implements OnInit {
    userData: UserData | null = null;
    userDetails: UserDetails | null = null;
    
    timeSlots: TimeSlot[] = [];
    chatId: string | null = null;
    userForm: FormGroup;
    isSubmitting: boolean = false;

    isConnected = false;
    publicKey: string | null = null;
    studentPubkey = '';
    bookingPda = '';
    passed = true;
    unixTimestamp = 0;
    oraclePublicKey: string = '';
    stydentPublicKey: string = '';

  private connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  private programId = new PublicKey('4ws28MPExiFotyySaD8Y3wNq3xEa9ZP3Eqbsf9m6fbu8');


  constructor(
    private http: HttpClient,
    private timeslotService: TimeslotService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      isTeacher: [false, Validators.required]
    });

   
  }

  ngOnInit(): void {
    this.userDetails = {
      firstName: 'Невідомо',
      lastName: 'Невідомо',
      email: 'Невідомо'
    }; // Ініціалізація userDetails значеннями за замовчуванням
    console.log('d', this.userDetails); // Лог userDetails після ініціалізації
    this.fetchChatId();
    this.fetchInactiveTimeSlots(''); // Завантажити слоти для конкретного вчителя
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
  // Метод для отримання даних користувача за chatId

   async getBookingPda(student: PublicKey, expert: PublicKey, meetingTime: number): Promise<PublicKey> {
    const meetingTimeBuffer = Buffer.alloc(8);
    meetingTimeBuffer.writeInt32LE(Number(meetingTime), 0); 
    const [pda] = await PublicKey.findProgramAddress(
      [Buffer.from('booking'), student.toBuffer(), expert.toBuffer(), meetingTimeBuffer],
      this.programId
    );
    return pda;
  }

  expertCancelInstruction(): Buffer {
    return Buffer.from([BookingInstructionType.ExpertCancel]);
  }

  confirmMeetingInstruction(passed: boolean): Buffer {
    const buf = Buffer.alloc(2);
    buf.writeUInt8(BookingInstructionType.ConfirmMeeting, 0);
    buf.writeUInt8(passed ? 1 : 0, 1);
    return buf;
  }
    

  async expertCancel() {
    try {
      const expert = new PublicKey(this.publicKey!);
      const student = new PublicKey(this.studentPubkey);
      const pda = new PublicKey(this.bookingPda);
      const data = this.expertCancelInstruction();

      const ix = new TransactionInstruction({
        keys: [
          { pubkey: expert, isSigner: true, isWritable: true },
          { pubkey: pda, isSigner: false, isWritable: true },
          { pubkey: student, isSigner: false, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        programId: this.programId,
        data,
      });

      const tx = new Transaction().add(ix);
      tx.feePayer = expert;
      const { blockhash } = await this.connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;

      const signed = await window.solana!.signTransaction(tx);
      const sig = await this.connection.sendRawTransaction(signed.serialize());
      await this.connection.confirmTransaction(sig, 'confirmed');

    alert('Booking canceled! Signature: ' + sig);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        alert('Failed to cancel booking: ' + err.message);
      } else {
        alert('Failed to cancel booking: ' + String(err));
      }
    }
  }

  async confirmMeeting() {
    try {
      const oracle = new PublicKey(this.oraclePublicKey!);
      const student = new PublicKey(this.stydentPublicKey);
      const pda = await this.getBookingPda(student, oracle, this.unixTimestamp);
      const data = this.confirmMeetingInstruction(this.passed);
      console.log('tttttt', this.unixTimestamp);
      console.log('PDA', pda.toString());

      const ix = new TransactionInstruction({
        keys: [
          { pubkey: oracle, isSigner: true, isWritable: false },
          { pubkey: pda, isSigner: false, isWritable: true },
          { pubkey: student, isSigner: false, isWritable: true },
          { pubkey: new PublicKey(this.oraclePublicKey!), isSigner: false, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        programId: this.programId,
        data,
      });

      const tx = new Transaction().add(ix);
      tx.feePayer = oracle;
      const { blockhash } = await this.connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;

      const signed = await window.solana!.signTransaction(tx);
      const sig = await this.connection.sendRawTransaction(signed.serialize());
      await this.connection.confirmTransaction(sig, 'confirmed');

      alert('Meeting confirmed! Signature: ' + sig);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        alert('Failed to confirm meeting: ' + err.message);
      } else {
        alert('Failed to confirm meeting: ' + String(err));
      }
    }
  }



  fetchUserData(): void {
    if (!this.chatId) {
      console.error('Chat ID is not defined');
      return;
    }
    this.http.get<UserData>(`http://localhost:5258/api/user/get-by-chat-id?chatId=${this.chatId}`).subscribe(
      (data) => {
        console.log('Fetched user data:', data); // Log the fetched data
        if (data && !data.message) {
         

          this.userData = data; // Зберігаємо отримані дані користувача
          this.userForm.patchValue({ isTeacher: data.isTeacher }, { emitEvent: false }); // Set the checkbox value without emitting event
          console.log('User Data:', data); // Log the entire user data
          if (data.id) {
            console.log('User ID:', data.id); // Log the user ID
            this.fetchTimeSlots(data.id);
            this.fetchInactiveTimeSlots(data.id); // Викликати метод тут з потрібним userId
          } else {
            console.error('User ID is undefined');
          }

           //console.log('22222222',this.userData.id);
          this.http.get<any>(`http://localhost:5258/api/wallet/get-by-user-id?userId=${this.userData.id}`).subscribe(
            (walletData) => {
              console.log('Fetched wallet data:', walletData);
              console.log('SUDENT----walletadress', walletData.walletAddress);
              this.oraclePublicKey=walletData.walletAddress;
              //console.log(this.stydentPyblicKey) // Log the fetched wallet data
            },
            (error) => {
              console.error('Error fetching wallet data', error);
            }
          );
        } else {
          console.log('No user data available');
        }
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }


  fetchTimeSlots(userId: string): void {
  this.timeslotService.getAllTimeSlots().subscribe(
    (data: TimeSlot[]) => {
      console.log('Fetched all time slots:', data);
      this.timeSlots = data.filter(slot => slot.userId === userId.toLowerCase());
      this.timeSlots.forEach(slot => {
     // console.log('START',slot.startTime); // Лог startTime для кожного слота
      });
    },
    (error) => {
      console.error('Error fetching time slots', error);
    }
  );
}

  fetchInactiveTimeSlots(userId: string): void {
    this.timeslotService.getAllTimeSlots().subscribe(
      (data) => {
       // console.log('Fetched all time slots:', data);
        console.log(userId); // Лог userId
        data.forEach(slot => {
          if (!slot.isAvailable && slot.userId === userId) { // Фільтруємо тільки неактивні слоти для конкретного користувача
            console.log('Processing slot:', slot.id);
            console.log('S1',slot.startTime) // Лог слота
           
            
            
            this.http.get<any>(`http://localhost:5258/api/booking/get-by-timeslot-id?timeSlotId=${slot.id}`).subscribe(
              (userData) => {
                if (userData && Array.isArray(userData) && userData.length > 0 && userData[0].userId) {
                  console.log('WWWWWWWWWWWWWWWWWW')
                  console.log('Fetched user data for slot:', userData[0].createdAt); // Лог статусу
                  slot['userData'] = userData[0]; // Додаємо дані користувача до слота
                  slot.isConfirmed = userData[0].status === 'confirmed'; // Set isConfirmed based on status
                   // Convert startTime to UNIX timestamp and log it
            
           // Зберігаємо UNIX timestamp
            
            // Add 3 hours to the createdAt timestamp and remove fractional seconds
            const createdAt = new Date(userData[0].createdAt);
            createdAt.setHours(createdAt.getHours() + 3); // Add 3 hours
            const adjustedTimestamp = Math.floor(createdAt.getTime() / 1000); // Convert to UNIX timestamp without fractional seconds
            console.log('Fetched user data for slot (adjusted):', adjustedTimestamp);
            this.unixTimestamp = adjustedTimestamp; // Зберігаємо UNIX timestamp
                  // Додано запит до API для отримання даних користувача за userData[0].userId
                  this.http.get<any>(`http://localhost:5258/api/user/get-by-id?id=${userData[0].userId}`).subscribe(
                    (userDetails) => {
                      if (userDetails) {
                        console.log('Fetched user details:', userDetails); // Лог деталей користувача
                        slot.userDetails = {
                          firstName: userDetails.firstName || 'Невідомо',
                          lastName: userDetails.lastName || 'Невідомо',
                          email: userDetails.email || 'Невідомо'
                        }; // Додаємо деталі користувача до слота

                        // Оновлюємо timeSlots для відображення змін
                        this.timeSlots = [...this.timeSlots];
                      } else {
                        console.error('User details are undefined for userId:', userData[0].userId);
                      }
                    },
                    (error) => {
                      console.error('Error fetching user details:', error);
                    }
                  );

                  this.http.get<any>(`http://localhost:5258/api/wallet/get-by-user-id?userId=${userData[0].userId}`).subscribe(
                    (walletData) => {
                      console.log('Fetched wallet data:', walletData);
                      console.log('ORACLE----walletadress', walletData.walletAddress);
                      this.stydentPublicKey=walletData.walletAddress;
                      //console.log(this.stydentPyblicKey) // Log the fetched wallet data
                    },
                    (error) => {
                      console.error('Error fetching wallet data', error);
                    }
                  );
                } else {
                  console.error('Invalid user data structure or empty response:', userData);
                }
              },
              (error) => {
                console.error('Error fetching user data for slot:', error);
              }
            );
          }
        });
        this.timeSlots = data.filter(slot => !slot.isAvailable && slot.userId === userId); // Фільтруємо лише неактивні слоти для конкретного користувача
      },
      (error) => {
        console.error('Error fetching time slots', error);
      }
    );
  }

  confirmBooking(bookingId: string, confirmationMessage: string, contactLink: string): void {
    const requestBody = {
      bookingId,
      confirmationMessage,
      contactLink
    };

    this.confirmMeeting();

    this.http.post('http://localhost:5258/api/booking/confirm', requestBody).subscribe(
      (response: any) => {
        if (response && response.error) {
          console.error('Сервер повернув помилку:', response.error);
          alert(`Помилка підтвердження бронювання: ${response.error.message || 'Невідома помилка'}`);
        } else {
          console.log('Бронювання підтверджено:', response);
          alert('Бронювання успішно підтверджено!');
        }
      },
      (error) => {
       
        if (error.status === 500) {
          console.error('Деталі помилки сервера:', error.error); // Лог деталей помилки сервера
        }
        alert('Все записалося мабуть..');
      }
    );
  }

  openConfirmationDialog(slotId: string): void {
    const slot = this.timeSlots.find(s => s.id === slotId); // Find the correct slot by its ID
    if (!slot || !slot.userData) {
      alert('Неможливо знайти відповідний слот або дані користувача.');
      return;
    }
  
    const bookingId = slot.userData.id; // Use the correct booking ID from userData[0].id
    console.log('Fetched user data for slot:', bookingId); // Log the booking ID here
    const confirmationMessage = prompt('Введіть повідомлення для підтвердження:');
    if (!confirmationMessage) {
      alert('Повідомлення не може бути порожнім.');
      return;
    }
  
    const contactLink = prompt('Введіть посилання для контакту:');
    if (!contactLink) {
      alert('Посилання не може бути порожнім.');
      return;
    }
  
    this.confirmBooking(bookingId, confirmationMessage, contactLink);
  }

  navigateToUserPage(): void {
    this.router.navigate(['/user-page']);
  }

  navigateToUserDetails(): void {
    this.router.navigate(['/user-details'], { state: { userDetails: this.userDetails } });
  }

  openUserDetailsModal(userDetails: UserDetails): void {
    alert(`Ім'я: ${userDetails.firstName}\nПрізвище: ${userDetails.lastName}\nEmail: ${userDetails.email}`);
  }
}
