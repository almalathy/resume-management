import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeFormsComponent } from './resume-forms/resume-forms.component';
import { ResumeSsearchComponent } from './resume-ssearch/resume-ssearch.component'; // 👈 import the search component

const routes: Routes = [
  { path: '', component: ResumeFormsComponent },  // Home page for form
  { path: 'search', component: ResumeSsearchComponent }, // 👈 Search page route
  { path: '**', redirectTo: '' } // wildcard route to redirect unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
