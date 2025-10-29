import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-resume-ssearch',
  templateUrl: './resume-ssearch.component.html',
  styleUrls: ['./resume-ssearch.component.scss']
})
export class ResumeSsearchComponent {
  searchQuery: string = '';
  results: any[] = [];
  searchDone: boolean = false;
  editMode: boolean = false;
  editableResume: any = null;

  constructor(private http: HttpClient) {}

  search() {
    if (!this.searchQuery.trim()) return;

    this.http.get<any[]>(`http://localhost:3000/api/resumes/search?query=${this.searchQuery}`)
      .subscribe({
        next: data => {
          this.results = data;
          this.searchDone = true;
          
        },
        error: err => {
          console.error("Search error:", err);
        }
      });
  }
   // 🧾 Edit resume - show inline editable form
  editResume(resume: any) {
    this.editMode = true;
    this.editableResume = { ...resume };
  }

 saveEdit() {
  if (!this.editableResume) return;

  this.http.put(`http://localhost:3000/api/resumes/${this.editableResume.id}`, this.editableResume)
    .subscribe({
      next: res => {
        Swal.fire({
          title: '✅ Success!',
          text: 'Resume updated successfully!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then(() => {
          this.editMode = false;
          this.search(); // Refresh list
        });
      },
      error: err => {
        console.error("Update error:", err);
        Swal.fire({
          title: '❌ Error!',
          text: 'Failed to update resume. Please try again.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Close'
        });
      }
    });
}


  // ❌ Cancel edit
  cancelEdit() {
    this.editMode = false;
    this.editableResume = null;
  }


  deleteResume(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This resume will be permanently deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.http.delete(`http://localhost:3000/api/resumes/${id}`).subscribe(() => {
        Swal.fire('Deleted!', 'Resume has been deleted.', 'success');
        this.search(); // refresh the list
      });
    }
  });
}


  downloadResume(resume: any) {
    const doc = new jsPDF();
    const content = `
Name: ${resume.name}
Email: ${resume.email}
Job Title: ${resume.jobTitle}
Experience: ${resume.experience} years
Skills: ${resume.skills}
Phone: ${resume.phone}
Current Salary: ${resume.currentSalary}
Expected Salary: ${resume.expectedSalary}
Applied Position: ${resume.appliedPosition}
Nationality: ${resume.nationality}
    `;
    doc.text(content, 10, 10);
    doc.save(`${resume.name}_Resume.pdf`);
  }
}
