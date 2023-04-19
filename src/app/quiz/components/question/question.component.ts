import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Observable, Subscription, map } from 'rxjs';
import { QuestionInterface } from '../../types/question.interface';
import { AnswerType } from '../../types/answer.type';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  question$: Observable<QuestionInterface>;
  answers$: Observable<AnswerType[]>;
  // correctAnswer$: Observable<AnswerType>;
  // currentAnswer$: Observable<AnswerType|null>;
  correctAnswer: AnswerType|null = null;
  currentAnswer: AnswerType|null = null;
  correctAnswerSubscription!: Subscription;
  currentAnswerSubscription!: Subscription;

  constructor(
    private quizService: QuizService
  ) {
    this.question$ = this.quizService.state$.pipe(
      map(state => state.questions[state.currentQuestionIndex])
    );
    this.answers$ = this.quizService.state$.pipe(
      map(state => state.answers)
    );
  };

  ngOnDestroy(): void {
    this.correctAnswerSubscription.unsubscribe();
    this.currentAnswerSubscription.unsubscribe();
  };
  
  ngOnInit(): void {
    this.correctAnswerSubscription = this.correctAnswerSubscription = this.question$.pipe(
      map(question => question.correct_answer )
    ).subscribe(correctAnswer => this.correctAnswer = correctAnswer);

    this.currentAnswerSubscription = this.currentAnswerSubscription = this.quizService.state$.pipe(
      map(state => state.currentAnswer )
    ).subscribe(currentAnswer => this.currentAnswer = currentAnswer);
  };

  selectAnswer(answer: AnswerType): void {
    this.quizService.selectAnswer(answer);
  };

  isWrongAnswer(answer: AnswerType): boolean {
    if (!this.currentAnswer || !this.correctAnswer) {
      return false;
    }

    return (
      this.currentAnswer === answer && this.currentAnswer !== this.correctAnswer
    );

  };

  isCorrectAnswer(answer: AnswerType): boolean {
    if (!this.currentAnswer || !this.correctAnswer) {
      return false;
    }


    return Boolean(this.currentAnswer) && answer === this.correctAnswer;
  };

  isDisabledAnswer(answer: AnswerType): boolean {
    if (!this.currentAnswer || !this.correctAnswer) {
    console.log("No Disabled");

      return false;
    }


    return Boolean(this.currentAnswer);
  };

}
