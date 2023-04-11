import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuizStateInterface } from '../types/quizState.interface';

import mockData from "../data";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  state$ = new BehaviorSubject<QuizStateInterface>({
    questions: mockData,
    currentQuestionIndex: 0,
  });

  constructor() { }
}
