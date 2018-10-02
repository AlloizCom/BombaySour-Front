import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[divImage]'
})
export class DivMainImageDirective implements OnInit {

  @Input() id: number;

  // @Input() check: boolean = false;

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
    // if (this.check) {
    //   this.element.nativeElement.style.backgroundImage = `url(${urlLoader})`;
    //   this.element.nativeElement.style.backgroundSize = '50%';
    // } else {
    //   this.element.nativeElement.style.backgroundColor = "#DCDCDC";
    // }
    // this._eventService.findOneOneEventMain(this.id).subscribe(next => {
    //   this.element.nativeElement.style.backgroundSize = 'cover';
    //   this.element.nativeElement.style.backgroundImage = `url(${next.body})`;
    // }, err => {
    //   console.error(err);
    // });
  }

}
