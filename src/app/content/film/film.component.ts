import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit, AfterViewInit{
  /** Template reference to the canvas element */
  @ViewChild('canvasEl') canvasEl: ElementRef;
  @ViewChild('videoPlayer') videoplayer: any;

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;
  videoSource: string = "https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761";

  constructor() {}

  ngAfterViewInit() {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

    this.draw();
  }

  /**
   * Draws something using the context we obtained earlier on
   */
  private draw() {
    this.context.beginPath();
    this.context.moveTo(0,0);
    this.context.lineTo(300,150);
    this.context.stroke();
  }

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
}

  ngOnInit(): void {
  }

}
