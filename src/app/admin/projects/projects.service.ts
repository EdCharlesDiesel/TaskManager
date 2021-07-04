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

  constructor(private httpClient: HttpClient) { }

  searchProjects(searchBy:string, searchText: string): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.baseURL + searchBy + searchText, { responseType: 'json' });
  }

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.baseURL, { responseType: 'json' });
  }

  addProject(project: Project) {
    return this.httpClient.post(this.baseURL, project, { responseType: 'json' });
  }

  getProjectById(projectId: string) {
    return this.Projects$.pipe(map(Project => Project.find(b => b.projectId === projectId)));
  }

  updateProject(project: Project) {
    return this.httpClient.put(this.baseURL, project, { responseType: 'json' });
  }

  deleteProject(projectId: number) {
    return this.httpClient.delete<string>(this.baseURL + projectId);
  }
}
