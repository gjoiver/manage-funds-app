import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@shared/components/table/table.component';
import { BaseButtonComponent } from '@shared/components/base-button/base-button.component';
import { BUTTONS } from '@shared/constants';
import { HomeConfig, TableConfig } from './home.config';
import { TransactionEntity } from '@transactions/core/entities';
import { TransactionsInteractor } from '@transactions/core/interactor';
import { GetTransactionsUseCase, AddTransactionUseCase } from '@transactions/core/usecases';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent, BaseButtonComponent],
  templateUrl: './home.page.html',
  providers: [TransactionsInteractor, GetTransactionsUseCase, AddTransactionUseCase],
})
export class HomePage implements OnInit {
  public config = HomeConfig;
  public tableConfig = TableConfig;

  protected readonly BUTTONS = BUTTONS;
  protected transactions = signal<TransactionEntity[]>([]);
  protected isLoading = signal<boolean>(false);

  private readonly transactionsInteractor = inject(TransactionsInteractor);
  private readonly router = inject(Router);

  public ngOnInit(): void {
    this.getTransactions();
  }

  protected navigateToFunds(): void {
    this.router.navigate([this.config.routes.funds]);
  }

  private async getTransactions(): Promise<void> {
    try {
      this.isLoading.set(true);
      const transactions = await this.transactionsInteractor.getTransactions();
      this.transactions.set(transactions);
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
