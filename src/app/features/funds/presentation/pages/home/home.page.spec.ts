import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { FundsInteractor } from '@funds/core/interactor/funds.interactor';
import { AccountStore } from '@funds/core/store/account.store';
import { ModalService } from '@shared/services';
import { LoadingService } from '@shared/services';
import { createModalServiceMock } from '@shared/data/mocks/modal-service.mock';
import { createLoadingServiceMock } from '@shared/data/mocks/loading-service.mock';
import { GET_FUNDS_MOCK } from '@funds/data/mocks';
import { NOTIFICATIONS_TYPES } from '@shared/constants';
import { RouterModule } from '@angular/router';

describe(`Funds HomePage`, () => {
  let fixture: ComponentFixture<HomePage>;
  let component: HomePage;
  let fundsInteractorMock: jest.Mocked<FundsInteractor>;
  let accountStore: AccountStore;
  let modalServiceMock: jest.Mocked<ModalService>;
  let loadingServiceMock: jest.Mocked<LoadingService>;

  const fund = GET_FUNDS_MOCK.data[0];

  beforeEach(async () => {
    fundsInteractorMock = {
      getFunds: jest.fn(),
      subscribeFund: jest.fn(),
      unsubscribeFund: jest.fn(),
    } as unknown as jest.Mocked<FundsInteractor>;
    modalServiceMock = createModalServiceMock();
    loadingServiceMock = createLoadingServiceMock();

    await TestBed.configureTestingModule({
      imports: [HomePage, RouterModule.forRoot([])],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: LoadingService, useValue: loadingServiceMock },
      ],
    })
      .overrideComponent(HomePage, {
        set: {
          providers: [{ provide: FundsInteractor, useValue: fundsInteractorMock }],
        },
      })
      .compileComponents();

    accountStore = TestBed.inject(AccountStore);
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it(`Given the component is created
    When ngOnInit runs
    Then calls getFunds once`, async () => {
    // Arrange
    fundsInteractorMock.getFunds.mockResolvedValue(GET_FUNDS_MOCK.data);

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(fundsInteractorMock.getFunds).toHaveBeenCalledTimes(1);
  });

  it(`Given funds are loaded
    When ngOnInit completes
    Then the funds signal is populated`, async () => {
    // Arrange
    fundsInteractorMock.getFunds.mockResolvedValue(GET_FUNDS_MOCK.data);

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(component['funds']()).toEqual(GET_FUNDS_MOCK.data);
  });

  it(`Given a subscribed fund
    When hasSubscription is called
    Then returns true`, () => {
    // Arrange
    accountStore.subscribeToFund(fund, NOTIFICATIONS_TYPES.Email);

    // Act
    const result = component.hasSubscription(fund);

    // Assert
    expect(result).toBe(true);
  });

  it(`Given a fund that is not subscribed
    When hasSubscription is called
    Then returns false`, () => {
    // Arrange (fund is not subscribed)

    // Act
    const result = component.hasSubscription(fund);

    // Assert
    expect(result).toBe(false);
  });

  it(`Given a fund with minAmount below the current balance
    When hasEnoughBalance is called
    Then returns true`, () => {
    // Arrange
    const cheapFund = { ...fund, minAmount: 100 };

    // Act
    const result = component.hasEnoughBalance(cheapFund);

    // Assert
    expect(result).toBe(true);
  });

  it(`Given a subscribed fund
    When handleSubscription is called
    Then shows the unsubscribe confirmation modal`, () => {
    // Arrange
    accountStore.subscribeToFund(fund, NOTIFICATIONS_TYPES.Email);

    // Act
    component.handleSubscription(fund);

    // Assert
    expect(modalServiceMock.show).toHaveBeenCalledTimes(1);
  });

  it(`Given an unsubscribed fund with sufficient balance
    When handleSubscription is called
    Then shows the notification chooser modal`, () => {
    // Arrange

    // Act
    component.handleSubscription(fund);

    // Assert
    expect(modalServiceMock.show).toHaveBeenCalledTimes(1);
  });

  it(`Given an unsubscribed fund with insufficient balance
    When handleSubscription is called
    Then shows the not enough money modal`, () => {
    // Arrange
    const expensiveFund = { ...fund, minAmount: 1_000_000 };

    // Act
    component.handleSubscription(expensiveFund);

    // Assert
    expect(modalServiceMock.show).toHaveBeenCalledWith(
      expect.objectContaining({ title: '¡No tienes fondos suficientes!' }),
    );
  });

  it(`Given getFunds rejects with an error
    When ngOnInit handles the error
    Then isLoading is reset to false`, async () => {
    // Arrange
    fundsInteractorMock.getFunds.mockRejectedValue(new Error('Network error'));

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(component['isLoading']()).toBe(false);
  });

  it(`Given an unsubscribed fund with sufficient balance
    When confirmSubscription is called directly
    Then calls fundsInteractor.subscribeFund`, async () => {
    // Arrange
    fundsInteractorMock.subscribeFund.mockResolvedValue(undefined);

    // Act
    await component['confirmSubscription'](fund);

    // Assert
    expect(fundsInteractorMock.subscribeFund).toHaveBeenCalledWith(fund.id);
  });

  it(`Given a subscribed fund
    When unsubscribeFund is called directly
    Then calls fundsInteractor.unsubscribeFund`, async () => {
    // Arrange
    accountStore.subscribeToFund(fund, NOTIFICATIONS_TYPES.Email);
    fundsInteractorMock.unsubscribeFund.mockResolvedValue(undefined);

    // Act
    await component['unsubscribeFund'](fund);

    // Assert
    expect(fundsInteractorMock.unsubscribeFund).toHaveBeenCalledWith(fund.id);
  });

  it(`Given a fund to subscribe
    When confirmSubscription succeeds
    Then updates the accountStore subscription`, async () => {
    // Arrange
    fundsInteractorMock.subscribeFund.mockResolvedValue(undefined);

    // Act
    await component['confirmSubscription'](fund);

    // Assert
    expect(accountStore.hasSubscription(fund.id)).toBe(true);
  });

  it(`Given a subscribed fund
    When unsubscribeFund succeeds
    Then removes subscription from accountStore`, async () => {
    // Arrange
    accountStore.subscribeToFund(fund, NOTIFICATIONS_TYPES.Email);
    fundsInteractorMock.unsubscribeFund.mockResolvedValue(undefined);

    // Act
    await component['unsubscribeFund'](fund);

    // Assert
    expect(accountStore.hasSubscription(fund.id)).toBe(false);
  });
});
