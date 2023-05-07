import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {AsideBarComponent} from './components/aside-bar/aside-bar.component';
import {MainContentComponent} from './components/main-content/main-content.component';
import {FooterComponent} from './components/footer/footer.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ForbiddenComponent} from './components/forbidden/forbidden.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProjectAddComponent} from './components/project/project-add/project-add.component';
import {ProjectListComponent} from './components/project/project-list/project-list.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthInterceptor} from './auth/auth.interceptor';
import {UserService} from './services/user.service';
//TOASTR NOTIFICATION
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {ProjectDetailComponent} from './components/project/project-detail/project-detail.component';
import {PatientUpsertComponent} from './components/patient/patient-upsert/patient-upsert.component';
import {PatientListComponent} from './components/patient/patient-list/patient-list.component';
import {UserUpsertComponent} from './components/user/user-upsert/user-upsert.component';
import {UserListComponent} from './components/user/user-list/user-list.component';

//select2
import {Select2Module} from 'ng-select2-component';
import {RequestListComponent} from './components/request/request-list/request-list.component';
import {RequestUpsertComponent} from './components/request/request-upsert/request-upsert.component';
import {AccountListComponent} from './components/account/account-list/account-list.component';
import {AccountManagerComponent} from './components/account/account-manager/account-manager.component';
import {CaisseComponent} from './components/caisse/caisse.component';


const routes: Routes = [
  //ACCOUNT
  { path: 'account', component: AccountListComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },
  { path: 'account/manager/:accountId', component: AccountManagerComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN', 'ROLE_FUNDER']} },
  { path: 'caisse', component: CaisseComponent , canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']}},


  //REQUEST
  { path: 'request', component: RequestListComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN', 'ROLE_FUNDER']} },
  { path: 'request/upsert/:id', component: RequestUpsertComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },
  { path: 'request/upsert', component: RequestUpsertComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },

  //PATIENT
  { path: 'patient/upsert/:id', component: PatientUpsertComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },
  { path: 'patient/upsert', component: PatientUpsertComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },
  { path: 'patient', component: PatientListComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },

  //PROJECT
  { path: 'project/upsert', component: ProjectAddComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },
  { path: 'project/upsert/:id', component: ProjectAddComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },
  { path: 'project/detail/:id', component: ProjectDetailComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN', 'ROLE_FUNDER']} },
  { path: 'project', component: ProjectListComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN', 'ROLE_FUNDER']} },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },

  //USER
  { path: 'user/upsert', component: UserUpsertComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },
  { path: 'user/upsert/:id', component: UserUpsertComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },
  { path: 'user', component: UserListComponent, canActivate : [AuthGuard], data : {roles:['ROLE_ADMIN']} },

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
    ProjectAddComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    PatientUpsertComponent,
    PatientListComponent,
    UserUpsertComponent,
    UserListComponent,
    RequestListComponent,
    RequestUpsertComponent,
    AccountListComponent,
    AccountManagerComponent,
    CaisseComponent
  ],

  imports: [
    Select2Module,
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
