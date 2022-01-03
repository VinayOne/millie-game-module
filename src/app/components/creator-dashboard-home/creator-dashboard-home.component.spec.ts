import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorDashboardHomeComponent } from './creator-dashboard-home.component';

describe('CreatorDashboardHomeComponent', () => {
  let component: CreatorDashboardHomeComponent;
  let fixture: ComponentFixture<CreatorDashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorDashboardHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
