import { Component, input, signal } from '@angular/core';
import { RadioButtonComponent } from '@shared/components/radio-button/radio-button.component';
import { NOTIFICATION_METHOD_LABELS, NotificationEntity } from '@shared/entities';
import { NOTIFICATIONS_TYPES } from '@shared/constants';

@Component({
  selector: 'app-notification-chooser',
  standalone: true,
  templateUrl: './notification-chooser.component.html',
  imports: [RadioButtonComponent],
})
export class NotificationChooserComponent {
  public onSelect = input<(value: NotificationEntity) => void>();

  protected selected = signal<NotificationEntity>(NOTIFICATIONS_TYPES.Email);
  public readonly NOTIFICATIONS_TYPES = NOTIFICATIONS_TYPES;
  public readonly NOTIFICATION_LABELS = NOTIFICATION_METHOD_LABELS;
  public readonly title = 'Método de notificación';

  protected selectOption(value: string): void {
    const notification = value as NotificationEntity;
    this.selected.set(notification);
    this.onSelect()?.(notification);
  }
}
