import { Component } from '@angular/core';
import { MatDialogContent, MatDialogModule } from "@angular/material/dialog";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dialog-add-user',
  imports: [MatDialogContent, MatDialogModule, MatButtonModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

}
