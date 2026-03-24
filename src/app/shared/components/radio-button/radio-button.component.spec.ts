import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioButtonComponent } from './radio-button.component';

describe(`RadioButtonComponent`, () => {
  let fixture: ComponentFixture<RadioButtonComponent>;
  let component: RadioButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'notification');
    fixture.componentRef.setInput('value', 'email');
    fixture.componentRef.setInput('label', 'Email');
    fixture.detectChanges();
  });

  it(`Given required inputs
    When the component is created
    Then it initializes successfully`, () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it(`Given checked input is false by default
    When the component renders
    Then the radio input is unchecked`, () => {
    // Arrange
    const input = fixture.nativeElement.querySelector('input[type="radio"]') as HTMLInputElement;

    // Act
    fixture.detectChanges();

    // Assert
    expect(input.checked).toBe(false);
  });

  it(`Given checked input is set to true
    When the component renders
    Then the radio input is checked`, () => {
    // Arrange
    fixture.componentRef.setInput('checked', true);

    // Act
    fixture.detectChanges();

    // Assert
    const input = fixture.nativeElement.querySelector('input[type="radio"]') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it(`Given a value input
    When the radio button changes
    Then valueChange emits the value`, () => {
    // Arrange
    const emittedValues: string[] = [];
    component.valueChange.subscribe((v) => emittedValues.push(v));

    // Act
    component['onChange']();

    // Assert
    expect(emittedValues).toContain('email');
  });

  it(`Given the label input
    When the component renders
    Then the label text is displayed`, () => {
    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement.textContent).toContain('Email');
  });
});
