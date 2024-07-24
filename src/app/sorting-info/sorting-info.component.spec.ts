import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingInfoComponent } from './sorting-info.component';

describe('SortingInfoComponent', () => {
  let component: SortingInfoComponent;
  let fixture: ComponentFixture<SortingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortingInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
