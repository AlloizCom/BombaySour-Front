import {Directive, ElementRef, EventEmitter, Inject, Output, Renderer} from '@angular/core';
import {FILE_BASE64, FILES_BASE64} from './file.function';
import {DOCUMENT} from '@angular/common';

@Directive({
  selector: '[appBase64AndProgressFiles]'
})
export class Base64AndProgressFilesDirective {
  @Output() file = new EventEmitter();
  div: HTMLDivElement;
  innerDiv: HTMLDivElement;
  innerInnerDiv: HTMLDivElement;
  input: HTMLInputElement;


  constructor(private el: ElementRef, private renderer: Renderer, @Inject(DOCUMENT) private _document: Document) {
    renderer.listen(this.el.nativeElement, 'change', (e) => {
      if (el.nativeElement.files.length > 0) {

        let totalSize=0;
        let loaded=1;

        for(let i=0;i<el.nativeElement.files.length;i++){
          totalSize+=el.nativeElement.files[i].size;
        }
// console.log("totalsize:["+totalSize+"]")
        this.addLoadPage();
        FILES_BASE64(el.nativeElement.files, (e) => {
          this.file.next(e);
        }, (data) => {
          // console.log(data.total);
          // console.log(data.loaded);
          // console.log(data);
          // console.log("loaded:["+loaded+"]")
          loaded+=data.loaded;
          (<HTMLInputElement>this._document.getElementById('id-progress-container-container-line')).style.width = ((loaded/totalSize)*100).toFixed(0)+"%";
        }, (end) => {
          this.div.remove();
          // console.log('ended');
        }, (start) => {
          // (<HTMLInputElement>this._document.getElementById('id-progress-container-container-line')).style.width = '0'+"%";
        });
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
