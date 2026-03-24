import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { ModalComponent } from '@shared/components';
import { ModalButton, ModalEntity } from '@shared/components/modal/entities';
import { BUTTONS } from '@shared/constants';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private modalRef: ComponentRef<ModalComponent> | null = null;

  public show(config: ModalEntity): void {
    if (this.modalRef) this.close();

    this.modalRef = createComponent(ModalComponent, { environmentInjector: this.injector });

    this.modalRef.setInput('title', config.title);
    if (config.message) this.modalRef.setInput('message', config.message);
    if (config.contentComponent) this.modalRef.setInput('contentComponent', config.contentComponent);

    const wrappedButtons: ModalButton[] = config.buttons.map((btn) => ({
      text: btn.text,
      style: btn.style || BUTTONS.Primary,
      action: () => {
        if (btn.action) btn.action();
        this.close();
      },
    }));

    this.modalRef.setInput('buttons', wrappedButtons);

    this.appRef.attachView(this.modalRef.hostView);
    document.body.appendChild(this.modalRef.location.nativeElement);
  }

  public close(): void {
    if (!this.modalRef) return;
    this.appRef.detachView(this.modalRef.hostView);
    this.modalRef.destroy();
    this.modalRef = null;
  }
}
