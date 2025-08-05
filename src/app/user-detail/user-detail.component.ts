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

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  constructor(private route: ActivatedRoute) {}
  firestore: Firestore = inject(Firestore);

  private sub: Subscription = new Subscription();
  userId: string | null = null;
  user: User = new User();
  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      console.log('Neue ID:', this.userId);
    });
    if (this.userId) {
      this.getUser(this.userId);
    }
  }

  async getUser(userId: string) {
    const userRef = doc(this.firestore, 'users', userId);
    const userSnap = await getDoc(userRef);
    this.user = new User(userSnap.data());

    console.log('hier die Daten:', this.user);
  }

  editUserDetail() {}
  editAddress() {}
}
