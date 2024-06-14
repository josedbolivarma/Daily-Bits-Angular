import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Observable, Subscription, distinctUntilChanged, map } from 'rxjs';
import { QuestionInterface } from '../../types/question.interface';
import { AnswerType } from '../../types/answer.type';
import { ActivatedRoute, Params, Router } from '@angular/router';
import dataQuiz from '../../data';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  routeSub!: Params;

  questionsLength$: Observable<number>;
  currentQuestionIndex$: Observable<number>;
  showResults$: Observable<boolean>; 
  correctAnswerCount$: Observable<number>;
  games$: Observable<number>;
  disabled$: Observable<boolean>;

  question$: Observable<QuestionInterface>;
  answers$!: Observable<AnswerType[]>|any;
  correctAnswerSubscription!: Subscription;
  currentAnswerSubscription!: Subscription;
  correctAnswer: AnswerType|null = null;
  currentAnswer: AnswerType|null = null;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
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

    // 
    this.question$ = this.quizService.state$.pipe(
      map(state => state.questions[state.currentQuestionIndex])
    );
    
    this.answers$ = this.quizService.state$.pipe(
      map(state => state.answers)
    );

    this.games$ = this.quizService.state$.pipe(
      map(state => state.games)
    );

    this.disabled$ = this.quizService.disabled$.pipe(
      map(state => state)
    );

  }

  nextQuestion(): void {
    this.quizService.setDisabled(false);
    this.quizService.nextQuestion();
  }

  restart(): void {
    this.quizService.setDisabled(false);
    this.routeSub = this.route.params.subscribe(param => {
      const path = param["id"];
      const quiz = dataQuiz.filter(category => category.name === path)[0].results;
      this.quizService.restart(quiz);
    });
  }


  // Answers
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(param => {
      const path = param["id"];
      const quiz = dataQuiz.filter(category => category.name === path)[0].results;
      this.quizService.loadQuestions(quiz);
    });

    this.correctAnswerSubscription = this.question$.pipe(
      map(question => question.correct_answer )
    ).subscribe(correctAnswer => this.correctAnswer = correctAnswer);

    this.currentAnswerSubscription = this.quizService.state$.pipe(
      map(state => state.currentAnswer )
    ).subscribe(currentAnswer => this.currentAnswer = currentAnswer);

  };

  ngOnDestroy(): void {
    this.correctAnswerSubscription.unsubscribe();
    this.currentAnswerSubscription.unsubscribe();
  };

  completedTest() {
    this.router.navigate(['/']);
  }

}
