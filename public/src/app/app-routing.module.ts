import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { ResultComponent } from './result/result.component';
// import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  // { path: 'new',component: NewComponent },
  { path: 'new',component: NewComponent },
  { path: 'result',component: ResultComponent },
  // { path: 'pets/:id',component: DetailsComponent },
  { path: '',component: HomeComponent },
  // { path: '', pathMatch: 'full', redirectTo: 'pets' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
