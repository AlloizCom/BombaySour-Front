import {Component, HostListener, OnInit} from '@angular/core';
import {ImageService} from "../../../shared/services/image.service";
import {Film} from "../../../shared/models/film";
import {FilmService} from "../../../shared/services/film.service";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})
export class FilmComponent implements OnInit {

  films: Film[] = [];
  sources: { id: number, source: any }[] = [];
  currentId = 0;
  playing: boolean = true;
  width = window.innerWidth;
  loadedFirst = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
    console.log('resize');
  }

  constructor(private _service: ImageService, private _filmServie: FilmService) {
    _filmServie.findAllAvailable().subscribe(value => {
      this.films = value;
      let i = 0;
      let loader = setInterval(() => {
        if (this.films.length <= i)
          clearInterval(loader);
        else {
          _service.loadVideo(this.films[i].videoUrl).subscribe(image => {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              let src: { id: number, source: any } = {} as { id: number, source: any };
              src.source = reader.result;
              this.sources.push(src);
            }, false);
            if (image) {
              reader.readAsDataURL(image);
            }
          }, err => {
            console.error(err);
          });
          i++;
        }
      }, 2000);
      this.playing = false;
    }, err => {
      console.error(err);
    });
  }

  changeCurrentId(way: number) {
    if (this.playing)
      return;
    if (this.currentId + way < -1 || this.currentId + way == this.films.length + 1)
      return;
    this.currentId += way;
    this.playing = true;
    setTimeout(() => this.playing = false, 1000);
  }

  loaded(event){
    this.loadedFirst = event;
  }

  ngOnInit(): void {
  }

}
