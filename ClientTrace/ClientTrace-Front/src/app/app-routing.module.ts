import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "",
    loadChildren:() => import("./components/login/login.module").then(m => m.LoginModule)
  },
  {
    path: "homepage",
    loadChildren: () => import("./pages/clientTrace/client-trace-view/client-trace-view.module").then(m => m.ClientTraceViewModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
