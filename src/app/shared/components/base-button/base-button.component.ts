import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-base-button',
  standalone: true,
  templateUrl: './base-button.component.html',
})
export class BaseButtonComponent<T = unknown> {
  public label = input.required<string>();
  public buttonClick = input<() => void>();

  public handleClick(event: Event) {
    event.stopPropagation();

    const callback = this.buttonClick();

    if (callback) {
      callback();
    }
  }
}
