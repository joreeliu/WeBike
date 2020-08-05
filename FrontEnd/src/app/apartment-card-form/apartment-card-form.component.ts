import { Component, OnInit, ViewChild } from '@angular/core';
import {RestApiService} from '../shared/rest-api';
import { Router, ActivatedRoute } from '@angular/router';
import { Apartment } from '../shared/models';
import { map, catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';



@Component({
  selector: 'app-apartment-card-form',
  templateUrl: './apartment-card-form.component.html',
  styleUrls: ['./apartment-card-form.component.css']
})
export class ApartmentCardFormComponent implements OnInit {

  @ViewChild('f') f: NgForm;

  constructor(private ApiService: RestApiService, private route: ActivatedRoute, private router: Router) { }

  public myApartment: Apartment;

  save(apartment){
    this.route.params.subscribe(params => {
      console.log(params['id']);
      console.log(apartment);
      if('id' in params){
        apartment.id = params['id'];
      }
    },)
    this.ApiService.addApartment(apartment);
    this.route.params.subscribe(params => {
      this.router.navigate(['/apartment']);
      }
    ,)
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if('id' in params){
          console.log(params['id']);
          this.ApiService.getApartment(params['id']).subscribe(
            (data: Apartment) => {this.myApartment = data;
            console.log(this.myApartment);
            this.f.controls.name.setValue(this.myApartment.name);
            this.f.controls.address.setValue(this.myApartment.address);
            this.f.controls.picture.setValue(this.myApartment.picture);

            }
          )
        }
      },
    )
  }

}
