import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Project} from 'src/app/common/project';
import {ProjectService} from 'src/app/services/project.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent {

  projectFromGroup!: FormGroup;
  projectToUpdate: Project = new Project();
  btnValue = 'Save Project';
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.formGroupInit();
      this.initProjectToUpdate();
    });
  }

  initProjectToUpdate() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = +this.route.snapshot.paramMap.get('id')!;
      this.projectService.getProject(this.id).subscribe(
        data => {
          this.projectToUpdate = data;
          this.settingFields(this.projectToUpdate);
          //console.log("data = " + JSON.stringify(this.projectToUpdate));
        }
      );
      this.btnValue = "Update Project";
    }
  }


  formGroupInit() {
    this.projectFromGroup = this.formBuilder.group({
      projectInfo: this.formBuilder.group({
        inputName: new FormControl('', [Validators.required]),
        inputDescription: new FormControl(''),
        inputStatus: new FormControl('', [Validators.required]),
        inputProjectLeader: new FormControl('', [Validators.required]),
        inputEstimatedBudget: new FormControl('', [Validators.required]),
        inputSpentBudget: new FormControl('', [Validators.required]),
        inputEstimatedDuration: new FormControl('', [Validators.required])
      })
    });
  }

  settingFields(p: Project) {
    this.inputName?.setValue(p.projectName);
    this.inputDescription?.setValue(p.projectDescription);
    this.inputStatus?.setValue(p.projectStatus);
    this.inputProjectLeader?.setValue(p.projectLeader);
    this.inputEstimatedBudget?.setValue(p.estimatedBudget);
    this.inputSpentBudget?.setValue(p.totalAmountSpent);
    this.inputEstimatedDuration?.setValue(p.duration);
  }

  //GETTERS
  get inputName() {
    return this.projectFromGroup.get('projectInfo.inputName');
  }

  get inputDescription() {
    return this.projectFromGroup.get('projectInfo.inputDescription');
  }

  get inputStatus() {
    return this.projectFromGroup.get('projectInfo.inputStatus');
  }

  get inputProjectLeader() {
    return this.projectFromGroup.get('projectInfo.inputProjectLeader');
  }

  get inputEstimatedBudget() {
    return this.projectFromGroup.get('projectInfo.inputEstimatedBudget');
  }

  get inputSpentBudget() {
    return this.projectFromGroup.get('projectInfo.inputSpentBudget');
  }

  get inputEstimatedDuration() {
    return this.projectFromGroup.get('projectInfo.inputEstimatedDuration');
  }

  //VALIDATORS
  inputNameValid(): boolean {
    return this.inputName?.invalid && (this.inputName?.dirty || this.inputName?.touched) ? true : false;
  }

  inputStatusValid(): boolean {
    return this.inputStatus?.invalid && (this.inputStatus?.dirty || this.inputStatus?.touched) ? true : false;
  }

  inputProjectLeaderValid(): boolean {
    return this.inputProjectLeader?.invalid && (this.inputProjectLeader?.dirty || this.inputProjectLeader?.touched) ? true : false;
  }

  inputEstimatedBudgetValid(): boolean {
    return this.inputEstimatedBudget?.invalid && (this.inputEstimatedBudget?.dirty || this.inputEstimatedBudget?.touched) ? true : false;
  }

  inputSpentBudgetValid(): boolean {
    return this.inputSpentBudget?.invalid && (this.inputSpentBudget?.dirty || this.inputSpentBudget?.touched) ? true : false;
  }

  inputEstimatedDurationValid(): boolean {
    return this.inputEstimatedDuration?.invalid && (this.inputEstimatedDuration?.dirty || this.inputEstimatedDuration?.touched) ? true : false;
  }

  upsertProject() {
    let p = new Project();
    p.projectName = this.inputName?.value;
    p.projectDescription = this.inputDescription?.value;
    p.projectStatus = this.inputStatus?.value;
    p.projectLeader = this.inputProjectLeader?.value;
    p.estimatedBudget = this.inputEstimatedBudget?.value;
    p.totalAmountSpent = this.inputSpentBudget?.value;
    p.duration = this.inputEstimatedDuration?.value;

    //add
    if (this.btnValue == 'Save Project') {
      this.projectService.addPoject(p).subscribe(
        data => {
          this.toastr.success("Project Saved Successfully !");
          this.router.navigate(['/project']);
        }, error => {
          alert("There was an error: " + error.message());
        }
      );
    }

    //update
    if (this.btnValue == 'Update Project') {
      p.id = this.projectToUpdate.id;
      this.projectService.updateProject(p).subscribe(
        data => {
          this.toastr.success("Project Updated Successfully !");
          this.router.navigate(['/project']);
        },
        error => {
          this.toastr.error("Error Updating + " + error.message());
        }
      );
    }

  }

  onSubmit() {
    if (this.projectFromGroup.invalid) {
      this.projectFromGroup.markAllAsTouched();
      this.toastr.warning("Please fill the form properly!");
      return;
    }

    this.upsertProject();

    this.projectFromGroup.reset();

  }
}
