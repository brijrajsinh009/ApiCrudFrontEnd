import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeState } from './practice-state';

describe('PracticeState', () => {
  let component: PracticeState;
  let fixture: ComponentFixture<PracticeState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
