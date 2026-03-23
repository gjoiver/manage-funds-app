import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { ColumnDef } from '@shared/entities';
import { Component } from '@angular/core';

interface TestRow {
  id: number;
  name: string;
  amount: number;
}

const TEST_ROWS: TestRow[] = [
  { id: 1, name: 'Fund A', amount: 75000 },
  { id: 2, name: 'Fund B', amount: 125000 },
];

const COLUMNS: ColumnDef<TestRow>[] = [
  { header: 'Name', key: 'name', type: 'text' },
  { header: 'Amount', key: 'amount', type: 'currency' },
];

describe(`TableComponent`, () => {
  let fixture: ComponentFixture<TableComponent<TestRow>>;
  let component: TableComponent<TestRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent<TestRow>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', TEST_ROWS);
    fixture.componentRef.setInput('columns', COLUMNS);
    fixture.detectChanges();
  });

  it(`Given data and columns inputs
    When the component is created
    Then it initializes successfully`, () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it(`Given a row with a string property
    When getCellValue is called
    Then returns the string value`, () => {
    // Arrange
    const row = TEST_ROWS[0];

    // Act
    const result = component.getCellValue(row, 'name');

    // Assert
    expect(result).toBe('Fund A');
  });

  it(`Given a row with a numeric property
    When getCellValue is called
    Then returns the numeric value`, () => {
    // Arrange
    const row = TEST_ROWS[0];

    // Act
    const result = component.getCellValue(row, 'amount');

    // Assert
    expect(result).toBe(75000);
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
    const result = component.getDynamicCell(col, TEST_ROWS[0], 0);

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
    const result = component.getDynamicCell(col, TEST_ROWS[0], 0);

    // Assert
    expect(result).toBeNull();
  });

  it(`Given isLoading is true
    When the component renders
    Then shows skeleton overlay placeholders`, fakeAsync(() => {
    // Arrange
    fixture.componentRef.setInput('isLoading', true);

    // Act
    fixture.detectChanges();
    tick();

    // Assert
    const skeletonOverlays = fixture.nativeElement.querySelectorAll('.skeleton-overlay');
    expect(skeletonOverlays.length).toBeGreaterThan(0);
  }));

  it(`Given data rows and isLoading is false
    When the component renders
    Then displays the row data in the table`, () => {
    // Arrange
    fixture.componentRef.setInput('isLoading', false);

    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement.textContent).toContain('Fund A');
  });
});
