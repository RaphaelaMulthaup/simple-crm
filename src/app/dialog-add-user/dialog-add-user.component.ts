import { Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
  imports: [
    MatDialogContent,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FormsModule,
    MatProgressBarModule,
  ],
  providers: [
    provideNativeDateAdapter(), // ✅ moderner Weg
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date | null = null;
  firestore: Firestore = inject(Firestore);
  loading = false;

  saveUser() {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
      this.loading = true;
      const usersCollection = collection(this.firestore, 'users');
      addDoc(usersCollection, this.user.toJson()).then((result) => {
        this.loading = false;
      });
    }
  }
}
