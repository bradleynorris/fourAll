import { Component, OnInit, ViewChild } from '@angular/core';
import { TimerComponent } from './timer/timer.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild('counter', {read:TimerComponent})
  private counter: TimerComponent;

  scoreL: number = 0;
  scoreR: number = 0;

  colors = [
    {id: 'danger', name: "Red"},
    {id: 'primary', name: "Blue"},
    {id: 'success', name: "Green"},
    {id: 'warning', name: "Yellow"},
    {id: 'dark', name: "Black"},
    {id: 'secondary', name: 'Grey'},
    {id: 'info', name: 'Teal'},
    {id: 'light', name: 'White'}
  ];

  submitTeam(form) {
    console.log(form.value);
  }

  addOneL() {
    return this.scoreL = this.scoreL + 1;
  }

  addOneR() {
    return this.scoreR = this.scoreR + 1;
  }

  minusOneL() {
    return this.scoreL = this.scoreL - 1;
  }

  minusOneR() {
    return this.scoreR = this.scoreR - 1;
  }

  refresh() {
    window.location.reload();
  }

  ngOnInit () {
    this.counter.startAt = 1200;
    this.counter.start();
    this.counter.counterState.subscribe(state=>{
      if (state === 'COMPLETE') {
        alert('TIME IS UP');
      }
    })
  }
}
