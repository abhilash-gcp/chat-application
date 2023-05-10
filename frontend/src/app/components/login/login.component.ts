import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private responseData: any;
  private submissionArray: any;
  private submissionRequest: any;
  private userStorage: any;
  private isLoggedIn: any;

  login:any = FormGroup;
  constructor(
    private fb:FormBuilder,
    // public spinner: NgxSpinnerService,
    private router: Router,
   
    private authService: AuthService,
    private commService: CommonService,
 
    
  ) { 
    this.login=this.fb.group({
        email : ['',Validators.required],
        password : ['',Validators.required]
    })
  }

  ngOnInit() {

    if (this.commService.getSession('user')) {
      this.userStorage = this.commService.getSession('user');
      //this.userData = JSON.parse(this.commService.localstorageDecryption(userStorage, user_salt));


      if (this.userStorage.body.accessToken) {
          window.location.href = environment.frontend_url+'/chat-room' + '?msg=' + environment.unauthorised_msg;
         
      } else {
          this.isLoggedIn = false;
          //window.location.href = environment.frontend_url + '?msg=' + environment.unauthorised_msg;
      }
    } else {
        this.isLoggedIn = false;
        //window.location.href = environment.frontend_url + '?msg=' + environment.unauthorised_msg;
    }
      
  }

  
  loginSubmit(data:any) {
    
    console.log(data);
    
    // this.spinner.show();

    this.submissionArray = {'email':data.email, 'password':data.password};
    // tslint:disable-next-line:max-line-length
    
    this.submissionRequest = this.submissionArray ;

    this.authService.login(this.submissionRequest).subscribe({
      complete: () => { 
        console.log("We are here");
      },
      error: (err) => { 
        console.log(err.error.error);
       // window.location.href = environment.frontend_url + '?msg=' + environment.unauthorised_msg;
      },
      next: (data: any) => { 
        this.commService.setSession('user',data );
        this.router.navigate(['/chat-room']);
      } 
    });


    // this.authService.login(this.submissionRequest).subscribe((result: any) => {
      
    //    // const result = JSON.parse(data);

       
        
    //     if (result.status === 200) {
    //         //this.responseData =  result.responseDetails;
    //         this.commService.setSession('user',result );
    //         this.router.navigate(['/chat-room']);
    //         // this.spinner.hide();
    //         //this.toastr.success(result.responseDetails, '');
    //     } else if (result.status === 401) {
    //             // this.spinner.hide();
    //             this.responseData = result.responseDetails;
    //             //this.toastr.error(result.responseDetails, '');
            
    //     } else {
    //         this.responseData = result.responseDetails;
    //         // this.spinner.hide();
    //         //this.toastr.error(result.responseDetails, '');
    //         window.location.href = environment.frontend_url + '?msg=' + environment.unauthorised_msg;
    //     }
    // }, (err: HttpErrorResponse) => {
    //   console.log(err.error);
    // }
    // );

  }

}
