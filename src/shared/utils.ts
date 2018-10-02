import {FormControl} from "@angular/forms";

export function validateImages(c: FormControl): { [key: string]: any } {
  return c.value == null || c.value.length == 0 ? {"required": true} : null;
}
