import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = environment.apiUrl; // comes from environment.ts

  constructor(private http: HttpClient) {}

  // Get all resumes
  getResumes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/resumes`);
  }

  // Add a new resume
  addResume(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/resumes`, data);
  }

  // Update resume
  updateResume(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/resumes/${id}`, data);
  }

  // Delete resume
  deleteResume(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/resumes/${id}`);
  }
}

