import { Component, OnInit, Input} from '@angular/core';
import {Apartment} from '../shared/models'
import {AuthService} from '../shared/auth.service'
import {RestApiService} from '../shared/rest-api'

@Component({
  selector: 'apartment-card',
  templateUrl: './apartment-card.component.html',
  styleUrls: ['./apartment-card.component.css']
})
export class ApartmentCardComponent implements OnInit {
  @Input('apartment') apartment: Apartment;
  @Input('show-actions') showActions: Boolean;

  constructor(public auth: AuthService, private ApiService: RestApiService) { }

  ngOnInit(): void {
  }

  async delete(event) {
    console.log(this.apartment);
    this.ApiService.deleteApartment(this.apartment.id);
    window.location.reload();
  }

}
