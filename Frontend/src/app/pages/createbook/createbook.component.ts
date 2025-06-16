import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
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
  CreateBooking = 0,
  StudentCancel = 1,
  ExpertCancel = 2,
  ConfirmMeeting = 3,
}

@Component({
  selector: 'app-createbook',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css'],

  standalone: true,
  
  template: `
    
      
      `
      
})
export class CreatebookComponent implements OnInit {
  bookingForm: FormGroup;
  teachers: any[] = [];
  timeslots: any[] = [];
  userId: string = '';
  message: string = '';
  urlOfMeeting: string = '';
  

  isConnected: boolean = false;
  publicKey: string | null = null;
  //expertPubkey: string = '8qYPSmTT9LFANhLdhNcGLoWX32mg2FfqbraEtBnkEUWU';
  meetingTime: number = 1746952694;
  amount: number = 0.1;
  bookingPda: string | null = null;
  passed: boolean = true;
  private connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  private programId = new PublicKey('4ws28MPExiFotyySaD8Y3wNq3xEa9ZP3Eqbsf9m6fbu8');
  stydentPyblicKey: string ='';
  expertPublicKey: string = '';
  unixTimestamp = 0;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.bookingForm = this.fb.group({
      teacherId: ['', Validators.required],
      timeslotId: ['', Validators.required],
      message: [''],
      status: ['Pedning'],
      urlOfMeeting: [''],
      startTime: [''],
    });
  }

  async connectWallet() {
    try {
      if (!window.solana || !window.solana.isPhantom) {
        throw new Error('Phantom Wallet not found. Please install Phantom Wallet.');
      }
      const response = await window.solana.connect();
      this.publicKey = response.publicKey.toString();
      this.isConnected = true;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  

  async getBookingPda(student: PublicKey, expert: PublicKey, meetingTime: number): Promise<PublicKey> {
    const meetingTimeBuffer = Buffer.alloc(8);
    // Use writeInt32LE for 32-bit integers
    meetingTimeBuffer.writeInt32LE(Number(meetingTime), 0); // Offset is a number
    const [pda] = await PublicKey.findProgramAddress(
      [Buffer.from('booking'), student.toBuffer(), expert.toBuffer(), meetingTimeBuffer],
      this.programId
    );
    return pda;
  }

  createBookingInstruction(amount: number, meetingTime: number): Buffer {
    const buffer = Buffer.alloc(1 + 8 + 8);
    buffer.writeUInt8(BookingInstructionType.CreateBooking, 0);
    // Replace BigInt with Number for compatibility
    buffer.writeUInt32LE(Number(amount), 1); // Use writeUInt32LE for 32-bit unsigned integers
    buffer.writeInt32LE(Number(meetingTime), 9); // Use writeInt32LE for 32-bit integers
    return buffer;
  }

 

  confirmMeetingInstruction(passed: boolean): Buffer {
    const buffer = Buffer.alloc(2);
    buffer.writeUInt8(BookingInstructionType.ConfirmMeeting, 0);
    buffer.writeUInt8(passed ? 1 : 0, 1);
    return buffer;
  }

  async createBooking() {
      

    this.timeslots.forEach(slot => {
      // Replace slot.startTime with the current time
    // const unixTimestamp = Math.floor(Date.now() / 1000);
    // console.log('S1 (UNIX)', unixTimestamp);
    // this.unixTimestamp = unixTimestamp;


    });
      const student = new PublicKey(this.stydentPyblicKey);
      const expert = new PublicKey(this.expertPublicKey);

      const amount = Math.floor(this.amount * LAMPORTS_PER_SOL);
      const pda = await this.getBookingPda(student, expert, this.unixTimestamp);
      this.bookingPda = pda.toString();
      const data = this.createBookingInstruction(amount, this.unixTimestamp);
      console.log('Booking PDA:', pda.toString());
      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: student, isSigner: true, isWritable: true },
          { pubkey: expert, isSigner: false, isWritable: false },
          { pubkey: pda, isSigner: false, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        programId: this.programId,
        data,
      });
      
      const transaction = new Transaction().add(instruction);
      transaction.feePayer = student;
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      const signedTransaction = await window.solana!.signTransaction(transaction);
      const signature = await this.connection.sendRawTransaction(signedTransaction.serialize());
      await this.connection.confirmTransaction(signature, 'confirmed');

      alert('Booking created! Signature: ' + signature);
    
  }

  button1Action() {
    this.router.navigate(['/teacher']);
  }

  button2Action() {
    this.router.navigate(['/add-timeslot']);
  }

  button3Action() {
     this.router.navigate(['/createbook']);
  }

  navigateToUserPage() {
    this.router.navigate(['/user-page']);
  }
 
  ngOnInit(): void {
    this.loadTeachers();
    this.fetchChatId();
  }

  loadTeachers(): void {
    this.http.get('http://localhost:5258/api/teacher/get-all').subscribe((data: any) => {
      this.teachers = data;
      console.log(this.teachers);
    });
  }

  loadTimeslots(teacherId: string): void {
    console.log('Loading timeslots for teacher:', teacherId);
    this.http.get('http://localhost:5258/api/timeslot/get-all').subscribe((data: any) => {
      console.log('Fetched timeslots222s:', data); // Log the fetched timeslots
      this.timeslots = data.filter((timeslot: any) => timeslot.userId === teacherId && timeslot.isAvailable === true);
      // ...existing code...
      console.log('Filtered timeslots:', this.timeslots.map(slot => slot.startTime));
      
// ...existing code...
      // Додати запит до гаманця
          this.http.get<any>(`http://localhost:5258/api/wallet/get-by-user-id?userId=${teacherId}`).subscribe(
            (walletData) => {
              console.log('Fetched wallet data:', walletData);
              console.log('TEACHER----walletadress', walletData.walletAddress);
              this.expertPublicKey=walletData.walletAddress;
              console.log(this.expertPublicKey) // Log the fetched wallet data
            },
            (error) => {
              console.error('Error fetching wallet data', error);
            }
          );
          
          // Iterate over timeslots to process each slot
  
      
      if (this.timeslots.length > 0) {
        console.log('Matching timeslots:', this.timeslots);
        
      } else {
        console.log('No matching timeslots found');
      }
    });
  }

  fetchChatId(): void {
    this.http.get<{ chatId: string }>('http://localhost:3000/api/getCurrentChatId').subscribe(
      (response) => {
        const chatId = response.chatId;
        console.log('Chat ID:', chatId); // Вивід chatId в консоль
        this.fetchUserData(chatId);
      },
      (error) => {
        console.error('Error fetching chat ID', error);
      }
    );
  }

   fetchUserData(chatId: string): void {
    this.http.get<any>(`http://localhost:5258/api/user/get-by-chat-id?chatId=${chatId}`).subscribe(
      (data) => {
        console.log('Fetched user data:', data); // Log the fetched data
        if (data && !data.message) {
          this.userId = data.id; // Зберігаємо отриманий userId
          console.log('User ID44:', this.userId); // Log the user ID

          // Додати запит до гаманця
          this.http.get<any>(`http://localhost:5258/api/wallet/get-by-user-id?userId=${this.userId}`).subscribe(
            (walletData) => {
              console.log('Fetched wallet data:', walletData);
              console.log('SUDENT----walletadress', walletData.walletAddress);
              this.stydentPyblicKey=walletData.walletAddress;
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

  onTeacherChange(event: any): void {
    const teacherId = event.target.value;
    this.loadTimeslots(teacherId);
  }

 submitBooking(): void {
  if (this.bookingForm.valid) {
    const selectedTimeslotId = this.bookingForm.get('timeslotId')?.value;
    // Знайти об'єкт таймслота за id
    const selectedTimeslot = this.timeslots.find(slot => slot.id === selectedTimeslotId);

    const bookingData = {
      userId: this.userId,
      timeslotId: selectedTimeslotId,
      message: this.bookingForm.get('message')?.value,
      status: this.bookingForm.get('status')?.value,
      urlOfMeeting: this.bookingForm.get('urlOfMeeting')?.value,
      startTime: selectedTimeslot ? selectedTimeslot.startTime : null // <-- тут час із таймслота
    };

    console.log('Start Time:', bookingData.startTime);
    this.unixTimestamp = Math.floor(new Date(bookingData.startTime).getTime() / 1000);
    console.log('UNIX Timestamp:', this.unixTimestamp);

    this.http.post('http://localhost:5258/api/booking/create', bookingData).subscribe(
      (response) => {
        this.createBooking();
        console.log('Booking successful', response);
        this.message = 'Success! Booking created.';
      },
      (error) => {
        console.error('Booking failed', error);
        this.message = 'Error! Booking failed.';
      }
    );
  }
}
}