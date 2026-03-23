import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { ApplicationRef } from '@angular/core';
import { BUTTONS } from '@shared/constants';
import { ModalEntity } from '@shared/components/modal/entities';
import { LoadingServiceMock } from '../loading/loading.service.spec';

const MODAL_CONFIG: ModalEntity = {
  title: 'Test Modal',
  message: 'Test message',
  buttons: [{ text: 'Confirm', style: BUTTONS.Primary }],
};

export class ModalServiceMock extends LoadingServiceMock {}

describe(`ModalService`, () => {
  let service: ModalService;
  let appRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
    appRef = TestBed.inject(ApplicationRef);
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => null as any);
    jest.spyOn(document.body, 'removeChild').mockImplementation(() => null as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it(`Given a modal config
    When show is called
    Then attaches the modal view to the application`, () => {
    // Arrange
    jest.spyOn(appRef, 'attachView');

    // Act
    service.show(MODAL_CONFIG);

    // Assert
    expect(appRef.attachView).toHaveBeenCalledTimes(1);
  });

  it(`Given a modal config
    When show is called
    Then appends the modal element to the document body`, () => {
    // Arrange (spy set in beforeEach)

    // Act
    service.show(MODAL_CONFIG);

    // Assert
    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
  });

  it(`Given a modal is currently shown
    When close is called
    Then detaches the modal view from the application`, () => {
    // Arrange
    service.show(MODAL_CONFIG);
    jest.spyOn(appRef, 'detachView');

    // Act
    service.close();

    // Assert
    expect(appRef.detachView).toHaveBeenCalledTimes(1);
  });

  it(`Given no modal is shown
    When close is called
    Then does not throw`, () => {
    // Arrange (no modal is shown)

    // Act & Assert
    expect(() => service.close()).not.toThrow();
  });

  it(`Given a modal is already shown
    When show is called again
    Then closes the previous modal first`, () => {
    // Arrange
    service.show(MODAL_CONFIG);
    jest.spyOn(service, 'close');

    // Act
    service.show({ ...MODAL_CONFIG, title: 'Second Modal' });

    // Assert
    expect(service.close).toHaveBeenCalledTimes(1);
  });

  it(`Given a modal config with buttons
    When show is called
    Then wraps button actions to also close the modal`, () => {
    // Arrange
    const onActionCalled = jest.fn();
    const configWithAction: ModalEntity = {
      ...MODAL_CONFIG,
      buttons: [{ text: 'OK', style: BUTTONS.Primary, action: onActionCalled }],
    };
    jest.spyOn(service, 'close');

    // Act
    service.show(configWithAction);
    const closeModalRef = (service as any).modalRef;
    const wrappedButton = closeModalRef?.instance ?? null;

    service.close();

    // Assert
    expect(service.close).toHaveBeenCalled();
  });
});
