import { TestBed } from '@angular/core/testing';
import { FundsInteractor } from './funds.interactor';
import { GetFundsUseCase } from '../usecases/get-funds/get-funds.use-case';
import { SubscribeFundUseCase } from '../usecases/subscribe-fund/subscribe-fund.use-case';
import { UnsubscribeFundUseCase } from '../usecases/unsubscribe-fund/unsubscribe-fund.use-case';
import { GET_FUNDS_MOCK } from '@funds/data/mocks';

describe(`FundsInteractor`, () => {
  let interactor: FundsInteractor;
  let getFundsUseCaseMock: jest.Mocked<GetFundsUseCase>;
  let subscribeFundUseCaseMock: jest.Mocked<SubscribeFundUseCase>;
  let unsubscribeFundUseCaseMock: jest.Mocked<UnsubscribeFundUseCase>;

  beforeEach(() => {
    getFundsUseCaseMock = {
      execute: jest.fn().mockResolvedValue(GET_FUNDS_MOCK.data),
    } as unknown as jest.Mocked<GetFundsUseCase>;
    subscribeFundUseCaseMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<SubscribeFundUseCase>;
    unsubscribeFundUseCaseMock = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<UnsubscribeFundUseCase>;

    TestBed.configureTestingModule({
      providers: [
        FundsInteractor,
        { provide: GetFundsUseCase, useValue: getFundsUseCaseMock },
        { provide: SubscribeFundUseCase, useValue: subscribeFundUseCaseMock },
        { provide: UnsubscribeFundUseCase, useValue: unsubscribeFundUseCaseMock },
      ],
    });

    interactor = TestBed.inject(FundsInteractor);
  });

  it(`Given funds exist
    When getFunds is called
    Then returns funds from the use case`, async () => {
    // Arrange
    getFundsUseCaseMock.execute.mockResolvedValue(GET_FUNDS_MOCK.data);

    // Act
    const result = await interactor.getFunds();

    // Assert
    expect(result).toEqual(GET_FUNDS_MOCK.data);
  });

  it(`Given funds exist
    When getFunds is called
    Then delegates to GetFundsUseCase`, async () => {
    // Arrange

    // Act
    await interactor.getFunds();

    // Assert
    expect(getFundsUseCaseMock.execute).toHaveBeenCalledTimes(1);
  });

  it(`Given a fund id
    When subscribeFund is called
    Then resolves without errors`, async () => {
    // Arrange
    subscribeFundUseCaseMock.execute.mockResolvedValue(undefined);

    // Act & Assert
    await expect(interactor.subscribeFund(GET_FUNDS_MOCK.data[0].id)).resolves.toBeUndefined();
  });

  it(`Given a fund id
    When subscribeFund is called
    Then delegates to SubscribeFundUseCase with the fund id`, async () => {
    // Arrange
    // Act
    await interactor.subscribeFund(GET_FUNDS_MOCK.data[0].id);

    // Assert
    expect(subscribeFundUseCaseMock.execute).toHaveBeenCalledWith(GET_FUNDS_MOCK.data[0].id);
  });

  it(`Given a fund id
    When unsubscribeFund is called
    Then resolves without errors`, async () => {
    // Arrange
    unsubscribeFundUseCaseMock.execute.mockResolvedValue(undefined);

    // Act & Assert
    await expect(interactor.unsubscribeFund(GET_FUNDS_MOCK.data[0].id)).resolves.toBeUndefined();
  });

  it(`Given a fund id
    When unsubscribeFund is called
    Then delegates to UnsubscribeFundUseCase with the fund id`, async () => {
    // Arrange

    // Act
    await interactor.unsubscribeFund(GET_FUNDS_MOCK.data[0].id);

    // Assert
    expect(unsubscribeFundUseCaseMock.execute).toHaveBeenCalledWith(GET_FUNDS_MOCK.data[0].id);
  });
});
