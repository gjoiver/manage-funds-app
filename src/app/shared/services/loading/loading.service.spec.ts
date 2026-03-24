import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { ApplicationRef } from '@angular/core';

export class LoadingServiceMock {
  public show = jest.fn();
  public hide = jest.fn();
}

describe(`LoadingService`, () => {
  let service: LoadingService;
  let appRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
    appRef = TestBed.inject(ApplicationRef);
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => null as any);
    jest.spyOn(document.body, 'removeChild').mockImplementation(() => null as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    service.hide();
  });

  it(`Given the loading service
    When show is called
    Then attaches the loading view to the application`, () => {
    // Arrange
    jest.spyOn(appRef, 'attachView');

    // Act
    service.show();

    // Assert
    expect(appRef.attachView).toHaveBeenCalledTimes(1);
  });

  it(`Given the loading service
    When show is called
    Then appends the loading element to the document body`, () => {
    // Arrange

    // Act
    service.show();

    // Assert
    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
  });

  it(`Given the loading overlay is showing
    When show is called again
    Then does not create a second instance`, () => {
    // Arrange
    service.show();
    jest.spyOn(appRef, 'attachView');

    // Act
    service.show();

    // Assert
    expect(appRef.attachView).not.toHaveBeenCalled();
  });

  it(`Given the loading overlay is showing
    When hide is called
    Then detaches the loading view from the application`, () => {
    // Arrange
    service.show();
    jest.spyOn(appRef, 'detachView');

    // Act
    service.hide();

    // Assert
    expect(appRef.detachView).toHaveBeenCalledTimes(1);
  });

  it(`Given no loading overlay is showing
    When hide is called
    Then does not throw`, () => {
    // Act & Assert
    expect(() => service.hide()).not.toThrow();
  });

  it(`Given the loading overlay is shown with a custom message
    When show is called with a message parameter
    Then accepts the message without errors`, () => {
    // Arrange
    const customMessage = 'Cargando fondos...';

    // Act & Assert
    expect(() => service.show(customMessage)).not.toThrow();
  });
});
