import { Component, OnInit, ViewChild } from '@angular/core';
import {RestApiService} from '../shared/rest-api';
import { Router, ActivatedRoute } from '@angular/router';
import { Bike } from '../shared/models';
import { map, catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';



@Component({
  selector: 'app-bike-card-form',
  templateUrl: './bike-card-form.component.html',
  styleUrls: ['./bike-card-form.component.css']
})
export class BikeCardFormComponent implements OnInit {

  @ViewChild('f') f: NgForm;

  constructor(private ApiService: RestApiService, private route: ActivatedRoute, private router: Router) { }

  public myBike: Bike;

  save(bike){
    this.route.params.subscribe(params => {
      console.log(params['id']);
      bike.apartment_id = parseInt(params['id']);
      console.log(bike);
      if('bike_id' in params){
      bike.id = params['bike_id'];
      }
    },)
    this.ApiService.addBikes(bike);
    this.route.params.subscribe(params => {
      this.router.navigate(['/apartmentBikes/' + params['id']]);
      }
    ,)
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if('bike_id' in params){
          console.log(params['bike_id']);
          this.ApiService.getBike(params['bike_id']).subscribe(
            (data: Bike) => {this.myBike = data;
            console.log(this.myBike);
            this.f.controls.name.setValue(this.myBike.name);
            this.f.controls.description.setValue(this.myBike.description);
            this.f.controls.picture.setValue(this.myBike.picture);

            }
          )
        }
      },
    )
  }

}
