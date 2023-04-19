import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AnswerType } from '../../types/answer.type';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input("answerText") answerTextProps!: string;
  @Input("index") indexProps!: number;
  // @Input("correctAnswer") correctAnswer!: AnswerType|null;
  // @Input("currentAnswer") currentAnswer!: AnswerType|null;

  @Output("selectAnswer") selectAnswerEvent = new EventEmitter<AnswerType>();
  
  @HostListener("click", ["$event"])
  onClick() {
    this.selectAnswerEvent.emit(this.answerTextProps);
  }

  constructor(
    
  ) { }

  ngOnInit(): void {
    if (!this.answerTextProps || this.indexProps === undefined ) {
      throw new Error("Inputs in answer are not correct");
    }

    // console.log("!!", this.correctAnswer, this.currentAnswer);
  }

}
