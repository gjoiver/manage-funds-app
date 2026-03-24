import { TestBed } from '@angular/core/testing';
import { TransactionsInteractor } from './transactions.interactor';
import { GetTransactionsUseCase } from '../usecases/get-transactions/get-transactions.use-case';
import { AddTransactionUseCase } from '../usecases/add-transaction/add-transaction.use-case';
import { TRANSACTIONS_MOCK, TRANSACTION_MOCK } from '@transactions/data/mocks/transaction.mock';

describe(`TransactionsInteractor`, () => {
  let interactor: TransactionsInteractor;
  let getTransactionsUseCaseMock: jest.Mocked<GetTransactionsUseCase>;
  let addTransactionUseCaseMock: jest.Mocked<AddTransactionUseCase>;

  beforeEach(() => {
    getTransactionsUseCaseMock = {
      execute: jest.fn().mockResolvedValue(TRANSACTIONS_MOCK),
    } as unknown as jest.Mocked<GetTransactionsUseCase>;
    addTransactionUseCaseMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<AddTransactionUseCase>;

    TestBed.configureTestingModule({
      providers: [
        TransactionsInteractor,
        { provide: GetTransactionsUseCase, useValue: getTransactionsUseCaseMock },
        { provide: AddTransactionUseCase, useValue: addTransactionUseCaseMock },
      ],
    });

    interactor = TestBed.inject(TransactionsInteractor);
  });

  it(`Given transactions exist
    When getTransactions is called
    Then returns transactions from the use case`, async () => {
    // Arrange
    getTransactionsUseCaseMock.execute.mockResolvedValue(TRANSACTIONS_MOCK);

    // Act
    const result = await interactor.getTransactions();

    // Assert
    expect(result).toEqual(TRANSACTIONS_MOCK);
  });

  it(`Given transactions exist
    When getTransactions is called
    Then delegates to GetTransactionsUseCase`, async () => {
    // Arrange (spy already configured)

    // Act
    await interactor.getTransactions();

    // Assert
    expect(getTransactionsUseCaseMock.execute).toHaveBeenCalledTimes(1);
  });

  it(`Given a valid transaction
    When addTransaction is called
    Then resolves without errors`, async () => {
    // Arrange
    addTransactionUseCaseMock.execute.mockResolvedValue(undefined);

    // Act & Assert
    await expect(interactor.addTransaction(TRANSACTION_MOCK)).resolves.toBeUndefined();
  });

  it(`Given a valid transaction
    When addTransaction is called
    Then delegates to AddTransactionUseCase with the transaction`, async () => {
    // Arrange
    const transaction = TRANSACTION_MOCK;

    // Act
    await interactor.addTransaction(transaction);

    // Assert
    expect(addTransactionUseCaseMock.execute).toHaveBeenCalledWith(transaction);
  });
});
