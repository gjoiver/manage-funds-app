import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { TransactionsInteractor } from '@transactions/core/interactor';
import { TRANSACTIONS_MOCK } from '@transactions/data/mocks/transaction.mock';

describe(`Transactions HomePage`, () => {
  let fixture: ComponentFixture<HomePage>;
  let component: HomePage;
  let transactionsInteractorMock: jest.Mocked<TransactionsInteractor>;

  beforeEach(async () => {
    transactionsInteractorMock = {
      getTransactions: jest.fn(),
      addTransaction: jest.fn(),
    } as unknown as jest.Mocked<TransactionsInteractor>;

    await TestBed.configureTestingModule({
      imports: [HomePage],
    })
      .overrideComponent(HomePage, {
        set: {
          providers: [{ provide: TransactionsInteractor, useValue: transactionsInteractorMock }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it(`Given the component is created
    When ngOnInit runs
    Then calls getTransactions once`, async () => {
    // Arrange
    transactionsInteractorMock.getTransactions.mockResolvedValue(TRANSACTIONS_MOCK);

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(transactionsInteractorMock.getTransactions).toHaveBeenCalledTimes(1);
  });

  it(`Given transactions are loaded
    When ngOnInit completes
    Then the transactions signal is populated`, async () => {
    // Arrange
    transactionsInteractorMock.getTransactions.mockResolvedValue(TRANSACTIONS_MOCK);

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(component['transactions']()).toEqual(TRANSACTIONS_MOCK);
  });

  it(`Given the component initializes
    When loading completes
    Then isLoading is reset to false`, async () => {
    // Arrange
    transactionsInteractorMock.getTransactions.mockResolvedValue(TRANSACTIONS_MOCK);

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(component['isLoading']()).toBe(false);
  });

  it(`Given getTransactions rejects with an error
    When ngOnInit handles the error
    Then isLoading is reset to false`, async () => {
    // Arrange
    transactionsInteractorMock.getTransactions.mockRejectedValue(new Error('Network error'));

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(component['isLoading']()).toBe(false);
  });

  it(`Given the component renders before any data loads
    When transactions signal is checked
    Then starts as an empty array`, () => {
    // Arrange (no detectChanges called yet)

    // Act
    const transactions = component['transactions']();

    // Assert
    expect(transactions).toEqual([]);
  });
});
