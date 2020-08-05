import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginURL: string;

  constructor(public auth: AuthService) { 
    this.loginURL = auth.build_login_link();
    console.log(this.loginURL);
  }

  ngOnInit(): void {
  }

}
