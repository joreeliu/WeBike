import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApartmentsComponent} from './apartments/apartments.component';
import {HomeComponent} from './home/home.component';
import {BikesComponent} from './bikes/bikes.component'
import {BikeCardFormComponent} from './bike-card-form/bike-card-form.component'
import {ApartmentCardFormComponent} from './apartment-card-form/apartment-card-form.component'
import {AppComponent} from './app.component';
import {MyreservationComponent} from './myreservation/myreservation.component'


const routes: Routes = [
  {path: '', component: ApartmentsComponent},
  {path: 'apartment', component: ApartmentsComponent},
  {path: 'myreservation', component: MyreservationComponent},
  {path: 'apartmentBikes/:id', component: BikesComponent},
  {path: 'apartmentBikes/:id/Bike/new', component: BikeCardFormComponent},
  {path: 'apartmentBikes/:id/Bike/:bike_id', component: BikeCardFormComponent},
  {path: 'apartment/new', component: ApartmentCardFormComponent},
  {path: 'apartment/:id', component: ApartmentCardFormComponent},
  {path: 'apartment/apartment/new', component: ApartmentCardFormComponent},
  {path: 'apartment/apartment/:id', component: ApartmentCardFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
