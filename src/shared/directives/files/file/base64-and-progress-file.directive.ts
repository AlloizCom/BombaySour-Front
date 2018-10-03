import {Directive, ElementRef, EventEmitter, Inject, Input, Output, Renderer} from '@angular/core';
import {FILE_BASE64} from './file.function';
import {DOCUMENT} from '@angular/common';
import {isNullOrUndefined} from "util";
import {DomSanitizer} from "@angular/platform-browser";


@Directive({
  selector: '[appBase64AndProgressFile]'
})
export class Base64AndProgressFileDirective {

  @Output() file = new EventEmitter();
  @Input() wXh: number;
  @Input() w: number;
  @Input() h: number;
  div: HTMLDivElement;
  input: HTMLInputElement;
  innerDiv: HTMLDivElement;
  innerInnerDiv: HTMLDivElement;

  withWXH() {
    return (!isNullOrUndefined(this.wXh)) && (!isNullOrUndefined(this.w)) && (!isNullOrUndefined(this.h));
  }

  constructor(private sanitizer: DomSanitizer, private el: ElementRef, private renderer: Renderer, @Inject(DOCUMENT) private _document: Document) {
    renderer.listen(this.el.nativeElement, 'change', (e) => {
      if (el.nativeElement.files.length > 0) {
        if (this.withWXH()) {
          let totalSize = 0;
          let loaded = 1;
          this.addLoadPage();
          let file;
          let imgg: HTMLImageElement = document.createElement("img");
          file = el.nativeElement.files[0];
          imgg = new Image();
          console.log("in");
          imgg.onload = () => {
            console.log(imgg.naturalHeight + "=" + this.h + " " + imgg.naturalWidth + "=" + this.w);
            if (imgg.naturalWidth / imgg.naturalHeight != this.wXh||this.w!=imgg.naturalWidth||this.h!=imgg.naturalHeight) {
              this.div.remove();
              alert("неправильне розширення зображення повино бути:[" + this.w + "x" + this.h + "]є:[" + imgg.naturalWidth + "x" + imgg.naturalHeight + "]");
              return;
            }

            totalSize += el.nativeElement.files[0].size;
// console.log("totalsize:["+totalSize+"]")
            FILE_BASE64(el.nativeElement.files[0], (e) => {
              this.file.next(e);
            }, (data) => {
              // console.log(data.total);
              // console.log(data.loaded);
              // console.log(data);
              // console.log("loaded:["+loaded+"]")
              loaded += data.loaded;
              (<HTMLInputElement>this._document.getElementById('id-progress-container-container-line')).style.width = ((loaded / totalSize) * 100).toFixed(0) + "%";
            }, (end) => {
              this.div.remove();
              // console.log('ended');
            });

          };
          try {
            imgg.src = window.URL.createObjectURL(file);
          }catch (e) {
            alert("невідома помилка");
            this.div.remove();
          }
        } else {
          let totalSize = 0;
          let loaded = 1;

          totalSize += el.nativeElement.files[0].size;
// console.log("totalsize:["+totalSize+"]")
          this.addLoadPage();
          FILE_BASE64(el.nativeElement.files[0], (e) => {
            this.file.next(e);
          }, (data) => {
            // console.log(data.total);
            // console.log(data.loaded);
            // console.log(data);
            // console.log("loaded:["+loaded+"]")
            loaded += data.loaded;
            (<HTMLInputElement>this._document.getElementById('id-progress-container-container-line')).style.width = ((loaded / totalSize) * 100).toFixed(0) + "%";
          }, (end) => {
            this.div.remove();
            // console.log('ended');
          });
        }

      }
    });
  }

  addLoadPage() {
    this.div = (<HTMLDivElement>this._document.createElement('div'));
    this.div.classList.add('progress-container');

    this.innerDiv = (<HTMLDivElement>this._document.createElement('div'));
    this.innerDiv.classList.add('progress-container-container');


    this.innerInnerDiv = (<HTMLDivElement>this._document.createElement('div'));
    this.innerInnerDiv.classList.add('progress-container-container-line');
    this.innerInnerDiv.id = 'id-progress-container-container-line';
    this.innerDiv.appendChild(this.innerInnerDiv);

    this.div.appendChild(this.innerDiv);

    this._document.body.appendChild(this.div);

  }


}
