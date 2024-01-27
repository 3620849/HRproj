import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoBlitzComponent } from './video-blitz.component';

describe('VideoBlitzComponent', () => {
  let component: VideoBlitzComponent;
  let fixture: ComponentFixture<VideoBlitzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoBlitzComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoBlitzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
