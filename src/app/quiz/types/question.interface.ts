import { AnswerType } from "./answer.type";

export interface QuestionInterface {
    question: string;
    incorrect_answers: string[];
    correct_answer: AnswerType;
}