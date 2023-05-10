import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  private responseData: any;
  private submissionArray: any;
  private submissionRequest: any;
  private userStorage: any;
  private isLoggedIn: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private commService: CommonService,
  ) { }

  ngOnInit() {
    if (this.commService.getSession('user')) {
      this.userStorage = this.commService.getSession('user');
      //this.userData = JSON.parse(this.commService.localstorageDecryption(userStorage, user_salt));


      if (this.userStorage.body.accessToken) {
          this.isLoggedIn = true;
          this.submissionArray = {'id':this.userStorage.body.id};
          // tslint:disable-next-line:max-line-length
        
          this.userService.getAllUsers(this.submissionArray).subscribe({
            complete: () => { 
              console.log("We are here");
            },
            error: (err) => { 
              console.log(err.error.error);
              //window.location.href = environment.frontend_url + '?msg=' + environment.unauthorised_msg;
            },
            next: (data: any) => { 
              this.commService.setSession('user',data );
              this.router.navigate(['/chat-room']);
            } 
          });

      } else {
          this.isLoggedIn = false;
          //window.location.href = environment.frontend_url + '?msg=' + environment.unauthorised_msg;
      }
    } else {
        this.isLoggedIn = false;
       // window.location.href = environment.frontend_url + '?msg=' + environment.unauthorised_msg;
    }
  }

  loginSubmit(data:any) {
    

  }

}
