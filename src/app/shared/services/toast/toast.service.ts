import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { ToastComponent } from '@shared/components';
import { ToastEntity } from '@shared/components/toast/entities';
import { TOAST_TYPES, ToastType } from '@shared/constants';

const DEFAULT_DURATION = 3000;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private toastRef: ComponentRef<ToastComponent> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  public success(message: string, duration?: number): void {
    this.render({ message, duration }, TOAST_TYPES.Success);
  }

  public error(message: string, duration?: number): void {
    this.render({ message, duration }, TOAST_TYPES.Error);
  }

  public warning(message: string, duration?: number): void {
    this.render({ message, duration }, TOAST_TYPES.Warning);
  }

  public info(message: string, duration?: number): void {
    this.render({ message, duration }, TOAST_TYPES.Info);
  }

  public hide(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }

    if (!this.toastRef) return;
    this.appRef.detachView(this.toastRef.hostView);
    this.toastRef.destroy();
    this.toastRef = null;
  }

  private render(config: ToastEntity, type: ToastType): void {
    if (this.toastRef) this.hide();

    this.toastRef = createComponent(ToastComponent, { environmentInjector: this.injector });
    this.toastRef.setInput('message', config.message);
    this.toastRef.setInput('type', type);

    this.appRef.attachView(this.toastRef.hostView);
    document.body.appendChild(this.toastRef.location.nativeElement);

    this.hideTimer = setTimeout(() => this.hide(), config.duration ?? DEFAULT_DURATION);
  }
}
