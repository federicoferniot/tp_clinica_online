import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Login => Usuario', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('Usuario => Login', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ right: '100%'}))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ right: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('Usuario => Menu', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ transform: "scale(0)" })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate(1500, style({ transform: "scale(0)" }))
        ]),
        query(':enter', [
          animate(1500, style({ transform: "scale(1)" }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('Usuario => Notificacion', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate(1, style({ opacity: 0}))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ right: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);