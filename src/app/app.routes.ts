import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ExamComponent } from './exam/exam.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'admin',component:AdminComponent},
    {path:'exam/:id',component:ExamComponent}
];
