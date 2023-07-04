import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientTraceViewComponent } from './client-trace-view.component';

const routes: Routes = [
  {
    path: "", component: ClientTraceViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientTraceViewRoutingModule { }
