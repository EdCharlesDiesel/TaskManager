import { Project } from './project';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let productService: ProjectsService, mockHttp;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['getAllProjects']);
    productService = new ProjectsService(mockHttp);
  });

  xit('should be created', () => {
    expect(productService).toBeTruthy();
  });

  xit('should get all projects', () => {
    const expected: Project[] = [
      {
      projectId: '00000000-0000-0000-0000-000000000000',
      projectName: 'A',
      dateOfStart: new Date,
      teamSize: '15'
    }]

     productService.getAllProjects().subscribe(data => {
       expect(data).toEqual(expected);
     });
  });
});
