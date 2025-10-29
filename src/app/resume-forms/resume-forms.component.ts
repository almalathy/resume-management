
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resume-forms',
  templateUrl: './resume-forms.component.html',
  styleUrls: ['./resume-forms.component.scss']
})
export class ResumeFormsComponent {
  resumeForm: FormGroup;
  successMessage = '';
errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.resumeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', Validators.required],
      experience: [0, [Validators.required, Validators.min(0)]],
      skills: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      currentSalary: [0, Validators.required],
      expectedSalary: [0, Validators.required],
      appliedPosition: ['', Validators.required],
      nationality: ['', Validators.required]
    });
  }

 submitResume() {
  console.log("Submitting:", this.resumeForm.value);

  if (this.resumeForm.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill all required fields correctly!',
    });
    return;
  }

  this.http.post('http://localhost:3000/api/resumes', this.resumeForm.value).subscribe({
    next: res => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Resume submitted successfully!',
        showConfirmButton: false,
        timer: 2000
      });

      this.resumeForm.reset(); // Clear the form
    },
    error: err => {
      console.error("Submit error:", err);

      Swal.fire({
        icon: 'error',
        title: 'Submission Failed!',
        text: err.error.message || 'Error submitting resume.',
      });
    }
  });
}

}
