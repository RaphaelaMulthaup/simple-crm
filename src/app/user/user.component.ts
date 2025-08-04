import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: number;
  street: string;
  zipCode: number;
  city: string;
}

@Component({
  selector: 'app-user',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  firestore: Firestore = inject(Firestore);
  allUsers: UserData[] = [];
  ngOnInit() {
    this.loadUsersLive();
  }

  loadUsersLive() {
    const usersCollection = collection(this.firestore, 'users');

    onSnapshot(usersCollection, (snapshot) => {
      this.allUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<UserData, 'id'>),
      }));
      console.log('Live-Daten:', this.allUsers);
    });
  }
  // user = new User();
  readonly dialog = inject(MatDialog);
  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
