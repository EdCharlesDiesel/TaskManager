import { Component, OnInit } from '@angular/core';
import { Project } from './project';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  newProject: Project = new Project();
  editProject: Project = new Project();
  editIndex: number = 0;

  constructor(private projectSvc: ProjectsService) { }

  ngOnInit(): void {
    this.projectSvc.getAllProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
        console.log(response);
      })
  }

  onSaveClick() {
    this.projectSvc.addProject(this.newProject).subscribe((response: any) => {
      //Add projets to Grid
      let project: Project = new Project();
      project.projectId = response.projectId;
      project.projectName = response.projectName;
      project.dateOfStart = response.dateOfStart;
      project.teamSize = response.teamSize;
      this.projects.push(this.newProject);

      // Clear new project dialog
      this.newProject.projectId = null;
      this.newProject.projectName = null;
      this.newProject.dateOfStart = null;
      this.newProject.teamSize = null;
    }, (error) => {
      console.log(error)
    });
  }

  onEditClick(event: any, index: number) {
    this.editProject.projectId = this.projects[index].projectId;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.dateOfStart = this.projects[index].dateOfStart;
    this.editProject.teamSize = this.projects[index].teamSize;
  }
  onUpdateClick() {
    this.projectSvc.updateProjectDetails(this.editProject).subscribe((response: any) => {
      let project: Project = new Project();
      project.projectId = response.productId;
      project.projectName = response.projectName;
      project.dateOfStart = response.dateOfStart;
      project.teamSize = response.teamSize;

      this.projects[this.editIndex] = project;

      this.editProject.projectId = null;
      this.editProject.projectName = null;
      this.editProject.dateOfStart = null
      this.editProject.teamSize = null
    },
      () => { }
    );
  }
}
