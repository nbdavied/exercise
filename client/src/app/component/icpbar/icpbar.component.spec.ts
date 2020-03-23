import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcpbarComponent } from './icpbar.component';

describe('IcpbarComponent', () => {
  let component: IcpbarComponent;
  let fixture: ComponentFixture<IcpbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcpbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcpbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
