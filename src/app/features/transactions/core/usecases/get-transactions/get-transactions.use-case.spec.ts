import { TestBed } from '@angular/core/testing';
import { GetTransactionsUseCase } from './get-transactions.use-case';
import { TransactionsRepository } from '../../repositories/transactions.repository';
import { TransactionsRepositoryMock, TRANSACTIONS_MOCK } from '@transactions/data/mocks';

describe(`GetTransactionsUseCase`, () => {
  let useCase: GetTransactionsUseCase;
  let repository: TransactionsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetTransactionsUseCase,
        { provide: TransactionsRepository, useClass: TransactionsRepositoryMock },
      ],
    });

    useCase = TestBed.inject(GetTransactionsUseCase);
    repository = TestBed.inject(TransactionsRepository);
  });

  it(`Given transactions available in the repository
    When execute is called
    Then returns the list of transactions`, async () => {
    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual(TRANSACTIONS_MOCK);
  });

  it(`Given transactions available in the repository
    When execute is called
    Then delegates to the repository once`, async () => {
    // Arrange
    jest.spyOn(repository, 'getTransactions');

    // Act
    await useCase.execute();

    // Assert
    expect(repository.getTransactions).toHaveBeenCalledTimes(1);
  });

  it(`Given the repository returns an empty list
    When execute is called
    Then returns an empty array`, async () => {
    // Arrange
    jest.spyOn(repository, 'getTransactions').mockResolvedValue([]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual([]);
  });
});
