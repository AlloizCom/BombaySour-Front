import {isNullOrUndefined} from "util";
import {url} from "../../config/url";
import {Pipe} from "@angular/core";

@Pipe({name: 'video'})
export class PrefixUrlVideo {

  transform(value: any, ...args): any {
    if (isNullOrUndefined(value))
      return "/assets/error/404.ico";
    else
      return url + value;
  }
}
