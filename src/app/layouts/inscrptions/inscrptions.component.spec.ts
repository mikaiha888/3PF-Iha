import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscrptionsComponent } from './inscrptions.component';

describe('InscrptionsComponent', () => {
  let component: InscrptionsComponent;
  let fixture: ComponentFixture<InscrptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscrptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscrptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
