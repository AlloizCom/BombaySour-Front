import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-pannel',
  templateUrl: './pannel.component.html',
  styleUrls: ['./pannel.component.css']
})
export class PannelComponent implements OnInit {

  action: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.action = this.activatedRoute.firstChild ? this.activatedRoute.firstChild.routeConfig.path : undefined;
    this.router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        this.action = this.activatedRoute.firstChild ? this.activatedRoute.firstChild.routeConfig.path : undefined;
      }
    });
  }

  ngOnInit() {
  }

}
