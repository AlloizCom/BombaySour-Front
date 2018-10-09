import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements  AfterViewInit{
  title = 'bombay-sour';
  open: boolean = false;
  close: boolean = true
  ngAfterViewInit(): void {
    setTimeout(()=>{
this.open =true;
this.close= false;
    }, 4500)
    
  }

  
  constructor(){

  }
}
