import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  templateUrl: './radio-button.component.html',
})
export class RadioButtonComponent {
  public name = input.required<string>();
  public value = input.required<string>();
  public label = input.required<string>();
  public checked = input<boolean>(false);
  public valueChange = output<string>();

  protected onChange(): void {
    this.valueChange.emit(this.value());
  }
}
