import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  ErrorOnLogin: any = {
    message: ''
  };

  constructor(
    private FormBuilder: FormBuilder,
    private Router: Router,
    private CaseManagerApi: AuthService) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
  }


  createForm(): FormGroup {
    return this.FormBuilder.group({
      username: [, [Validators.required]],
      password: [, [Validators.required]]
    });
  }

  saveForm() {
    if (this.form.invalid) return this.form.markAllAsTouched();

    const user = this.form.value;

    this.CaseManagerApi.Login(user).subscribe((res: any) => {
      localStorage.setItem('cc', res.token);
      this.Router.navigate(['whatsappbot'])
    }, (error: any) => {
      console.log(error.error);
      this.ErrorOnLogin.message = error.error.error
    });

  }

  async loginGoogle() {

  }
}
