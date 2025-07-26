import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm:FormGroup
  hidePwdContent:boolean =true;


constructor(private fb: FormBuilder,private apiService: ApiService, private snackBar: MatSnackBar){
  this.registerForm = fb.group({
    firstName:fb.control("",[Validators.required]),
    lastName:fb.control("",[Validators.required]),
    email:fb.control("",[Validators.required]),
    mobileNumber:fb.control("",[Validators.required]),
    password:fb.control("",[Validators.required]),
    repeatPassword:fb.control("",[Validators.required]),
  })
}
register(){
  let user ={
    firstName:this.registerForm.get('firstName')?.value,
    lastName:this.registerForm.get('lastName')?.value,
    email: this.registerForm.get('email')?.value,
    mobileNumber: this.registerForm.get('mobileNumber')?.value,
    password: this.registerForm.get('password')?.value,
  };
  this.apiService.register(user).subscribe({
    next: (res) => {
         this.snackBar.open(res, 'OK');
    }
  })
}
}
