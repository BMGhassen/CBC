import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Msgadmin1Component } from './msgadmin1.component';

describe('Msgadmin1Component', () => {
  let component: Msgadmin1Component;
  let fixture: ComponentFixture<Msgadmin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Msgadmin1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Msgadmin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
