import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component.
import { DetectionComponent } from './detection/detection.component';

const routes: Routes = [
  { path: '', component: DetectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
