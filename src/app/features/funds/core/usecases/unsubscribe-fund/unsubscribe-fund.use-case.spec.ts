import { TestBed } from '@angular/core/testing';
import { UnsubscribeFundUseCase } from './unsubscribe-fund.use-case';
import { FundsRepositoryMock, GET_FUNDS_MOCK } from '@funds/data/mocks';
import { FundsRepository } from '@funds/core/repositories/funds.repository';

describe(`UnsubscribeFundUseCase`, () => {
  let useCase: UnsubscribeFundUseCase;
  let repositoryMock: FundsRepository;

  const fund = GET_FUNDS_MOCK.data[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnsubscribeFundUseCase,
        { provide: FundsRepository, useClass: FundsRepositoryMock },
      ],
    });

    useCase = TestBed.inject(UnsubscribeFundUseCase);
    repositoryMock = TestBed.inject(FundsRepository);
  });

  it(`Given a subscribed fund id
    When execute is called
    Then resolves without errors`, async () => {
    // Arrange
    jest.spyOn(repositoryMock, 'unsubscribeFund');

    // Act & Assert
    await expect(useCase.execute(fund.id)).resolves.toBeUndefined();
  });

  it(`Given a subscribed fund id
    When execute is called
    Then delegates to the repository with the fund id`, async () => {
    // Arrange
    const fundId = fund.id;
    jest.spyOn(repositoryMock, 'unsubscribeFund');

    // Act
    await useCase.execute(fundId);

    // Assert
    expect(repositoryMock.unsubscribeFund).toHaveBeenCalledWith(fundId);
  });

  it(`Given the repository rejects the unsubscription
    When execute is called
    Then propagates the rejection`, async () => {
    // Arrange
    const error = new Error('Unsubscription failed');
    jest.spyOn(repositoryMock, 'unsubscribeFund').mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(fund.id)).rejects.toThrow('Unsubscription failed');
  });
});
