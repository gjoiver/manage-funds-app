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
      'px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors focus:outline-none focus:ring-2';

    switch (this.style()) {
      case BUTTONS.Secondary:
        return `${baseClass} text-slate-500 hover:bg-slate-200 focus:ring-slate-300`;
      case BUTTONS.Danger:
        return `${baseClass} text-white bg-rose-600 hover:bg-rose-700 focus:ring-rose-400 shadow-sm`;
      case BUTTONS.Primary:
      default:
        return `${baseClass} text-white bg-slate-900 hover:bg-slate-800 focus:ring-slate-400 shadow-sm`;
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
