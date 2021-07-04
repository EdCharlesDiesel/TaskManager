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

  constructor(private projectSvc:ProjectsService) { }

  ngOnInit(): void {
    this.projectSvc.getAllProjects().subscribe(
      (response: Project[]) => {
      this.projects = response;
      console.log(response);
    })
  }

  // add to projects
  
}
