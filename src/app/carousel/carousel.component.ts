import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IItem} from '../models/question.model';
import {Router} from '@angular/router';
import {Carousel} from 'primeng/carousel';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {IAnswer} from '../models/user.model';
import {MessageService, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
  animations: [
    trigger('animation', [
      state(
        'visible',
        style({
          transform: 'translateX(0)',
          opacity: 1
        })
      ),
      transition('void => *', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate(
          '250ms ease-in',
          style({
            height: 0,
            opacity: 0,
            transform: 'translateX(50%)'
          })
        )
      ])
    ])
  ],
  providers: [MessageService]
})
export class CarouselComponent implements OnInit {
  @Input() questions: IItem[];
  @Input() answersLength: number;
  @Output() answer = new EventEmitter<IAnswer>();
  @Output() toast = new EventEmitter<boolean>();
  timeLeft: number = 20;
  interval;
  maxQuestions: number = 20;
  attempts: number = 0;
  @ViewChild('basicCarousel') basicCarousel: Carousel;
  constructor(private router: Router, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.startTimer();
  }

  nextQuestion(data, answer): void{
    if(this.isRange()){
      const resultAnswer: IAnswer = {answer: this.isAnswerCorrect(data?.correct_answer, answer)};
      this.basicCarousel.navForward(data);
      this.emitAnswer(resultAnswer);
      clearInterval(this.interval);
      this.startTimer();
    }
    else{
      this.router.navigateByUrl('/result');
    }
  }
  isRange(): boolean{
    return this.answersLength < this.maxQuestions;
  }
  isAnswerCorrect(correctAnswer, answer): boolean{
    return correctAnswer === answer;
  }
  startTimer(): void{
    const pauseTime = 1000;
    const timeLeft =  20;
    this.timeLeft = timeLeft;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = timeLeft;
        this.nextQuestion(null, null);
      }
    }, pauseTime);
  }
  calculateProgress(time: number): number{
    const start = 100;
    return (start - ((time * start) / 20));
  }
  emitAnswer(answer): void{
    this.answer.emit(answer);
  }
}
