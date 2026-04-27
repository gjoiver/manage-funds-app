import { Component, inject, OnInit, signal } from '@angular/core';
import { CardListComponent, TableComponent } from '@shared/components';
import { HomeConfig, TableConfig } from './home.config';
import { TransactionEntity } from '@transactions/core/entities';
import { TransactionsInteractor } from '@transactions/core/interactor';
import { GetTransactionsUseCase, AddTransactionUseCase } from '@transactions/core/usecases';
import { ToastService } from '@shared/services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent, CardListComponent],
  templateUrl: './home.page.html',
  providers: [TransactionsInteractor, GetTransactionsUseCase, AddTransactionUseCase],
})
export class HomePage implements OnInit {
  public config = HomeConfig;
  public tableConfig = TableConfig;

  protected transactions = signal<TransactionEntity[]>([]);
  protected isLoading = signal<boolean>(false);

  private readonly transactionsInteractor = inject(TransactionsInteractor);
  private readonly toastService = inject(ToastService);

  public ngOnInit(): void {
    this.getTransactions();
  }

  private async getTransactions(): Promise<void> {
    try {
      this.isLoading.set(true);
      const transactions = await this.transactionsInteractor.getTransactions();
      this.transactions.set(transactions);
      this.isLoading.set(false);
    } catch {
      this.toastService.error(this.config.i18n.toast.transactionError);
    } finally {
      this.isLoading.set(false);
    }
  }
}
