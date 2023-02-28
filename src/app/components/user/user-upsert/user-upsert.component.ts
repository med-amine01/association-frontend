import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/common/role';
import { RoleService } from 'src/app/services/role.service';
import { Select2Option, Select2UpdateEvent } from 'ng-select2-component';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent implements OnInit {
  roles: Role[] = [];
  converted: any[] = [];
  data: any[] = [];
  selectedValues: any[]=[];

  userFormGroup!: FormGroup;
  userToUpdate: User = new User();
  btnValue = 'Add User';
  emailId !: string;

  constructor(
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.formGroupInit();
      this.initRoles();
      this.initUserToUpdate();
    });
  }

  initUserToUpdate() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.emailId = this.route.snapshot.paramMap.get('id')!;
      this.userService.getUser(this.emailId).subscribe(
        data => {
          this.userToUpdate = data;
          console.log(this.userToUpdate);
          this.settingFields(this.userToUpdate);
        }
      );
      this.btnValue = "Update User";
    }
  }

  initRoles() {
    this.roleService.getAllRoles().subscribe(
      data => {
        this.roles = data;

        //this will map : 
        // roleName => value
        // roleDescription => label
        this.converted = this.roles.map(option => ({
          value: option.roleName,
          label: option.roleDescription
        }));
        
        //this will set the array "data" to pass it to html <ngselect [data]="data">
        this.data = [{
          label: "Roles",
          options: this.converted
        }]
      }
    )
  }

  formGroupInit() {
    this.userFormGroup = this.formBuilder.group({
      userInfo: this.formBuilder.group({
        inputEmail: new FormControl('', [Validators.required]),
        inputFirstName: new FormControl('', [Validators.required]),
        inputLastName: new FormControl('', [Validators.required]),
        inputPassword: new FormControl('', [Validators.required]),
        inputPhone: new FormControl('', [Validators.required]),
        inputAddress: new FormControl('', [Validators.required]),
        inputRole: new FormControl('', [Validators.required]),
      })
    })
  }

  settingFields(u: User) {
    this.inputEmail?.setValue(u.userEmail);
    this.inputFirstName?.setValue(u.userFirstName);
    this.inputLastName?.setValue(u.userLastName);
    //this.inputPassword?.setValue(u.userPassword);
    this.inputPhone?.setValue(u.phone);
    this.inputAddress?.setValue(u.address);
    //this.inputRole?.setValue(u.roles);
    u.roles.forEach(element => {
      this.selectedValues.push(element.roleName);
    });
    this.inputRole?.setValue(this.selectedValues);
  }

  get inputEmail() { return this.userFormGroup.get('userInfo.inputEmail'); }
  get inputFirstName() { return this.userFormGroup.get('userInfo.inputFirstName'); }
  get inputLastName() { return this.userFormGroup.get('userInfo.inputLastName'); }
  get inputPassword() { return this.userFormGroup.get('userInfo.inputPassword'); }
  get inputPhone() { return this.userFormGroup.get('userInfo.inputPhone'); }
  get inputAddress() { return this.userFormGroup.get('userInfo.inputAddress'); }
  get inputRole() { return this.userFormGroup.get('userInfo.inputRole'); }


  //VALIDATORS
  inputEmailValid(): boolean {
    return this.inputEmail?.invalid && (this.inputEmail?.dirty || this.inputEmail?.touched) ? true : false;
  }
  inputFirstNameValid(): boolean {
    return this.inputFirstName?.invalid && (this.inputFirstName?.dirty || this.inputFirstName?.touched) ? true : false;
  }
  inputLastNameValid(): boolean {
    return this.inputLastName?.invalid && (this.inputLastName?.dirty || this.inputLastName?.touched) ? true : false;
  }
  inputPasswordValid(): boolean {
    return this.inputPassword?.invalid && (this.inputPassword?.dirty || this.inputPassword?.touched) ? true : false;
  }
  inputPhoneValid(): boolean {
    return this.inputPhone?.invalid && (this.inputPhone?.dirty || this.inputPhone?.touched) ? true : false;
  }
  inputAddressValid(): boolean {
    return this.inputAddress?.invalid && (this.inputAddress?.dirty || this.inputAddress?.touched) ? true : false;
  }
  inputRoleValid(): boolean {
    return this.inputRole?.invalid && (this.inputRole?.dirty || this.inputRole?.touched) ? true : false;
  }


  upsertUser() {
    let u = new User();
    u.userEmail = this.inputEmail?.value;
    
    u.userFirstName = this.inputFirstName?.value;
    u.userLastName = this.inputLastName?.value;
    u.phone = this.inputPhone?.value;
    u.address = this.inputAddress?.value;
    // let r : Role[] = [];
    
    // this.inputRole?.value.forEach(element => {
    //   let r1 = new Role();
    //   r1.roleName = element;
    //   r.push(r1);
    // });
    
    // console.log("selectedValues = " + this.selectedValues);
    // const array : Role [] = [];
    // this.selectedValues.forEach(element => {
    //   array.push({roleName : JSON.stringify(element), roleDescription :''})
    // });

    // console.log("array = "+ array);


    let r = new Role();
    r.roleName = "ROLE_ADMIN";
    const arr  : any [] = [] ;
    arr.push(r);

    u.roles = arr;

    const newUser: User = {
      userEmail: "testing@gmail.com",
      userFirstName: '',
      userLastName: '',
      userPassword: '',
      phone: '',
      address: '',
      active: false,
      roles: [{
        roleName: 'ROLE_ADMIN',
        roleDescription: ''
      }],
    };

    //add
    if (this.btnValue == 'Add User') {
      u.userPassword = this.inputPassword?.value;
      console.log(newUser);
      this.userService.addUser(newUser).subscribe(
        data => {
          this.toastr.success("User Added Successfully !");
          this.router.navigate(['/user']);
        }, error => {
          alert("There was an error: " + error.message());
        }
      );
    }

    //update
    if (this.btnValue == 'Update User') {
      //u.userEmail = this.userToUpdate.userEmail;
      console.log(JSON.stringify(u));
      this.userService.updateUser(u).subscribe(
        data => {
          this.toastr.success("User Updated Successfully !");
          this.router.navigate(['/user']);
        },
        error => {
          this.toastr.error("Error Updating + " + error.message());
        }
      );
    }
  }

  onSubmit() {
    // if (this.userFormGroup.invalid) {
    //   if(this.btnValue == "Add User"){
    //     this.userFormGroup.markAllAsTouched();
    //     this.toastr.warning("Please fill the form properly!");
    //     return;
    //   }
    //   else{
    //     this.inputPassword?.clearValidators();
    //   }
    // }


    // this.upsertUser();
    // this.userFormGroup.reset();

    this.upsertUser();

  }

  change(key: string, event: Event) {
    //console.log("changing " + key, event);
  }
  search(text: string) {
    this.data = text
      ? (JSON.parse(JSON.stringify(this.data)) as Select2Option[]).filter(
        option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1,
      )
      : JSON.parse(JSON.stringify(this.data));
  }
  update(key: string, event: Select2UpdateEvent<any>): any {

    //console.log(event.value);
    return event.value;
  }


}
