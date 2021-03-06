import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgingsListComponent } from './lodgings-list.component';
import { mockLodgings } from '../mock-booking-data';
import { Lodging } from 'src/app/data/lodging.model';
import { DebugElement } from '@angular/core';

describe('LodgingsListComponent', () => {
  let component: LodgingsListComponent;
  let fixture: ComponentFixture<LodgingsListComponent>;

  let lodgingsListDe: DebugElement;
  let lodgingsListEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LodgingsListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgingsListComponent);
    component = fixture.componentInstance;

    lodgingsListDe = fixture.debugElement;
    lodgingsListEl = fixture.nativeElement;

    component.lodgings = mockLodgings;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 2D array of lodgings', () => {
    const resultLodgingRow = component.lodgingsRow(mockLodgings, 1);
    const expectedLodginRow: Lodging[][] = [[mockLodgings[0]], [mockLodgings[1]]];

    expect(resultLodgingRow).toEqual(expectedLodginRow);
  });

  it('should create empty array when lodgings is null', () => {
    const resultLodgingRow = component.lodgingsRow(null, 0);
    const expectedLodginRow = [];

    expect(resultLodgingRow).toEqual(expectedLodginRow);
  });

  it('should emit when a lodging is clicked', () => {
    const lodgingEventEmitterSpy = spyOn(component.lodgingClickHandler, 'emit'); // Spy to listen for when event is emitted
    component.triggerLodgingClick(mockLodgings[0]);
    expect(component.lodgingClickHandler.emit).toHaveBeenCalled();
  });
});
