import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ApplicationRef } from '@angular/core';

export class ToastServiceMock {
  public success = jest.fn();
  public error = jest.fn();
  public warning = jest.fn();
  public info = jest.fn();
  public hide = jest.fn();
}

describe(`ToastService`, () => {
  let service: ToastService;
  let appRef: ApplicationRef;

  beforeEach(() => {
    jest.useFakeTimers();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
    appRef = TestBed.inject(ApplicationRef);
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => null as any);
    jest.spyOn(document.body, 'removeChild').mockImplementation(() => null as any);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    service.hide();
  });

  it(`Given the toast service
    When success is called
    Then attaches the toast view to the application`, () => {
    // Arrange
    jest.spyOn(appRef, 'attachView');

    // Act
    service.success('Operación exitosa');

    // Assert
    expect(appRef.attachView).toHaveBeenCalledTimes(1);
  });

  it(`Given the toast service
    When error is called
    Then attaches the toast view to the application`, () => {
    // Arrange
    jest.spyOn(appRef, 'attachView');

    // Act
    service.error('Ocurrió un error');

    // Assert
    expect(appRef.attachView).toHaveBeenCalledTimes(1);
  });

  it(`Given the toast service
    When warning is called
    Then attaches the toast view to the application`, () => {
    // Arrange
    jest.spyOn(appRef, 'attachView');

    // Act
    service.warning('Advertencia');

    // Assert
    expect(appRef.attachView).toHaveBeenCalledTimes(1);
  });

  it(`Given the toast service
    When info is called
    Then attaches the toast view to the application`, () => {
    // Arrange
    jest.spyOn(appRef, 'attachView');

    // Act
    service.info('Información');

    // Assert
    expect(appRef.attachView).toHaveBeenCalledTimes(1);
  });

  it(`Given the toast service
    When any typed method is called
    Then appends the toast element to the document body`, () => {
    // Arrange

    // Act
    service.success('Operación exitosa');

    // Assert
    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
  });

  it(`Given a toast is showing
    When the default duration elapses
    Then detaches the toast view automatically`, () => {
    // Arrange
    service.success('Operación exitosa');
    jest.spyOn(appRef, 'detachView');

    // Act
    jest.advanceTimersByTime(3000);

    // Assert
    expect(appRef.detachView).toHaveBeenCalledTimes(1);
  });

  it(`Given a toast is showing with a custom duration
    When that duration elapses
    Then detaches the toast view automatically`, () => {
    // Arrange
    service.success('Operación exitosa', 5000);
    jest.spyOn(appRef, 'detachView');

    // Act
    jest.advanceTimersByTime(5000);

    // Assert
    expect(appRef.detachView).toHaveBeenCalledTimes(1);
  });

  it(`Given a toast is showing
    When hide is called manually
    Then detaches the toast view from the application`, () => {
    // Arrange
    service.info('Información');
    jest.spyOn(appRef, 'detachView');

    // Act
    service.hide();

    // Assert
    expect(appRef.detachView).toHaveBeenCalledTimes(1);
  });

  it(`Given no toast is showing
    When hide is called
    Then does not throw`, () => {
    // Act & Assert
    expect(() => service.hide()).not.toThrow();
  });

  it(`Given a toast is already showing
    When a new toast is triggered
    Then detaches the previous toast before showing the new one`, () => {
    // Arrange
    service.info('Primer toast');
    jest.spyOn(appRef, 'detachView');

    // Act
    service.error('Segundo toast');

    // Assert
    expect(appRef.detachView).toHaveBeenCalledTimes(1);
  });

  it(`Given a toast is already showing
    When a new toast is triggered
    Then the new toast is appended to the document body`, () => {
    // Arrange
    service.info('Primer toast');

    // Act
    service.error('Segundo toast');

    // Assert
    expect(document.body.appendChild).toHaveBeenCalledTimes(2);
  });
});
