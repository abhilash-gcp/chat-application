import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'chat-room', component: ChatRoomComponent },
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);