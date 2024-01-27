import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoQuestionComponent } from './video-question.component';

describe('VideoQuestionComponent', () => {
  let component: VideoQuestionComponent;
  let fixture: ComponentFixture<VideoQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
