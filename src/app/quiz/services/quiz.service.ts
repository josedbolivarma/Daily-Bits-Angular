import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuizStateInterface } from '../types/quizState.interface';

import { QuestionInterface } from '../types/question.interface';
import { AnswerType } from '../types/answer.type';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  initialState: QuizStateInterface = {
    questions: [],
    currentQuestionIndex: 0,
    showResults: false,
    correctAnswerCount: 0,
    answers: [],
    currentAnswer: null,
    games: 4
  };
  
  state$ = new BehaviorSubject<QuizStateInterface>({ ...this.initialState });
  disabled$ = new BehaviorSubject<boolean>(false);

  setDisabled(state: boolean): void {
    this.disabled$.next(state);
  }

  setState(partialState: Partial<QuizStateInterface>): void {
    this.state$.next({
      ...this.state$.getValue(),
      ...partialState,
    });
  }

  getState(): QuizStateInterface {
    return this.state$.getValue();
  }

  restartGame() {
    this.setState({
      games: this.state$.getValue().games - 1
    })
  }

  nextQuestion(): void {
    const state = this.getState();
    const newShowResults =
      state.currentQuestionIndex === state.questions.length - 1;

    const newCurrentQuestionIndex = newShowResults
      ? state.currentQuestionIndex
      : state.currentQuestionIndex + 1;

    const newAnswers = newShowResults
      ? []
      : this.shuffleAnswers(state.questions[newCurrentQuestionIndex]);

    this.setState({
      currentQuestionIndex: newCurrentQuestionIndex,
      showResults: newShowResults,
      answers: newAnswers,
      currentAnswer: null,
    });
  }

  restart(questions: any): void {
    const initialAnswers = this.shuffleAnswers(questions[0]);
    this.setState({ ...this.initialState, questions, answers: initialAnswers });
  }

  selectAnswer(answer: AnswerType): void {
    const state = this.getState();
    const newCorrectAnswerCount =
      answer === state.questions[state.currentQuestionIndex].correct_answer
        ? state.correctAnswerCount + 1
        : state.correctAnswerCount;

      if (answer !== state.questions[state.currentQuestionIndex].correct_answer) {
        this.restartGame();
      }  

    this.setState({
      currentAnswer: answer,
      correctAnswerCount: newCorrectAnswerCount,
    });
  }

  shuffleAnswers(question: QuestionInterface): AnswerType[] {
    const unshuffledAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];

    return unshuffledAnswers
      .map((unshuffledAnswer) => ({
        sort: Math.random(),
        value: unshuffledAnswer,
      }))
      .sort((a, b) => a.sort - b.sort)
      .map((el) => el.value);
  }

  loadQuestions(questions: QuestionInterface[]): void {
    const initialAnswers = this.shuffleAnswers(questions[0]);
    this.setState({ questions, answers: initialAnswers });
  }

}
