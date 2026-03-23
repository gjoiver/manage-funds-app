import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { ColumnDef } from '@shared/entities';
import { Component } from '@angular/core';

interface TestRow {
  id: number;
  name: string;
  amount: number;
}

const TEST_ROW: TestRow = { id: 1, name: 'Test Fund', amount: 50000 };

const TEXT_COLUMNS: ColumnDef<TestRow>[] = [{ header: 'Name', key: 'name', type: 'text' }];

describe(`CardComponent`, () => {
  let fixture: ComponentFixture<CardComponent<TestRow>>;
  let component: CardComponent<TestRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent<TestRow>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', TEXT_COLUMNS);
    fixture.detectChanges();
  });

  it(`Given required inputs
    When the component is created
    Then it initializes successfully`, () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it(`Given a row with a string property
    When getCellValue is called
    Then returns the string value`, () => {
    // Arrange
    const row = TEST_ROW;

    // Act
    const result = component.getCellValue(row, 'name');

    // Assert
    expect(result).toBe('Test Fund');
  });

  it(`Given a row with a numeric property
    When getCellValue is called
    Then returns the numeric value`, () => {
    // Arrange
    const row = TEST_ROW;

    // Act
    const result = component.getCellValue(row, 'amount');

    // Assert
    expect(result).toBe(50000);
  });

  it(`Given a row with a null property
    When getCellValue is called
    Then returns null`, () => {
    // Arrange
    const row = { ...TEST_ROW, name: null as unknown as string };

    // Act
    const result = component.getCellValue(row, 'name');

    // Assert
    expect(result).toBeNull();
  });

  it(`Given a column with a component factory
    When getDynamicCell is called
    Then returns the dynamic component config`, () => {
    // Arrange
    const MockComponent = Component({})(class {});
    const col: ColumnDef<TestRow> = {
      header: 'Action',
      key: 'id',
      type: 'custom',
      component: (row, index) => ({ class: MockComponent, inputs: { row, index } }),
    };

    // Act
    const result = component.getDynamicCell(col, TEST_ROW, 0);

    // Assert
    expect(result).not.toBeNull();
    expect(result?.class).toBe(MockComponent);
  });

  it(`Given a column without a component factory
    When getDynamicCell is called
    Then returns null`, () => {
    // Arrange
    const col: ColumnDef<TestRow> = { header: 'Name', key: 'name', type: 'text' };

    // Act
    const result = component.getDynamicCell(col, TEST_ROW, 0);

    // Assert
    expect(result).toBeNull();
  });

  it(`Given skeleton is true
    When the component renders
    Then shows skeleton overlay placeholders`, fakeAsync(() => {
    // Arrange
    fixture.componentRef.setInput('skeleton', true);

    // Act
    fixture.detectChanges();
    tick();

    // Assert
    const skeletonOverlays = fixture.nativeElement.querySelectorAll('.skeleton-overlay');
    expect(skeletonOverlays.length).toBeGreaterThan(0);
  }));
});
