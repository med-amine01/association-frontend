import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../common/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private PROJECT_API_URL = 'http://localhost:8090/api/project';
  constructor(private httpClient : HttpClient) { }

  addPoject(project : Project) : Observable<any>{
    return this.httpClient.post<Project>(this.PROJECT_API_URL+"/add",project);
  }

  updateProject(project : Project){
    return this.httpClient.patch<Project>(this.PROJECT_API_URL+"/update",project);
  }

  deleteProject(id:number){
    return this.httpClient.delete<Project>(this.PROJECT_API_URL+"/delete/"+id);
  }

  getAllProjects() : Observable<Project[]>{
    return this.httpClient.get<any>(this.PROJECT_API_URL+"/getall");
  }

  getProject(id: number): Observable<Project>{
    return this.httpClient.get<Project>(this.PROJECT_API_URL+"/"+id);
  }


}

interface GetProjects
{
  _embedded:{
    projects: Project[];
  }
}
