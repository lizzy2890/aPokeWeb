import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingService } from 'src/app/services/loading.service';
import { LoadingServiceMock } from 'src/app/test-helpers/services/loading.service.mock';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingComponent ],
      providers: [
        {
          provide: LoadingService,
          useValue: LoadingServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
