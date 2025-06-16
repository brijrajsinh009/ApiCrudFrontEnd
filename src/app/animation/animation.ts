// import { trigger, state, style, animate, transition } from '@angular/animations';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-animation',
//   imports: [],
//   templateUrl: './animation.html',
//   styleUrl: './animation.css',
//   animations: [
//     trigger('fadeIn', [
//       state('void', style({ opacity: 0 })),
//       transition(':enter', [animate('1s ease-in', style({ opacity: 1 }))]),
//     ]),
//   ],
// })
// export class Animation {}

// import { Component } from '@angular/core';
// import { trigger, style, animate, transition, state } from '@angular/animations';

// @Component({
//   selector: 'app-animation',
//   templateUrl: './animation.html',
//   styleUrl: './animation.css',
//   animations: [
//     trigger('slideAnimation', [
//       state('closed', style({ transform: 'translateX(-100%)' })),
//       state('open', style({ transform: 'translateX(0)' })),
//       transition('closed <=> open', animate('700ms ease-in-out'))
//     ])
//   ]
// })
// export class Animation {
//   isOpen = false;
//   toggle() {
//     this.isOpen = !this.isOpen;
//   }
// }

import { Component, HostListener } from '@angular/core';
import { trigger, transition, query, style, animate, stagger } from '@angular/animations';
import { NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-animation',
  standalone: true,
  imports: [NgFor, MatGridListModule],
  // template: `
  //   <button (click)="addItem()">Add Item</button>
  //   <ul [@listAnimation]="items.length">
  //     <li *ngFor="let item of items; trackBy: trackByFn">{{ item }}</li>
  //   </ul>
  // `,
  templateUrl: './animation.html',
  styleUrl: './animation.css',
  animations: [
    trigger('listAnimation', [
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(200, [
            animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ]),
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(200, [
            animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Animation {
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  tiles = [
    { text: 'Tile 1', cols: 1, rows: 1, color: 'lightblue' },
    { text: 'Tile 2', cols: 2, rows: 1, color: 'lightgreen' },
    { text: 'Tile 3', cols: 1, rows: 1, color: 'lightcoral' },
    { text: 'Tile 4', cols: 1, rows: 1, color: 'lightyellow' },
    { text: 'Tile 5', cols: 1, rows: 2, color: 'lightpink' }
  ];

  addItem() {
    this.items = [...this.items, `Item ${this.items.length + 1}`];
  }

  trackByFn(index: number, item: string) {
    return index;
  }

  cols = 3;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= 600) {
      this.cols = 1;
    } else if (event.target.innerWidth <= 960) {
      this.cols = 2;
    } else {
      this.cols = 3;
    }
  }

  ngOnInit() {
    this.onResize({ target: window });
  }
}

