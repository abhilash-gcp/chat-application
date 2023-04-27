import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private responseData: any;
  private submissionArray: any;
  private submissionRequest: any;

  login:any = FormGroup;
  constructor(
    private fb:FormBuilder,
    // public spinner: NgxSpinnerService,
   
    private authService: AuthService,
 
    
  ) { 
    this.login=this.fb.group({
        email : ['',Validators.required],
        password : ['',Validators.required]
    })
  }

  ngOnInit() {
  }

  
  loginSubmit(data:any) {
    
    console.log(data);
    
    // this.spinner.show();

    this.submissionArray = {};
    this.submissionArray['email'] = data.email;
    this.submissionArray['password'] = data.password;
    // tslint:disable-next-line:max-line-length
    
    console.log(this.submissionArray );
    
    this.submissionRequest = { 'request': { 'data': this.submissionArray } };
    this.authService.login(this.submissionRequest).subscribe((data: any) => {
       
        const result = JSON.parse(data);
       
        if (result.responseCode === 200) {
            this.responseData =  result.responseDetails;
            // this.spinner.hide();
            //this.toastr.success(result.responseDetails, '');
        } else if (result.responseCode === 401) {
                // this.spinner.hide();
                this.responseData = result.responseDetails;
                //this.toastr.error(result.responseDetails, '');
            
        } else {
            this.responseData = result.responseDetails;
            // this.spinner.hide();
            //this.toastr.error(result.responseDetails, '');
            window.location.href = environment.frontend_url + '?msg=' + environment.unauthorised_msg;
        }
    });

}

}
