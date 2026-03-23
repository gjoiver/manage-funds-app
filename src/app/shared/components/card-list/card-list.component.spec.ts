import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardListComponent } from './card-list.component';
import { ColumnDef } from '@shared/entities';

interface TestItem {
  id: number;
  name: string;
}

const TEST_ITEMS: TestItem[] = [
  { id: 1, name: 'Item A' },
  { id: 2, name: 'Item B' },
];

const COLUMNS: ColumnDef<TestItem>[] = [{ header: 'Name', key: 'name', type: 'text' }];

describe(`CardListComponent`, () => {
  let fixture: ComponentFixture<CardListComponent<TestItem>>;
  let component: CardListComponent<TestItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListComponent<TestItem>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', TEST_ITEMS);
    fixture.componentRef.setInput('columns', COLUMNS);
    fixture.detectChanges();
  });

  it(`Given required inputs
    When the component is created
    Then it initializes successfully`, () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it(`Given isLoading is true
    When the component renders
    Then shows exactly 3 skeleton cards`, () => {
    // Arrange
    fixture.componentRef.setInput('isLoading', true);

    // Act
    fixture.detectChanges();

    // Assert
    const cards = fixture.nativeElement.querySelectorAll('app-card');
    expect(cards.length).toBe(3);
  });

  it(`Given isLoading is false and data has items
    When the component renders
    Then shows one card per item`, () => {
    // Arrange
    fixture.componentRef.setInput('isLoading', false);

    // Act
    fixture.detectChanges();

    // Assert
    const cards = fixture.nativeElement.querySelectorAll('app-card');
    expect(cards.length).toBe(TEST_ITEMS.length);
  });

  it(`Given isLoading is false, data is empty and emptyMessage is provided
    When the component renders
    Then shows the empty message`, () => {
    // Arrange
    fixture.componentRef.setInput('data', []);
    fixture.componentRef.setInput('emptyMessage', 'No hay elementos');
    fixture.componentRef.setInput('isLoading', false);

    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement.textContent).toContain('No hay elementos');
  });

  it(`Given isLoading is false, data is empty and emptyMessage is not provided
    When the component renders
    Then shows neither cards nor a message`, () => {
    // Arrange
    fixture.componentRef.setInput('data', []);
    fixture.componentRef.setInput('isLoading', false);

    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement.querySelectorAll('app-card').length).toBe(0);
    expect(fixture.nativeElement.querySelector('p')).toBeNull();
  });

  it(`Given isLoading switches from true to false
    When the component re-renders
    Then replaces skeletons with real item cards`, () => {
    // Arrange
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();

    // Act
    fixture.componentRef.setInput('isLoading', false);
    fixture.detectChanges();

    // Assert
    const cards = fixture.nativeElement.querySelectorAll('app-card');
    expect(cards.length).toBe(TEST_ITEMS.length);
  });
});
