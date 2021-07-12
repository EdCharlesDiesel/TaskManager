import { PageIndexModel } from './../../../models/pageIndexModel';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskStatus } from '../../../models/task-status';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskStatusesService } from '../../../services/task-statuses.service';
import { FilterPipe } from '../../../pipes/filter.pipe';
import * as $ from "jquery";

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {
  //Objects for Holding Model Data
  taskStatuses: TaskStatus[] = [];
  showLoading = true;
  deleteTaskStatus: any;
  //Objects for delete
  editIndex = 0;
  deleteIndex = 0;

  //Properties for Searching
  searchBy = "taskStatusName";
  searchText = "";


  //Properties for Paging
  currentPageIndex = 0;
  pages: PageIndexModel[] = [];
  pageSize = 7;
  pageIndex = 0;

  //Properties for Sorting
  sortBy = "taskStatusName";
  sortOrder = "ASC";

  //Reactive Forms
  newForm: FormGroup | any;
  editForm: FormGroup | any;

  //Autofocus TextBoxes
  @ViewChild("defaultTextBox_New") defaultTextBox_New: ElementRef | any;
  @ViewChild("defaultTextBox_Edit") defaultTextBox_Edit: ElementRef | any;

  //Constructor
  constructor(private taskStatusesService: TaskStatusesService, private formBuilder: FormBuilder) {
    this.deleteTaskStatus = new TaskStatus();
  }

  ngOnInit(): void {
    //Get data from database
    this.taskStatusesService.getTaskStatuses().subscribe(
      (response: TaskStatus[]) => {
        this.taskStatuses = response;
        this.showLoading = false;
        this.calculateNoOfPages();
      }
    );

    //Create newForm
    this.newForm = this.formBuilder.group({
      taskStatusID: this.formBuilder.control(null),
      taskStatusName: this.formBuilder.control(null, [Validators.required])
    });

    //Create editForm
    this.editForm = this.formBuilder.group({
      taskStatusID: this.formBuilder.control(null),
      taskStatusName: this.formBuilder.control(null, [Validators.required])
    });
  }

  calculateNoOfPages(): void {
    //Get no. of Pages
    const filterPipe = new FilterPipe();
    const noOfPages = Math.ceil(filterPipe.transform(this.taskStatuses, this.searchBy, this.searchText).length / this.pageSize);
    this.pages = [];

    //Generate pages
    for (let h = 0; h < noOfPages; h++) {
      this.pages.push({ pageIndex: h });
    }

    this.currentPageIndex = 0;
  }

  onPageIndexClicked(index: number): void {
    //Set currentPageIndex
    this.pageIndex = index;
    if (index >= 0 && index < this.pages.length) {
      this.currentPageIndex = this.pageIndex;
    }
  }

  onNewClick(): void {
    //reset the newForm
    this.newForm.reset({ taskStatusID: 0 });
    setTimeout(() => {
      //Focus the TaskStatus textbox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);
  }

  onSaveClick(): void {
    if (this.newForm.valid) {
      //Invoke the REST-API call
      this.taskStatusesService.insertTaskStatus(this.newForm.value).subscribe((response) => {
        //Add Response to Grid
        const p: TaskStatus = new TaskStatus();
        p.taskStatusID = response.taskStatusID;
        p.taskStatusName = response.taskStatusName;
        this.taskStatuses.push(p);

        //Reset the newForm
        this.newForm.reset();
        $("#newTaskStatusFormCancel").trigger("click");
        this.calculateNoOfPages();

        this.calculateNoOfPages();
      }, (error) => {
        console.log(error);
      });
    }
  }

  onEditClick(taskStatus: TaskStatus): void {
    //Reset the editForm
    this.editForm.reset();
    setTimeout(() => {
      this.editForm.patchValue(taskStatus);
      this.editIndex = this.taskStatuses.indexOf(taskStatus);

      //Focus the TaskStatus textbox in editForm
      this.defaultTextBox_Edit.nativeElement.focus();
    }, 100);
  }

  onUpdateClick(): void {
    if (this.editForm.valid) {
      //Invoke the REST-API call
      this.taskStatusesService.updateTaskStatus(this.editForm.value).subscribe((response: TaskStatus) => {
        //Update the response in Grid
        this.taskStatuses[this.editIndex] = response;

        //Reset the editForm
        this.editForm.reset();
        $("#editTaskStatusFormCancel").trigger("click");
      },
        (error) => {
          console.log(error);
        });
    }
  }

  onDeleteClick(taskStatus: TaskStatus): void {
    //Set data into deleteTaskStatus
    this.deleteTaskStatus.taskStatusID = taskStatus.taskStatusID;
    this.deleteTaskStatus.taskStatusName = taskStatus.taskStatusName;
    this.deleteIndex = this.taskStatuses.indexOf(taskStatus);
  }

  ondeleteConfirmClick(): void {
    //Invoke the REST-API call
    this.taskStatusesService.deleteTaskStatus(this.deleteTaskStatus.taskStatusID).subscribe(
      () => {
        //delete object in Grid
        this.taskStatuses.splice(this.deleteIndex, 1);

        //Clear deleteCountry
        this.deleteTaskStatus.taskStatusID = 0;
        this.deleteTaskStatus.taskStatusName = '';

        //Recall the calculateNoOfPages
        this.calculateNoOfPages();
      },
      (error: unknown) => {
        console.log(error);
      });
  }



  onSearchTextChange(): void {
    this.calculateNoOfPages();
  }
}

