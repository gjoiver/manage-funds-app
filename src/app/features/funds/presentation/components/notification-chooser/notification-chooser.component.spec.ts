import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationChooserComponent } from './notification-chooser.component';
import { NOTIFICATIONS_TYPES } from '@shared/constants';

describe(`NotificationChooserComponent`, () => {
  let fixture: ComponentFixture<NotificationChooserComponent>;
  let component: NotificationChooserComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationChooserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Given the component is initialized
    When rendered
    Then creates successfully`, () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it(`Given the initial state
    When selected is accessed
    Then email is the default selection`, () => {
    // Act
    const selected = component['selected']();

    // Assert
    expect(selected).toBe(NOTIFICATIONS_TYPES.Email);
  });

  it(`Given the sms option value
    When selectOption is called
    Then updates the selected notification to sms`, () => {
    // Arrange
    const smsValue = NOTIFICATIONS_TYPES.Sms;

    // Act
    component['selectOption'](smsValue);

    // Assert
    expect(component['selected']()).toBe(NOTIFICATIONS_TYPES.Sms);
  });

  it(`Given an onSelect callback
    When selectOption is called
    Then invokes the callback with the selected notification`, () => {
    // Arrange
    const onSelect = jest.fn();
    fixture.componentRef.setInput('onSelect', onSelect);
    fixture.detectChanges();

    // Act
    component['selectOption'](NOTIFICATIONS_TYPES.Sms);

    // Assert
    expect(onSelect).toHaveBeenCalledWith(NOTIFICATIONS_TYPES.Sms);
  });

  it(`Given no onSelect callback
    When selectOption is called
    Then does not throw`, () => {
    // Act & Assert
    expect(() => component['selectOption'](NOTIFICATIONS_TYPES.Email)).not.toThrow();
  });

  it(`Given the component renders
    When the title is displayed
    Then shows the correct title text`, () => {
    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement.textContent).toContain('Método de notificación');
  });
});
