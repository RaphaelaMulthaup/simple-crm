import { Component, inject } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  constructor(private route: ActivatedRoute) {}
  firestore: Firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);

  private sub: Subscription = new Subscription();
  userId: string | null = null;
  user: User = new User();
  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });
    if (this.userId) {
      this.listenToUserChanges(this.userId);
    }
  }

listenToUserChanges(userId: string) {
  const userRef = doc(this.firestore, 'users', userId);
  onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      this.user = new User(docSnap.data());
      console.log('Live-Daten:', this.user);
    } else {
      console.error('User-Dokument existiert nicht.');
    }
  });
}
  editUserDetail() {
    if (this.userId) {
      const dialog = this.dialog.open(DialogEditUserComponent);
      dialog.componentInstance.user = new User(this.user.toJson());
      dialog.componentInstance.userId = this.userId; // jetzt sicher string
      // dialog.componentInstance.birthDate = this.
    } else {
      console.error('userId ist null – kann Dialog nicht öffnen');
    }
  }
  editAddress() {
    if (this.userId) {
      const dialog = this.dialog.open(DialogEditAddressComponent);
      dialog.componentInstance.user = new User(this.user.toJson());
      dialog.componentInstance.userId = this.userId;
    } else {
      console.error('userId ist null – kann Dialog nicht öffnen');
    }
  }
}
