import { Component } from '@angular/core';
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
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';

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
  loading = false;
  user!: User;
  birthDate: Date | null = null;

  saveUser() {}
}
