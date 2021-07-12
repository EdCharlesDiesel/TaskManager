import { PageIndexModel } from './../../../models/pageIndexModel';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskPriority } from '../../../models/task-priority';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskPrioritiesService } from '../../../services/task-priorities.service';
import { FilterPipe } from '../../../pipes/filter.pipe';
import * as $ from 'jquery';

@Component({
  selector: 'app-task-priorities',
  templateUrl: './task-priorities.component.html',
  styleUrls: ['./task-priorities.component.scss']
})
export class TaskPrioritiesComponent implements OnInit {
  //Objects for Holding Model Data
  taskPriorities: TaskPriority[] = [];
  showLoading = true;

  //Objects for delete
  deleteTaskPriority: TaskPriority = new TaskPriority();
  editIndex = 0;
  deleteIndex = 0;

  //Properties for Searching
  searchBy = 'taskPriorityName';
  searchText = '';

  //Properties for Paging
  currentPageIndex = 0;
  pages: PageIndexModel[] = [];
  pageSize = 7;

  //Properties for Sorting
  sortBy = 'taskPriorityName';
  sortOrder = 'ASC';

  //Reactive Forms
  newForm: FormGroup | any;
  editForm: FormGroup | any;

  //Autofocus TextBoxes
  @ViewChild('defaultTextBox_New') defaultTextBox_New: ElementRef | any;
  @ViewChild('defaultTextBox_Edit') defaultTextBox_Edit: ElementRef | any;

  //Constructor
  constructor(private taskPrioritiesService: TaskPrioritiesService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    //Get data from database
    this.taskPrioritiesService.getTaskPriorities().subscribe(
      (response: TaskPriority[]) => {
        this.taskPriorities = response;
        this.showLoading = false;
        this.calculateNoOfPages();
      }
    );

    //Create newForm
    this.newForm = this.formBuilder.group({
      taskPriorityID: this.formBuilder.control(null),
      taskPriorityName: this.formBuilder.control(null, [Validators.required])
    });

    //Create editForm
    this.editForm = this.formBuilder.group({
      taskPriorityID: this.formBuilder.control(null),
      taskPriorityName: this.formBuilder.control(null, [Validators.required])
    });
  }

  calculateNoOfPages(): void {
    //Get no. of Pages
    const filterPipe = new FilterPipe();
    const noOfPages = Math.ceil(filterPipe.transform(this.taskPriorities, this.searchBy, this.searchText).length / this.pageSize);
    this.pages = [];

    //Generate pages
    for (let i = 0; i < noOfPages; i++) {
      this.pages.push({ pageIndex: 1 });
    }

    this.currentPageIndex = 0;
  }

  onPageIndexClicked(index: number): void {
    //Set currentPageIndex
    if (index >= 0 && index < this.pages.length) {
      this.currentPageIndex = index;
    }
  }

  onNewClick(): void {
    //reset the newForm
    this.newForm.reset({ taskPriorityID: 0 });
    setTimeout(() => {
      //Focus the TaskPriority textbox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);
  }

  onSaveClick(): void {
    if (this.newForm.valid) {
      //Invoke the REST-API call
      this.taskPrioritiesService.insertTaskPriority(this.newForm.value).subscribe((response) => {
        //Add Response to Grid
        const p: TaskPriority = new TaskPriority();
        p.taskPriorityID = response.taskPriorityID;
        p.taskPriorityName = response.taskPriorityName;
        this.taskPriorities.push(p);

        //Reset the newForm
        this.newForm.reset();
        $('#newTaskPriorityFormCancel').trigger('click');
        this.calculateNoOfPages();

        this.calculateNoOfPages();
      }, (error) => {
        console.log(error);
      });
    }
  }

  onEditClick(taskPriority: TaskPriority): void {
    //Reset the editForm
    this.editForm.reset();
    setTimeout(() => {
      //Set data into editForm
      this.editForm.patchValue(taskPriority);
      this.editIndex = this.taskPriorities.indexOf(taskPriority);

      //Focus the TaskPriority textbox in editForm
      this.defaultTextBox_Edit.nativeElement.focus();
    }, 100);
  }

  onUpdateClick(): void {
    if (this.editForm.valid) {
      //Invoke the REST-API call
      this.taskPrioritiesService.updateTaskPriority(this.editForm.value).subscribe((response: TaskPriority) => {
        //Update the response in Grid
        this.taskPriorities[this.editIndex] = response;

        //Reset the editForm
        this.editForm.reset();
        $('#editTaskPriorityFormCancel').trigger('click');
      },
        (error) => {
          console.log(error);
        });
    }
  }

  onDeleteClick(taskPriority: TaskPriority): void {
    //Set data into deleteTaskPriority
    this.deleteTaskPriority.taskPriorityID = taskPriority.taskPriorityID;
    this.deleteTaskPriority.taskPriorityName = taskPriority.taskPriorityName;
    this.deleteIndex = this.taskPriorities.indexOf(taskPriority);
  }

  onDeleteConfirmClick(): void {
    //Invoke the REST-API call
    this.taskPrioritiesService.deleteTaskPriority(this.deleteTaskPriority.taskPriorityID).subscribe(
      () => {
        //delete object in Grid
        this.taskPriorities.splice(this.deleteIndex, 1);

        //Clear deleteCountry
        this.deleteTaskPriority.taskPriorityID = 0;
        this.deleteTaskPriority.taskPriorityName = '';

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
