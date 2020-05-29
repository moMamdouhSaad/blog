import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostContainerComponent } from './add-post-container.component';

describe('AddPostContainerComponent', () => {
  let component: AddPostContainerComponent;
  let fixture: ComponentFixture<AddPostContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
