import { Directive, ElementRef, OnDestroy, Renderer2, effect, inject, input } from '@angular/core';

@Directive({
  selector: '[appSkeleton]',
  standalone: true,
})
export class SkeletonDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private overlay: HTMLElement | null = null;

  public appSkeleton = input.required<boolean>();

  constructor() {
    effect(() => (this.appSkeleton() ? this.show() : this.hide()));
  }

  public ngOnDestroy(): void {
    this.hide();
  }

  private show(): void {
    if (this.overlay) return;

    const host: HTMLElement = this.el.nativeElement;
    this.renderer.setStyle(host, 'position', 'relative');
    this.renderer.setStyle(host, 'overflow', 'hidden');
    this.renderer.setStyle(host, 'pointer-events', 'none');

    this.overlay = this.renderer.createElement('div');
    this.renderer.setAttribute(this.overlay!, 'aria-hidden', 'true');
    this.renderer.addClass(this.overlay!, 'skeleton-overlay');
    this.renderer.appendChild(host, this.overlay!);
  }

  private hide(): void {
    if (!this.overlay) return;

    const host: HTMLElement = this.el.nativeElement;
    this.renderer.removeChild(host, this.overlay);
    this.renderer.removeStyle(host, 'position');
    this.renderer.removeStyle(host, 'overflow');
    this.renderer.removeStyle(host, 'pointer-events');
    this.overlay = null;
  }
}
