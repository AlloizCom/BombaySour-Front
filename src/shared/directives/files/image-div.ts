import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {Controllers, ImageService} from "../../services/image.service";

@Directive({
  selector: '[divImage]'
})
export class DivMainImageDirective implements OnInit {

  @Input() id: number;
  @Input() controller: Controllers;

  // @Input() check: boolean = false;

  constructor(private element: ElementRef, private service: ImageService) {
  }

  ngOnInit(): void {
    // if (this.check) {
    //   this.element.nativeElement.style.backgroundImage = `url(${urlLoader})`;
    //   this.element.nativeElement.style.backgroundSize = '50%';
    // } else {
    //   this.element.nativeElement.style.backgroundColor = "#DCDCDC";
    // }
    this.service.findOne(this.id, this.controller).subscribe(next => {
      this.element.nativeElement.style.backgroundSize = 'cover';
      this.element.nativeElement.style.backgroundImage = `url(${next.body})`;
    }, err => {
      console.error(err);
    });
  }

}
