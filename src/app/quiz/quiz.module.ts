import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { RouterModule, Routes } from '@angular/router';
import { QuizService } from './services/quiz.service';

const routes: Routes = [
 
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  declarations: [
    QuestionComponent,
    AnswerComponent,
    QuizComponent
  ],
  exports: [
    QuizComponent
  ],
  providers: [QuizService]
})
export class QuizModule { }
