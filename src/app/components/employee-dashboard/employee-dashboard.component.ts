import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;

  employeeObj: EmployeeModel = new EmployeeModel(); 

  employeeInfo !: any;

  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      phone: [''],
      salary: ['']
    });
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeData(){
    this.employeeObj.firstname = this.formValue.value.firstname;
    this.employeeObj.lastname = this.formValue.value.lastname;
    this.employeeObj.email = this.formValue.value.email;
    this.employeeObj.phone = this.formValue.value.phone;
    this.employeeObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeObj).subscribe((res: any) => {
      return console.log(res);
      this.formValue.reset();
      let closeModel = document.getElementById('close');
      closeModel?.click();
      this.getAllEmployee();
    }, 
    
    err => console.log('something went wrong')); 
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe((res) => {
      this.employeeInfo = res;
    });
  }

  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id).subscribe((res) => {
      alert("Employee Successfully Removed");
      this.getAllEmployee();
    });
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;

    this.employeeObj.id = row.id;
    this.formValue.controls['firstname'].setValue(row.firstname)
    this.formValue.controls['lastname'].setValue(row.lastname)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['phone'].setValue(row.phone)
    this.formValue.controls['salary'].setValue(row.salary)
  }

  updateEmployeeData(){
    this.employeeObj.firstname = this.formValue.value.firstname;
    this.employeeObj.lastname = this.formValue.value.lastname;
    this.employeeObj.email = this.formValue.value.email;
    this.employeeObj.phone = this.formValue.value.phone;
    this.employeeObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeObj, this.employeeObj.id)
    .subscribe((res: any) => {
      alert('Employee Data Updated');
      this.formValue.reset();
      let closeModel = document.getElementById('close');
      closeModel?.click();
      this.getAllEmployee();
    });
  }

}
