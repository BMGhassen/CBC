import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomicilicionComponent } from './domicilicion.component';

describe('DomicilicionComponent', () => {
  let component: DomicilicionComponent;
  let fixture: ComponentFixture<DomicilicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomicilicionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomicilicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
