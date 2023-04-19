import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/components/quiz/quiz.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "quiz/:id",
    component: QuizComponent
  },
  {
    path: "statistics",
    loadChildren: () => import("./statistics/statistics.module").then(m => m.StatisticsModule)
  },
  // {
  //   path: "**",
  //   redirectTo: "login"
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingRoutingModule { }
