import { QuestionInterface } from "./question.interface";

export interface QuizStateInterface {
    questions: QuestionInterface[];
    currentQuestionIndex: number;
}