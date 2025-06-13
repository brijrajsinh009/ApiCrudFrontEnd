import { Component } from '@angular/core';
import { PracticeState } from '../practice-state/practice-state';
import { PracticeState2 } from '../practice-state2/practice-state';

@Component({
  selector: 'app-practice',
  imports: [PracticeState, PracticeState2],
  templateUrl: './practice.html',
  styleUrl: './practice.css'
})
export class Practice {

}
