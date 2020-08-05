import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Time } from '@angular/common';

export class Apartment {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public picture?: string,
        public total_bikes?: number,
        public num_bike_for_rent?: number,
    ) { } 
 }

 export class Bike {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public picture?: string,
        public availibility?: number,
    ) { } 
 }

 export class reservation {
    constructor(
        public id?: number,
        public bike_id?: number,
        public customer_id?: number,
        public start?: string,
        public end?: string,
    ) { } 
 }

 export class myreservation {
    constructor(
        public bike_id?: number,
        public bike_name?: string,
        public apartment?: string,
        public picture?: string,
        public customer_id?: number,
        public start?: string,
        public end?: string,
    ) { } 
 }