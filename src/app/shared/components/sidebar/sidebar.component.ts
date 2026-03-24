import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarConfig } from './sidebar.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [RouterLink, RouterLinkActive],
})
export class SidebarComponent {
  public readonly config = SidebarConfig;
  protected isOpen = signal(false);

  protected asideClasses = computed(() =>
    [
      'fixed md:static md:h-full inset-y-0 left-0 z-50',
      'w-64 bg-brand-primary flex flex-col flex-shrink-0',
      'transition-transform duration-300 md:translate-x-0',
      this.isOpen() ? 'translate-x-0' : '-translate-x-full',
    ].join(' '),
  );

  protected toggle(): void {
    this.isOpen.update((v) => !v);
  }

  protected close(): void {
    this.isOpen.set(false);
  }
}
