import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';
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
      email: ['', [Validators.required, ValidationService.emailValidator]],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      location: ['', [Validators.required, Validators.maxLength(50)]],
      time: ['', [Validators.required, Validators.maxLength(10)]],
      eventName: ['', Validators.required]
    });
  }

  saveUser() {
    if(this.userForm.dirty && this.userForm.valid) {
      alert("${this.userForm.value.name}, thank you for your cleaning efforts!");
    }
  }
  ngOnInit() {
  }

}
