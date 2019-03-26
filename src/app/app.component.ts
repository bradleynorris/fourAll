import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  timerStart: number = 2000;
  scoreL: number = 0;
  scoreR: number = 0;

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

  countDown() {
    return this.timerStart = this.timerStart - 1;
  }

  reset() {
    return this.timerStart = 2000;
  }

  ngOnInit () {
    
  }
}
