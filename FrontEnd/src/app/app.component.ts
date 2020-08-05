import { Component } from '@angular/core';
import { DataService } from './shared/data.service';
import { Subscription } from 'rxjs';
import {AuthService} from './shared/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FinalProject';
  public Search: string;
  constructor(private ds: DataService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.load_jwts();
    this.auth.check_token_fragment();
  }

  eventFromChild(data) {
    this.Search = data;
    console.log('parent got ' + this.Search);
    this.ds.sendData(this.Search);
  }
  
  ngOnDestroy() {
    // clear message
    this.ds.clearData();
  }

  clearData() {
    // clear message
    this.ds.clearData();
  }

}
