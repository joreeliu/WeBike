import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../shared/auth.service'

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  @Input() Search: string;
  @Output() searchChanged: EventEmitter<string> =  new EventEmitter();
  loginURL: string;

  constructor(public auth: AuthService) { 
    this.loginURL = auth.build_login_link();
    console.log(this.loginURL);
  }

  ngOnInit(): void {
  }

  onClick(data:string){
    console.log(data);
    this.searchChanged.emit(data);
  }

}
