import { AnswerType } from "./answer.type";
import { QuestionInterface } from "./question.interface";

export interface QuizStateInterface {
    questions: QuestionInterface[];
    currentQuestionIndex: number;
    showResults: boolean;
    correctAnswerCount: number;
    answers: AnswerType[] | null;
    currentAnswer: AnswerType | null;
    games: number;
}