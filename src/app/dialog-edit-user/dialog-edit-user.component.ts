import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MatDialogContent,
} from '@angular/material/dialog';
import { User } from '../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  imports: [
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {}
  firestore: Firestore = inject(Firestore);

  loading = false;
  user!: User;
  birthDate!: Date;
  userId: string = '';

  ngOnInit() {
    const timestamp = this.user.birthDate;
    this.birthDate = new Date(timestamp);
  }

  saveUser(userId: string) {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();

    const userDoc = doc(this.firestore, 'users', userId);

    updateDoc(userDoc, {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      birthDate: this.user.birthDate,
    }).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
