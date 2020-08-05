import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ApartmentsComponent} from './apartments/apartments.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ApartmentCardComponent } from './apartment-card/apartment-card.component';
import { BikesComponent } from './bikes/bikes.component';
import {BikeCardComponent} from './bike-card/bike-card.component'
import { DataService } from './shared/data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { faCalendar,  faClock } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
import {DatePipe} from '@angular/common';
import { MyreservationComponent } from './myreservation/myreservation.component';
import { BikeCardFormComponent } from './bike-card-form/bike-card-form.component';
import { ApartmentCardFormComponent } from './apartment-card-form/apartment-card-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ApartmentsComponent,
    BsNavbarComponent,
    HomeComponent,
    ApartmentCardComponent,
    BikesComponent,
    BikeCardComponent,
    DateTimePickerComponent,
    MyreservationComponent,
    BikeCardFormComponent,
    ApartmentCardFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [HttpClientModule, DataService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faCoffee);}
}
