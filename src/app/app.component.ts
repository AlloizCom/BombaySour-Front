import {AfterViewInit, Component} from '@angular/core';
import {Subject} from "rxjs";
import {isNullOrUndefined} from "util";


export class AnimationService {
  private __open: boolean;

  private _open: Subject<boolean> = new Subject<boolean>();

  get open(): boolean {
    return this.__open;
  }

  set open(value: boolean) {
    this.__open = value;
    this._open.next(value);
  }

  open$ = this._open.asObservable();
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {

  static animationService = new AnimationService();

  open: boolean = false;

  constructor() {
    if (isNullOrUndefined(AppComponent.animationService.open))
      AppComponent.animationService.open = this.open;
    else
      this.open = AppComponent.animationService.open;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.open = true;
      AppComponent.animationService.open = this.open;
    }, 4500)

  }
}
