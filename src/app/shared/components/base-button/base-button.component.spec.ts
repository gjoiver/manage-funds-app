import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseButtonComponent } from './base-button.component';
import { BUTTONS } from '@shared/constants';

describe(`BaseButtonComponent`, () => {
  let fixture: ComponentFixture<BaseButtonComponent>;
  let component: BaseButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Click me');
    fixture.detectChanges();
  });

  it(`Given a label input
    When the component is created
    Then it initializes successfully`, () => {
    // Arrange

    // Act

    // Assert
    expect(component).toBeTruthy();
  });

  it(`Given the label input
    When the component renders
    Then the button displays the label text`, () => {
    // Arrange

    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement.textContent).toContain('Click me');
  });

  it(`Given no style input
    When computedClasses is evaluated
    Then applies primary button styles`, () => {
    // Arrange

    // Act
    const classes = component.computedClasses();

    // Assert
    expect(classes).toContain('bg-brand-primary');
  });

  it(`Given the danger style
    When computedClasses is evaluated
    Then applies danger button styles`, () => {
    // Arrange
    fixture.componentRef.setInput('style', BUTTONS.Danger);

    // Act
    const classes = component.computedClasses();

    // Assert
    expect(classes).toContain('bg-brand-danger');
  });

  it(`Given the secondary style
    When computedClasses is evaluated
    Then applies secondary button styles`, () => {
    // Arrange
    fixture.componentRef.setInput('style', BUTTONS.Secondary);

    // Act
    const classes = component.computedClasses();

    // Assert
    expect(classes).toContain('bg-transparent');
  });

  it(`Given a buttonClick callback
    When the button is clicked
    Then invokes the callback`, () => {
    // Arrange
    const callback = jest.fn();
    fixture.componentRef.setInput('buttonClick', callback);
    fixture.detectChanges();

    // Act
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    // Assert
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it(`Given a button click event
    When onClick is called
    Then stops event propagation`, () => {
    // Arrange
    const mockEvent = { stopPropagation: jest.fn() } as unknown as Event;

    // Act
    component.onClick(mockEvent);

    // Assert
    expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1);
  });

  it(`Given no buttonClick callback
    When onClick is called
    Then does not throw`, () => {
    // Arrange
    const mockEvent = { stopPropagation: jest.fn() } as unknown as Event;

    // Act & Assert
    expect(() => component.onClick(mockEvent)).not.toThrow();
  });
});
