import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilliesThisQuestComponent } from './millies-this-quest.component';

describe('MilliesThisQuestComponent', () => {
  let component: MilliesThisQuestComponent;
  let fixture: ComponentFixture<MilliesThisQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilliesThisQuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilliesThisQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
