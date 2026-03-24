import { Component, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ModalButton } from './entities';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { DynamicComponentCell } from '@shared/entities';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  imports: [BaseButtonComponent, NgComponentOutlet],
})
export class ModalComponent {
  public title = input.required<string>();
  public message = input<string>();
  public buttons = input.required<ModalButton[]>();
  public contentComponent = input<DynamicComponentCell | null>(null);
}
