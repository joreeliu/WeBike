import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api';
import { Apartment } from '../shared/models'
import { map, catchError } from 'rxjs/operators';
import { DataService } from '../shared/data.service';
import { Subscription } from 'rxjs';
import {AuthService} from '../shared/auth.service'

@Component({
  selector: 'apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {

  public apartments: Apartment[];
  public fitleredApartments: Apartment[];
  public showActions: Boolean;
  public Search: string;
  subscription: Subscription;

  constructor(private ApiService: RestApiService, private ds: DataService, public auth: AuthService) {
    this.subscription = this.ds.getData().subscribe(x => {
      this.Search = x;
      console.log('apartment component get ' + this.Search);
      this.fitleredApartments = (this.Search) ? this.apartments.filter(p => p.name?.toLowerCase().includes(this.Search.toLowerCase())) : this.apartments;
    });
  }

  ngOnInit(): void {
    this.showActions = true;
    this.Search = '';
    this.ApiService.getApartments().pipe(
      map(res => res.map(item => new Apartment(item.id, item.name, item.address, item.picture, item.total_bikes, item.num_bike_for_rent)))).subscribe(res => { 
        this.apartments = res;
        this.fitleredApartments = this.apartments;
      });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
