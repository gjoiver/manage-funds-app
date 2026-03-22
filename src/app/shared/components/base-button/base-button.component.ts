import { Component, computed, input, output } from '@angular/core';
import { BUTTONS } from '@shared/constants';
import { ButtonTypes } from '@shared/entities';

@Component({
  selector: 'app-base-button',
  standalone: true,
  templateUrl: './base-button.component.html',
})
export class BaseButtonComponent {
  public label = input.required<string>();
  public style = input<ButtonTypes>(BUTTONS.Primary);
  public buttonClick = input<() => void>();
  public computedClasses = computed(() => {
    const baseClass =
      'cursor-pointer px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors focus:outline-none focus:ring-2';

    switch (this.style()) {
      case BUTTONS.Secondary:
        return `${baseClass} text-brand-secondary bg-transparent hover:bg-brand-surface focus:ring-brand-border`;
      case BUTTONS.Danger:
        return `${baseClass} text-white bg-brand-danger hover:opacity-90 focus:ring-brand-danger shadow-sm`;
      case BUTTONS.Primary:
      default:
        return `${baseClass} text-white bg-brand-primary hover:opacity-90 focus:ring-brand-primary shadow-sm`;
    }
  });

  public handleClick(event: Event) {
    event.stopPropagation();

    const callback = this.buttonClick();

    if (callback) {
      callback();
    }
  }
}
