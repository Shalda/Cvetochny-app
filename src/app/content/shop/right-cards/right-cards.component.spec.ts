import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightCardsComponent } from './right-cards.component';

describe('RightCardsComponent', () => {
  let component: RightCardsComponent;
  let fixture: ComponentFixture<RightCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
