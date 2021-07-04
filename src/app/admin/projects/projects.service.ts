import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  baseURL = 'https://localhost:44349/api/projects/';
  Projects$ = this.getAllProjects().pipe(shareReplay(1));
  //categories$ = this.http.get<Categories[]>(this.baseURL + 'GetCategoriesList').pipe(shareReplay(1));

  constructor(private httpClient: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.baseURL);
  }

  addProject(project:Project) {
    return this.httpClient.post(this.baseURL, project);
  }

  getProjectById(projectId: string) {
    return this.Projects$.pipe(map(Project => Project.find(b => b.projectId === projectId)));
  }

  updateProjectDetails(project:Project) {
    return this.httpClient.put(this.baseURL, project);
  }

  deleteProject(id: number) {
    return this.httpClient.delete(this.baseURL + id);
  }
}
