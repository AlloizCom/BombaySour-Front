import {animate,state,style,transition,trigger} from '@angular/animations';

export const divTrigger = trigger('divTrigger',[
   state('hide',style({
     opacity:0
   })),
   state('show',style({
     opacity:1
   })),
  transition('hide =>show',[
    style({
      opacity:0
    }),
    animate(500,style({
      opacity:1
    }))
  ])
]);
