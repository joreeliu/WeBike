import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../shared/rest-api';
import {Bike, myreservation} from '../shared/models'
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-myreservation',
  templateUrl: './myreservation.component.html',
  styleUrls: ['./myreservation.component.css']
})
export class MyreservationComponent implements OnInit {

  public reservations: myreservation[];

  constructor(private ApiService: RestApiService) { }

  ngOnInit(): void {
    var res = this.ApiService.get_reservations().pipe(
      map(res => res.map(item => new myreservation(item.bike_id, item.bike_name, item.apartment, item.picture, item.customer_id, item.start, item.end)))).subscribe(res => {
        this.reservations = res;
        console.log(this.reservations);
      });
    }
}
