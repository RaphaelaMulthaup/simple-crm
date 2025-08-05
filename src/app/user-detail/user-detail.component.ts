import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  constructor(private route: ActivatedRoute) {}
  private sub: Subscription = new Subscription();
  userId: string | null = null;
  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      console.log('Neue ID:', this.userId);
    });
  }
}
