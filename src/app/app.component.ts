import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './login/validation.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private http: HttpClient) {
    console.log("Got the service!");
  }

  ngOnInit() {
    let obs = this.http.get('https://api.github.com/users/koushikkothagal');
    obs.subscribe((response) => console.log(response));
  }
}
