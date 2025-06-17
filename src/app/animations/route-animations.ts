import {
    trigger,
    transition,
    style,
    query,
    group,
    animate,
  } from '@angular/animations';
  
  export const routeAnimations  = trigger('routeAnimations', [
    transition('Home => About, About => Contact, Home => Contact', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ left: '100%' })]),
      query(':leave', [style({ left: '0%' })]),
      group([
        query(':leave', [animate('500ms ease-out', style({ left: '-100%' }))]),
        query(':enter', [animate('500ms ease-out', style({ left: '0%' }))]),
      ]),
    ]),
    transition('Contact => About, About => Home, Contact => Home', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ left: '-100%' })]),
      query(':leave', [style({ left: '0%' })]),
      group([
        query(':leave', [animate('500ms ease-out', style({ left: '100%' }))]),
        query(':enter', [animate('500ms ease-out', style({ left: '0%' }))]),
      ]),
    ]),
  ]);