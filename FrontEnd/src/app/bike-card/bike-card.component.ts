import { Component, OnInit, Input, Output } from '@angular/core';
import {Bike, reservation} from '../shared/models'
import {RestApiService} from '../shared/rest-api';
import { DatePipe } from '@angular/common';
import { EventEmitter } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'bike-card',
  templateUrl: './bike-card.component.html',
  styleUrls: ['./bike-card.component.css']
})
export class BikeCardComponent implements OnInit {
  @Input('bike') bike: Bike;
  @Input('show-actions') showActions: Boolean;
  @Input('start_date') start_date: Date;
  @Input('end_date') end_date: Date;
  @Output() bookDone: EventEmitter<any> =  new EventEmitter();

  constructor(private ApiService: RestApiService, private datePipe: DatePipe, public auth:AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.showActions = this.bike.availibility ? true : false;
  }

  async bookTrip(event) {
    console.log(this.bike);
    var res = new reservation();
    res.bike_id = this.bike.id;
    res.start = this.datePipe.transform(this.start_date, "yyyy-MM-dd HH:mm:ss");
    res.end = this.datePipe.transform(this.end_date, "yyyy-MM-dd HH:mm:ss");
    this.ApiService.bookBikes(res, this.bookDone);
  }

  async delete(event) {
    console.log(this.bike);
    var res = new reservation();
    res.bike_id = this.bike.id;
    this.ApiService.deleteBike(this.bike.id);
    window.location.reload();
  }

}
