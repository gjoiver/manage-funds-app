import { TestBed } from '@angular/core/testing';
import { FundsImplementationRepository } from './funds-implementation.repository';
import { FundsRepository } from '@funds/core/repositories/funds.repository';

describe(`FundsImplementationRepository`, () => {
  let repository: FundsImplementationRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FundsImplementationRepository,
        { provide: FundsRepository, useClass: FundsImplementationRepository },
      ],
    });
    repository = TestBed.inject(FundsImplementationRepository);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it(`Given the repository is initialized
    When getFunds is called
    Then returns a promise`, () => {
    // Arrange (repository configured in beforeEach)

    // Act
    const result = repository.getFunds();

    // Assert
    expect(result).toBeInstanceOf(Promise);
  });

  it(`Given the repository is initialized
    When getFunds resolves after delay
    Then returns the list of funds`, async () => {
    // Arrange
    const promise = repository.getFunds();

    // Act
    jest.advanceTimersByTime(2000);

    // Assert
    const result = await promise;
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it(`Given the repository is initialized
    When subscribeFund is called
    Then returns a promise`, () => {
    // Arrange (repository configured in beforeEach)

    // Act
    const result = repository.subscribeFund(1);

    // Assert
    expect(result).toBeInstanceOf(Promise);
  });

  it(`Given the repository is initialized
    When subscribeFund resolves after delay
    Then resolves without errors`, async () => {
    // Arrange
    const promise = repository.subscribeFund(1);

    // Act
    jest.advanceTimersByTime(2000);

    // Assert
    await expect(promise).resolves.toBeUndefined();
  });

  it(`Given the repository is initialized
    When unsubscribeFund resolves after delay
    Then resolves without errors`, async () => {
    // Arrange
    const promise = repository.unsubscribeFund(1);

    // Act
    jest.advanceTimersByTime(2000);

    // Assert
    await expect(promise).resolves.toBeUndefined();
  });
});
