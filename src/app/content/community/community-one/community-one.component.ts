import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Community} from "../../../../shared/models/community";

@Component({
  selector: 'app-community-one',
  templateUrl: './community-one.component.html',
  styleUrls: ['./community-one.component.css']
})
export class CommunityOneComponent implements OnInit {

  @Input() position:string = '';
  @Input() show:boolean = false;
  @Input() community:Community = new Community();

  @Output() readMore = new EventEmitter();

  constructor() { }

  read(){
    this.readMore.emit();
  }

  ngOnInit() {
  }

}
