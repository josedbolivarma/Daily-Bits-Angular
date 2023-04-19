import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  id:string = "";
  questionsLength$: Observable<number>;
  currentQuestionIndex$: Observable<number>;
  showResults$: Observable<boolean>; 
  correctAnswerCount$: Observable<number>;

  constructor(
    private quizService: QuizService
  ) {
    this.questionsLength$ = this.quizService.state$.pipe(map(state => state.questions.length))
    
    this.currentQuestionIndex$ = this.quizService.state$.pipe(
      map(state => state.currentQuestionIndex + 1)
    );

    this.showResults$ = this.quizService.state$.pipe(
      map(state => state.showResults)
    );

    this.correctAnswerCount$ = this.quizService.state$.pipe(
      map(state => state.correctAnswerCount)
    );
  }

  nextQuestion(): void {
    this.quizService.nextQuestion();
  }

  restart(): void {
    this.quizService.restart();
  }

}
