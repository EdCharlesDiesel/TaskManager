import { PageIndexModel } from './../../../models/pageIndexModel';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { Project } from '../../../models/project';
import { ClientLocation } from '../../../models/client-location';
import { ClientLocationsService } from '../../../services/client-locations.service';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { ProjectComponent } from '../project/project.component';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  clientLocations: Observable<ClientLocation[]> | any;
  showLoading = true;

  newProject: Project = new Project();
  editProject: Project = new Project();
  editIndex = 0;
  deleteProject: Project;
  deleteIndex = 0;
  searchBy = 'projectName';
  searchText = '';

  currentPageIndex = 0;
  pages:PageIndexModel[] = [];
  pageSize = 3;

  @ViewChild('newForm') newForm: NgForm | any;
  @ViewChild('editForm') editForm: NgForm | any;

  constructor(private projectsService: ProjectsService, private clientLocationsService: ClientLocationsService) {
    this.deleteProject = new Project;
  }

  ngOnInit(): void {
    this.projectsService.getAllProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
        this.showLoading = false;

        this.calculateNoOfPages();
      }
    );

    this.clientLocations = this.clientLocationsService.getClientLocations();
  }

  calculateNoOfPages() : void{
    const filterPipe = new FilterPipe();
    const resultProjects = filterPipe.transform(this.projects, this.searchBy, this.searchText);
    const noOfPages = Math.ceil(resultProjects.length / this.pageSize);

    this.pages = [];
    for (let i = 0; i < noOfPages; i++) {
      this.pages.push({ pageIndex: i });
    }

    this.currentPageIndex = 0;
  }

  isAllChecked = false;

  @ViewChildren('prj') projs: QueryList<ProjectComponent> | any;

  isAllCheckedChange(): void {
    const proj = this.projs.toArray();
    for (let i = 0; i < proj.length; i++) {
      proj[i].isAllCheckedChange(this.isAllChecked);
    }
  }

  @ViewChild('prjID') prjID: ElementRef| any;

  onNewClick(): void {
    this.newForm.resetForm();
    setTimeout(() => {
      this.prjID.nativeElement.focus();
    }, 100);
  }

  onSaveClick() : void{
    if (this.newForm.valid) {
      this.newProject.clientLocation.clientLocationID = 0;
      this.projectsService.insertProject(this.newProject).subscribe((response) => {
        //Add Project to Grid
        const p: Project = new Project();
        p.projectID = response.projectID;
        p.projectName = response.projectName;
        p.dateOfStart = response.dateOfStart;
        p.teamSize = response.teamSize;
        p.clientLocation = response.clientLocation;
        p.active = response.active;
        p.clientLocationID = response.clientLocationID;
        p.status = response.status;
        this.projects.push(p);

        //Clear New Project Dialog - TextBoxes
        this.newProject.projectID = 0;
        this.newProject.projectName = '';
        this.newProject.dateOfStart = '';
        this.newProject.teamSize = 0;
        this.newProject.active = false;
        this.newProject.clientLocationID = 0;
        this.newProject.status = '';

        $('#newFormCancel').trigger('click');
        this.calculateNoOfPages();
      }, (error) => {
        console.log(error);
      });
    }
  }

  onEditClick(index: number) : void{
    this.editForm.resetForm();
    setTimeout(() => {
      this.editProject.projectID = this.projects[index].projectID;
      this.editProject.projectName = this.projects[index].projectName;
      this.editProject.dateOfStart = this.projects[index].dateOfStart.split('/').reverse().join('-'); //yyyy-MM-dd
      this.editProject.teamSize = this.projects[index].teamSize;
      this.editProject.active = this.projects[index].active;
      this.editProject.clientLocationID = this.projects[index].clientLocationID;
      this.editProject.clientLocation = this.projects[index].clientLocation;
      this.editProject.status = this.projects[index].status;
      this.editIndex = index;
    }, 100);
  }

  onUpdateClick(): void {
    if (this.editForm.valid) {
      this.projectsService.updateProject(this.editProject).subscribe((response: Project) => {
        const p: Project = new Project();
        p.projectID = response.projectID;
        p.projectName = response.projectName;
        p.dateOfStart = response.dateOfStart;
        p.teamSize = response.teamSize;
        p.clientLocation = response.clientLocation;
        p.active = response.active;
        p.clientLocationID = response.clientLocationID;
        p.status = response.status;
        this.projects[this.editIndex] = p;

        this.editProject.projectID = 0;
        this.editProject.projectName = '';
        this.editProject.dateOfStart = '';
        this.editProject.teamSize = 0;
        this.newProject.active = false;
        this.newProject.clientLocationID = 0;
        this.newProject.status = '';

        $('#editFormCancel').trigger('click');
      },
        (error) => {
          console.log(error);
        });
    }
  }

  onDeleteClick(index: number) : void{
    this.deleteIndex = index;
    this.deleteProject.projectID = this.projects[index].projectID;
    this.deleteProject.projectName = this.projects[index].projectName;
    this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
    this.deleteProject.teamSize = this.projects[index].teamSize;
  }

  onDeleteConfirmClick() : void{
    this.projectsService.deleteProject(this.deleteProject.projectID).subscribe(
      () => {
        this.projects.splice(this.deleteIndex, 1);
        this.deleteProject.projectID = 0;
        this.deleteProject.projectName = '';
        this.deleteProject.teamSize = 0;
        this.deleteProject.dateOfStart = '';

        this.calculateNoOfPages();
      },
      (error: unknown) => {
        console.log(error);
      });
  }

  onSearchClick(): void {
    // this.projectsService.SearchProjects(this.searchBy, this.searchText).subscribe(
    //   (response: Project[]) =>
    //   {
    //     this.projects = response;
    //   },
    //   (error) =>
    //   {
    //     console.log(error);
    //   });
  }

  onSearchTextKeyup(): void {
    this.calculateNoOfPages();
  }

  onHideShowDetails() : void{
    this.projectsService.toggleDetails();
  }

  onPageIndexClicked(pageIndex: number) : void{
    this.currentPageIndex = pageIndex;
  }
}
