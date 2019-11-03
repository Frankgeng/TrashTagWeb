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
      eventName: ['', Validators.required],
      picture: ['', Validators.required]
    });
  }

sendData(event) {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const endPoint = 'http://127.0.0.1:5000/receiver';

  let name = (<HTMLInputElement>document.getElementById('name')).value;
  let location = (<HTMLInputElement>document.getElementById('location')).value;
  let time = (<HTMLInputElement>document.getElementById('time')).value;
  let eventName = (<HTMLInputElement>document.getElementById('eventName')).value;
  let pic = (<HTMLInputElement>document.getElementById('picture')).files[0];
  let reader = new FileReader();
  reader.readAsDataURL(pic);
  reader.onload = (event) => { // called once readAsDataURL finish
    let target: any = event.currentTarget; // bad hack
    let picString = target.result;
    fetch(endPoint,
      {
      method: 'POST',
      headers: new Headers(),
      body:JSON.stringify({add:'true', name:name, location:location, time:time, eventName:eventName, pic:picString}),
      mode: 'cors'
    }).then((res) => {
      res = res.json().then(function(inner){
        console.log(inner); // this is where we get the success, do we want to
                            // do anything here?
      })
    })
      .then((data) => {})
      .catch((err)=>console.log(err))
    }
}

  ngOnInit() {
  }

}
