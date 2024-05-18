import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
 providedIn: 'root'
})
export class GithubService {
 private baseUrl: string = 'https://api.github.com/users';


 constructor(private http: HttpClient) {}


 getUserDetails(username: string): Observable<any> {
   return this.http.get<any>(`${this.baseUrl}/${username}`);
 }


 getRepositories(username: string): Observable<any[]> {
   return this.http.get<any[]>(`${this.baseUrl}/${username}/repos`);
 }
}
