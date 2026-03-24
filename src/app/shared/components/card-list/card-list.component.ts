import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '@shared/components/card/card.component';
import { ColumnDef } from '@shared/entities';

@Component({
  selector: 'app-card-list',
  standalone: true,
  templateUrl: './card-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent],
})
export class CardListComponent<T> {
  public data = input.required<T[]>();
  public columns = input.required<ColumnDef<T>[]>();
  public isLoading = input<boolean>(false);
  public emptyMessage = input<string>();
}
