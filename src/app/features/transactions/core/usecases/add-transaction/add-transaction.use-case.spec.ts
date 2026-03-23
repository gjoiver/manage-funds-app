import { TestBed } from '@angular/core/testing';
import { AddTransactionUseCase } from './add-transaction.use-case';
import { TransactionsRepository } from '../../repositories/transactions.repository';
import { TransactionsRepositoryMock, TRANSACTION_MOCK } from '@transactions/data/mocks';

describe(`AddTransactionUseCase`, () => {
  let useCase: AddTransactionUseCase;
  let repository: TransactionsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddTransactionUseCase,
        { provide: TransactionsRepository, useClass: TransactionsRepositoryMock },
      ],
    });

    useCase = TestBed.inject(AddTransactionUseCase);
    repository = TestBed.inject(TransactionsRepository);
  });

  it(`Given a valid transaction
    When execute is called
    Then resolves without errors`, async () => {
    // Act & Assert
    await expect(useCase.execute(TRANSACTION_MOCK)).resolves.toBeUndefined();
  });

  it(`Given a valid transaction
    When execute is called
    Then delegates to the repository with the transaction`, async () => {
    // Arrange
    jest.spyOn(repository, 'addTransaction');

    // Act
    await useCase.execute(TRANSACTION_MOCK);

    // Assert
    expect(repository.addTransaction).toHaveBeenCalledWith(TRANSACTION_MOCK);
  });

  it(`Given the repository rejects the addition
    When execute is called
    Then propagates the rejection`, async () => {
    // Arrange
    const error = new Error('Add transaction failed');
    jest.spyOn(repository, 'addTransaction').mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(TRANSACTION_MOCK)).rejects.toThrow('Add transaction failed');
  });
});
