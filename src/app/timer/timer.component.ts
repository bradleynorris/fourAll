import { Component, OnInit, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

  @Input()
  startAt = 0;

  @Output()
  counterState = new EventEmitter<string>();

  currentValue = '20:00';
  currentSubscription: Subscription;

  constructor(private changeDetector : ChangeDetectorRef) { }

  ngOnInit() {    
  }

  public start() {
    this.currentValue = this.formatValue(this.startAt);
    this.changeDetector.detectChanges();

    const t: Observable<number> = interval(1000);
    this.currentSubscription = t.pipe(take(this.startAt)).map(v => this.startAt - (v + 1)).subscribe(v => {
      this.currentValue = this.formatValue(v);
      this.changeDetector.detectChanges();
    }, err=>{
      this.counterState.error(err);
    }, ()=>{
      this.currentValue = '00:00';
      this.counterState.emit('COMPLETE'); 
      this.changeDetector.detectChanges();
    });
  }
  
  startTimer() {
      this.start();
  }

  public pauseTimer() {
    this.currentSubscription.unsubscribe();
    this.counterState.emit('ABORTED');
  }

  resetTimer() {
    this.start();
  }

// Converting seconds to Min:Sec format
  private formatValue(v) {
    const minutes = Math.floor(v/60);
    const formattedMinutes = (minutes > 9? minutes : '0' + minutes);

    const seconds = v % 60;
    const formattedSeconds = (seconds > 9? seconds : '0' + seconds);

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
