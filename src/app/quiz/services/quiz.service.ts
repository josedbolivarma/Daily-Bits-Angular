import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuizStateInterface } from '../types/quizState.interface';

import mockData from '../data';
import { QuestionInterface } from '../types/question.interface';
import { AnswerType } from '../types/answer.type';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  initialState: QuizStateInterface = {
    questions: mockData,
    currentQuestionIndex: 0,
    showResults: false,
    correctAnswerCount: 0,
    answers: this.shuffleAnswers(mockData[0]),
    currentAnswer: null,
  };
  state$ = new BehaviorSubject<QuizStateInterface>({ ...this.initialState });

  setState(partialState: Partial<QuizStateInterface>): void {
    this.state$.next({
      ...this.state$.getValue(),
      ...partialState,
    });
  }

  getState(): QuizStateInterface {
    return this.state$.getValue();
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

  restart(): void {
    this.setState(this.initialState);
  }

  selectAnswer(answer: AnswerType): void {
    const state = this.getState();
    const newCorrectAnswerCount =
      answer === state.questions[state.currentQuestionIndex].correct_answer
        ? state.correctAnswerCount + 1
        : state.correctAnswerCount;
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
}
