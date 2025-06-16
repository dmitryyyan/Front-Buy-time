import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title class="dialog-title">Оплата</h2>
    <mat-dialog-content>
      <p class="payment-message">{{ data.message }}</p>
      <div class="wallet-hint">
        <span class="hint-icon">ℹ️</span>
        <span>
          Після натискання <b>«Оплатити»</b> вам потрібно <b>відкрити Telegram Wallet Ton Space</b>.<br>
          Підтвердіть оплату у гаманці,<br>
          <b>а потім поверніться до цього застосунку для завершення бронювання.</b>
        </span>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()" class="cancel-btn">Скасувати</button>
      <button mat-raised-button color="primary" (click)="onConfirm()" class="pay-btn">Оплатити</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-title {
      color: #2563eb;
      font-weight: 700;
      font-size: 1.35rem;
      letter-spacing: 0.01em;
      padding-bottom: 8px;
      text-align: center;
    }
    .payment-message {
      font-size: 16px;
      margin-bottom: 18px;
      color: #222;
      text-align: center;
    }
    .wallet-hint {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      background: linear-gradient(94deg, #e0e7ef 60%, #e6f2fd 100%);
      color: #222;
      font-size: 15px;
      border-radius: 12px;
      padding: 13px 16px 13px 14px;
      margin: 0 auto 8px auto;
      box-shadow: 0 2px 16px 0 #d1e6ff44;
      max-width: 410px;
      line-height: 1.55;
    }
    .hint-icon {
      font-size: 20px;
      margin-top: 1px;
      color: #2563eb;
      flex-shrink: 0;
    }
    .pay-btn {
      font-weight: 600;
      font-size: 15px;
      border-radius: 22px;
      min-width: 120px;
      box-shadow: 0 2px 12px #2563eb22;
      transition: background .2s, transform .1s;
    }
    .pay-btn:hover {
      background: linear-gradient(93deg, #2563eb 70%, #60a5fa 100%);
      transform: translateY(-1px) scale(1.04);
    }
    .cancel-btn {
      color: #64748b !important;
      font-weight: 500;
      letter-spacing: 0.01em;
      font-size: 14px;
      margin-right: 6px;
    }
    @media (max-width: 480px) {
      .wallet-hint { font-size: 13px; padding: 11px 9px; }
      .dialog-title, .payment-message { font-size: 15px; }
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }
  onCancel() {
    this.dialogRef.close(false);
  }
}
