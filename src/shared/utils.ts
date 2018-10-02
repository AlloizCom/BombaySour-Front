import {FormControl} from "@angular/forms";

export function validateImages(c: FormControl): { [key: string]: any } {
  return c.value == null || c.value.length == 0 ? {"required": true} : null;
}

export function readUrl(event: any, fun) {
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.onload = fun(event);
    reader.readAsDataURL(event.target.files[0]);
  }
}
