import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
})
export class SubscribersComponent implements OnInit {
  subscribers: Array<object>;

  constructor(private subService: SubscribersService, private router: Router) {}

  ngOnInit(): void {
    this.subService.loadData().subscribe((val) => {
      this.subscribers = val;
    });
  }

  onDelete(subId: any) {
    this.subService.deleteData(subId);
  }

  onJual() {
    this.router.navigate(['/categories']);
  }

  onAlihkan() {
    this.router.navigate(['/posts']);
  }
}
