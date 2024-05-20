import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourriersComponent } from './courriers.component';

describe('CourriersComponent', () => {
  let component: CourriersComponent;
  let fixture: ComponentFixture<CourriersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourriersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
