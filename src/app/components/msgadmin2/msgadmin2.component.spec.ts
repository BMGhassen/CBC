import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Msgadmin2Component } from './msgadmin2.component';

describe('Msgadmin2Component', () => {
  let component: Msgadmin2Component;
  let fixture: ComponentFixture<Msgadmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Msgadmin2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Msgadmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
