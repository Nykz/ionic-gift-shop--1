import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRow,
  IonCol,
  IonIcon,
  IonThumbnail, 
  IonImg, 
  IonCard, 
  IonLabel, 
  IonText, 
  IonSearchbar 
} from '@ionic/angular/standalone';
import { ApiService } from '../services/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonSearchbar, 
    IonText, 
    IonLabel, 
    IonCard, 
    IonImg, 
    IonIcon,
    IonCol,
    IonRow,
    IonThumbnail,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  items: any[] = [];
  allItems: any[] = [];
  query!: string;
  totalItems = 0;
  cartSub!: Subscription;
  private api = inject(ApiService);

  constructor() {}

  ngOnInit() {
    console.log('ngoninit homepage');
    this.getItems();
  }

  getItems() {
    this.allItems = this.api.items;
    this.items = [...this.allItems];
  }

  onSearchChange(event: any) {
    console.log(event.detail.value);

    this.query = event.detail.value.toLowerCase();
    this.querySearch();
  }

  querySearch() {
    this.items = [];
    if (this.query.length > 0) {
      this.searchItems();
    } else {
      this.items = [...this.allItems];
    }
  }

  searchItems() {
    this.items = this.api.items.filter((item) =>
      item.name.toLowerCase().includes(this.query)
    );
  }

}
