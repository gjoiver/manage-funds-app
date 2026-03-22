import { Component, input } from '@angular/core';
import { ModalButton } from './entities';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  imports: [BaseButtonComponent],
})
export class ModalComponent {
  public title = input.required<string>();
  public message = input.required<string>();
  public buttons = input.required<ModalButton[]>();
}
