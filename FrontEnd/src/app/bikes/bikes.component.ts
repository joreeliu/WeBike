import { Component, OnInit, Input } from '@angular/core';
import {Bike} from '../shared/models'
import {RestApiService} from '../shared/rest-api';
import { map, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {AuthService} from '../shared/auth.service';


@Component({
  selector: 'bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {

  public bikes: Bike[];
  public showActions: Boolean;
  public fitleredBikes: Bike[];
  public Search: string;
  subscription: Subscription;

  public formGroup : FormGroup;
  public startDateModel: Date = new Date();
  public endDateModel: Date = new Date();

  constructor(private ApiService: RestApiService, public auth:AuthService, private route: ActivatedRoute, private ds: DataService, private datePipe: DatePipe) { 
    this.subscription = this.ds.getData().subscribe(x => {
      this.Search = x;
      console.log('apartment component get ' + this.Search);
      this.fitleredBikes = (this.Search) ? this.bikes.filter(p => p.name?.toLowerCase().includes(this.Search.toLowerCase())) : this.bikes;
    });
  }


  ngOnInit(): void {
    this.showActions = true;
    this.route.params.subscribe(params => {
      console.log(params['id'])
      var start = this.datePipe.transform(this.startDateModel, "yyyy-MM-dd HH:mm:ss");
      var end = this.datePipe.transform(this.endDateModel, "yyyy-MM-dd HH:mm:ss");
      this.ApiService.getBikes(params['id'], start, end).pipe(
        map(res => res.map(item => new Bike(item.id, item.name, item.description, item.picture, item.availibility)))).subscribe(res => {
          this.bikes = res;
          this.fitleredBikes = this.bikes
        });
      })

      this.formGroup = new FormGroup({
        activeEndDate:  new FormControl(new Date(), {validators: [Validators.required, DateTimeValidator]})
      }, { updateOn: 'change' });
    
    }
  
  onDateChange(newValue) {
      console.log(newValue);
      this.route.params.subscribe(params => {
        console.log(params['id'])
        var start = this.datePipe.transform(this.startDateModel, "yyyy-MM-dd HH:mm:ss");
        var end = this.datePipe.transform(this.endDateModel, "yyyy-MM-dd HH:mm:ss");
        this.ApiService.getBikes(params['id'], start, end).pipe(
          map(res => res.map(item => new Bike(item.id, item.name, item.description, item.picture, item.availibility)))).subscribe(res => {
            this.bikes = res;
            this.fitleredBikes = this.bikes
          });
        })
  }
  
}

export const DateTimeValidator = (fc: FormControl) => {
  const date = new Date(fc.value);
  const isValid = !isNaN(date.valueOf());
  return isValid ? null : {
      isValid: {
          valid: false
      }
  };
};
