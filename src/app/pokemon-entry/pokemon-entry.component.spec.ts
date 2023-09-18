import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonEntryComponent } from './pokemon-entry.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { DataServiceMock } from '../test-helpers/services/data.service.mock';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

describe('PokemonEntryComponent', () => {
  let component: PokemonEntryComponent;
  let fixture: ComponentFixture<PokemonEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ 
        PokemonEntryComponent 
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: '123'})
          }
        },
        {
          provide: DataService,
          useValue: DataServiceMock
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
