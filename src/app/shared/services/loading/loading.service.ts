import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { LoadingComponent } from '@shared/components';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private loadingRef: ComponentRef<LoadingComponent> | null = null;

  public show(message: string = 'Procesando...'): void {
    if (this.loadingRef) return;

    this.loadingRef = createComponent(LoadingComponent, { environmentInjector: this.injector });
    this.loadingRef.setInput('text', message);

    this.appRef.attachView(this.loadingRef.hostView);
    document.body.appendChild(this.loadingRef.location.nativeElement);
  }

  public hide(): void {
    if (this.loadingRef) {
      this.appRef.detachView(this.loadingRef.hostView);
      this.loadingRef.destroy();
      this.loadingRef = null;
    }
  }
}
