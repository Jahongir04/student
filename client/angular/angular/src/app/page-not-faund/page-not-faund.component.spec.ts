import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFaundComponent } from './page-not-faund.component';

describe('PageNotFaundComponent', () => {
  let component: PageNotFaundComponent;
  let fixture: ComponentFixture<PageNotFaundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotFaundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFaundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
