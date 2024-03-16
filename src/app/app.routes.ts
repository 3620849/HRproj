import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ExamComponent } from './exam/exam.component';
import { AdminGuard } from './admin/admin.guard';
import { FormsListComponent } from './admin/forms-list/forms-list.component';
import { FormEditorComponent } from './admin/form-editor/form-editor.component';
import { AnswerComponent } from './admin/answer/answer.component';
import { AnswersListComponent } from './admin/answers-list/answers-list.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'admin',component:AdminComponent, canActivate:[AdminGuard], canActivateChild:[AdminGuard],
        children:[
            {path:'',component:FormsListComponent},
            {path:'forms',component:FormsListComponent},
            {path:'editor',component:FormEditorComponent},
            {path:'editor/:id',component:FormEditorComponent},
            {path:'answers-list/:id',component:AnswersListComponent},
            {path:'answer/:id',component:AnswerComponent}
        ]
        },
    {path:'exam/:id',component:ExamComponent}
];
