import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraceViewComponent } from './trace-view.component';

const routes: Routes = [
  {
    path: "", component: TraceViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraceViewRoutingModule { }
