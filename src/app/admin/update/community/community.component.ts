import { Component, OnInit } from '@angular/core';
import {Community} from "../../../../shared/models/community";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  communities:Community[]=[];

  constructor() { }

  ngOnInit() {
  }

}
