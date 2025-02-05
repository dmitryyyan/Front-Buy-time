import { Component , inject} from '@angular/core';
import { CommonModule } from "@angular/common";
import { TelegramService } from '../../services/telegram.service';
import { Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  template:  `
  <div class="container">
    <h1>Оберіть роль</h1>
    <button class="role-button" (click)="selectRole('Викладач')">Викладач</button>
    <button class="role-button" (click)="selectRole('Студент')">Студент</button>
  </div>
`,
styles: [`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f8f9fa;
  }
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #343a40;
  }
  .role-button {
    padding: 10px 20px;
    margin: 10px;
    font-size: 18px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 200px;
  }
  .role-button:hover {
    background-color: #0056b3;
  }
`]
})
export class TestComponent {
  telegram = inject(TelegramService);

  constructor() {
   // this.telegram.MainButton.show();
   }

   selectRole(role: string) {
    alert(`Ви обрали роль: ${role}`);
  }
}
