import { Component, computed, input } from '@angular/core';
import { BUTTONS } from '@shared/constants';
import { ButtonEntity } from '@shared/entities';
import { BaseButtonConfig } from './base-button.config';

@Component({
  selector: 'app-base-button',
  standalone: true,
  templateUrl: './base-button.component.html',
})
export class BaseButtonComponent {
  public label = input.required<string>();
  public style = input<ButtonEntity>(BUTTONS.Primary);
  public buttonClick = input<() => void>();

  public computedClasses = computed(
    () => `${BaseButtonConfig.baseClasses} ${BaseButtonConfig.buttonStyles[this.style()]}`,
  );

  public handleClick(event: Event) {
    event.stopPropagation();

    const callback = this.buttonClick();

    if (callback) {
      callback();
    }
  }
}
