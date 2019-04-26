import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhtGraphComponent } from './dht-graph.component';

describe('DhtGraphComponent', () => {
  let component: DhtGraphComponent;
  let fixture: ComponentFixture<DhtGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhtGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhtGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
