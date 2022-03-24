import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorypayComponent } from './historypay.component';

describe('HistorypayComponent', () => {
  let component: HistorypayComponent;
  let fixture: ComponentFixture<HistorypayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorypayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorypayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
