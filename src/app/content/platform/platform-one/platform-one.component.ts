import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Platform} from '../../../../shared/models/platform';

@Component({
  selector: 'app-platform-one',
  templateUrl: './platform-one.component.html',
  styleUrls: ['./platform-one.component.css']
})
export class PlatformOneComponent implements OnInit {

  @Input() position:string = '';
  @Input() show:boolean = false;
  @Input() platform:Platform = new Platform();

  @Output() readMore = new EventEmitter();

  constructor() { }

  read(){
    console.log(this.show)
    this.readMore.emit();
  }

  ngOnInit() {
  }


}
