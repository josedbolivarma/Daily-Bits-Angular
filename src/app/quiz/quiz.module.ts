import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: QuizComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
    QuestionComponent,
    AnswerComponent,
    QuizComponent
  ],
})
export class QuizModule { }
