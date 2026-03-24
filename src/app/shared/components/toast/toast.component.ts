import { Component, computed, input } from '@angular/core';
import { ToastType } from '@shared/constants';
import { TOAST_COLOR_CLASSES, TOAST_ICON_PATHS } from './toast.component.config';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  public message = input.required<string>();
  public type = input<ToastType>('info');

  public readonly colorClasses = computed(() => TOAST_COLOR_CLASSES[this.type()]);
  public readonly iconPath = computed(() => TOAST_ICON_PATHS[this.type()]);
}
