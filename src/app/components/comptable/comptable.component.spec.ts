import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptableComponent } from './comptable.component';

describe('ComptableComponent', () => {
  let component: ComptableComponent;
  let fixture: ComponentFixture<ComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComptableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
