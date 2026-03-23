import { TestBed } from '@angular/core/testing';
import { GetFundsUseCase } from './get-funds.use-case';
import { FundsRepositoryMock, GET_FUNDS_MOCK } from '@funds/data/mocks';
import { FundsRepository } from '@funds/core/repositories/funds.repository';

describe(`GetFundsUseCase`, () => {
  let useCase: GetFundsUseCase;
  let repository: FundsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetFundsUseCase, { provide: FundsRepository, useClass: FundsRepositoryMock }],
    });

    useCase = TestBed.inject(GetFundsUseCase);
    repository = TestBed.inject(FundsRepository);
  });

  it(`Given funds available in the repository
    When execute is called
    Then returns the list of funds`, async () => {
    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual(GET_FUNDS_MOCK.data);
  });

  it(`Given funds available in the repository
    When execute is called
    Then delegates to the repository once`, async () => {
    // Arrange
    jest.spyOn(repository, 'getFunds');

    // Act
    await useCase.execute();

    // Assert
    expect(repository.getFunds).toHaveBeenCalledTimes(1);
  });

  it(`Given the repository returns an empty list
    When execute is called
    Then returns an empty array`, async () => {
    // Arrange
    jest.spyOn(repository, 'getFunds').mockResolvedValue([]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual([]);
  });
});
