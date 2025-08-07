import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  imports: [
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatInputModule,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {}
  firestore: Firestore = inject(Firestore);

  loading = false;
  user!: User;
  userId!: string;

  saveAddress(userId: string) {
    this.loading = true;
    const userDoc = doc(this.firestore, 'users', userId);

    updateDoc(userDoc, {
      street: this.user.street,
      zipCode: this.user.zipCode,
      city: this.user.city,
    }).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
