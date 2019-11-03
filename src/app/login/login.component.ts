import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule]
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: any;

  constructor(private formBuilder: FormBuilder){
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', [Validators.required, Validators.maxLength(50)]],
      time: ['', [Validators.required, Validators.maxLength(10)]],
      eventName: ['', Validators.required]
    });
  }

sendData(event) {
  const endPoint = 'http://172.28.215.5/receiver';
  event.preventDefault();

  let name = document.getElementById('name');
  let location = document.getElementById('location');
  let time = document.getElementById('time');
  let eventName = document.getElementById('eventName');

  fetch(endPoint, 
    {
    method: 'POST',
    headers: new Headers(),
    body:JSON.stringify({name:name, location:location, time:time, eventName:eventName})  
    }).then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err)=>console.log(err))
}

  ngOnInit() {
  }

}
