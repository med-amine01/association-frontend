import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProjectAddComponent } from './components/project/project-add/project-add.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './services/user.service';
//TOASTR NOTIFICATION
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProjectDetailComponent } from './components/project/project-detail/project-detail.component';

const routes: Routes = [
  { path: 'project/upsert', component: ProjectAddComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },
  { path: 'project/upsert/:id', component: ProjectAddComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },
  { path: 'project/detail', component: ProjectDetailComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },
  { path: 'project', component: ProjectListComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'userRegister', component: UserRegisterComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' } //** else of all routes (we can add 404 not found component
]


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AsideBarComponent,
    MainContentComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    ForbiddenComponent,
    UserRegisterComponent,
    ProjectAddComponent,
    ProjectListComponent,
    ProjectDetailComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    //toastr notification
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      timeOut: 3000
    })
  ],
  providers: [
    AuthGuard,
    {
      //interceptor : interceptor will take token from localstorage(in our case) and put it inside header
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    },
    //this is the service that we want to apply our interceptor
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
