import { Project } from './project';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let productService: ProjectsService, mockHttp;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['getAllProjects']);
    productService = new ProjectsService(mockHttp);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  xit('should get all projects', () => {
    const expected: Project[] = [{
      productId: '00000000-0000-0000-0000-000000000000',
      productName: 'A',
      dateOfStart: new Date,
      teamSize: '15'
    }]

     productService.getAllProjects().subscribe(data => {
       expect(data).toEqual(expected);
     });
  });
});
