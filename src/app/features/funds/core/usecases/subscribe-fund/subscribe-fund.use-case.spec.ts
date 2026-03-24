import { TestBed } from '@angular/core/testing';
import { SubscribeFundUseCase } from './subscribe-fund.use-case';
import { FundsRepositoryMock, GET_FUNDS_MOCK } from '@funds/data/mocks';
import { FundsRepository } from '@funds/core/repositories/funds.repository';

describe(`SubscribeFundUseCase`, () => {
  let useCase: SubscribeFundUseCase;
  let repositoryMock: FundsRepository;

  const fund = GET_FUNDS_MOCK.data[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubscribeFundUseCase,
        { provide: FundsRepository, useClass: FundsRepositoryMock },
      ],
    });

    useCase = TestBed.inject(SubscribeFundUseCase);
    repositoryMock = TestBed.inject(FundsRepository);
  });

  it(`Given a valid fund id
    When execute is called
    Then resolves without errors`, async () => {
    // Arrange
    jest.spyOn(repositoryMock, 'subscribeFund');

    // Act & Assert
    await expect(useCase.execute(fund.id)).resolves.toBeUndefined();
  });

  it(`Given a valid fund id
    When execute is called
    Then delegates to the repository with the fund id`, async () => {
    // Arrange
    const fundId = fund.id;
    jest.spyOn(repositoryMock, 'subscribeFund');

    // Act
    await useCase.execute(fundId);

    // Assert
    expect(repositoryMock.subscribeFund).toHaveBeenCalledWith(fundId);
  });

  it(`Given the repository rejects the subscription
    When execute is called
    Then propagates the rejection`, async () => {
    // Arrange
    const error = new Error('Subscription failed');
    jest.spyOn(repositoryMock, 'subscribeFund').mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(fund.id)).rejects.toThrow('Subscription failed');
  });
});
