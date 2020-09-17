import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromecastPageComponent } from './chromecast-page.component';

describe('ChromecastPageComponent', () => {
  let component: ChromecastPageComponent;
  let fixture: ComponentFixture<ChromecastPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChromecastPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChromecastPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
