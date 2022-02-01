import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillisThisQuestComponent } from './millis-this-quest.component';

describe('MillisThisQuestComponent', () => {
  let component: MillisThisQuestComponent;
  let fixture: ComponentFixture<MillisThisQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MillisThisQuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MillisThisQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
