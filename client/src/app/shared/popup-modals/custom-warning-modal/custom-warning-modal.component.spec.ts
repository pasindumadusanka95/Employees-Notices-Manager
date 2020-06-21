import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWarningModalComponent } from './custom-warning-modal.component';

describe('CustomWarningModalComponent', () => {
  let component: CustomWarningModalComponent;
  let fixture: ComponentFixture<CustomWarningModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomWarningModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomWarningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
