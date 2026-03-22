import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageConfig, TableConfig } from './home.config';
import { FundEntity } from '@funds/core/entities';
import { FundsInteractor } from '@funds/core/interactor/funds.interactor';
import { TableComponent } from '@shared/components';
import {
  GetFundsUseCase,
  SubscribeFundUseCase,
  UnsubscribeFundUseCase,
} from '@funds/core/usecases';
import { AccountStore } from '@funds/core/store/account.store';
import { CurrencyPipe } from '@angular/common';
import { LoadingService, ModalService } from '@shared/services';
import { BaseButtonComponent } from '@shared/components/base-button/base-button.component';
import { BUTTONS } from '@shared/constants';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  providers: [FundsInteractor, GetFundsUseCase, SubscribeFundUseCase, UnsubscribeFundUseCase],
  imports: [TableComponent, CurrencyPipe, BaseButtonComponent],
})
export class HomePage implements OnInit {
  public config = HomePageConfig;
  public tableCols = TableConfig(this);
  protected readonly BUTTONS = BUTTONS;
  protected funds = signal<FundEntity[]>([]);
  protected isLoading = signal<boolean>(false);
  protected balance = computed(() => this.accountStore.getBalance());
  private readonly accountStore = inject(AccountStore);
  private readonly fundsInteractor = inject(FundsInteractor);
  private readonly loadingService = inject(LoadingService);
  private readonly modalService = inject(ModalService);
  private readonly router = inject(Router);

  public ngOnInit(): void {
    this.getFunds();
  }

  public hasEnoughBalance(fund: FundEntity): boolean {
    return this.accountStore.hasEnoughBalance(fund.minAmount);
  }

  public hasSubscription(fund: FundEntity): boolean {
    return this.accountStore.hasSubscription(fund.id);
  }

  public handleSubscription(fund: FundEntity) {
    if (this.hasSubscription(fund)) {
      this.unsubscribeFund(fund);

      return;
    }

    this.subscribeFund(fund);
  }

  private async getFunds(): Promise<void> {
    try {
      this.isLoading.set(true);
      const response = await this.fundsInteractor.getFunds();

      this.funds.set(response);
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private async subscribeFund(fund: FundEntity): Promise<void> {
    if (!this.hasEnoughBalance(fund)) {
      this.showNotEnoughMoneyModal();

      return;
    }
    try {
      this.loadingService.show();
      await this.fundsInteractor.subscribeFund(fund.id);
      this.accountStore.subscribeToFund(fund, 'email');

      this.loadingService.hide();
    } catch (error) {
      //TO DO: Implementar toast
      console.error(error);
    } finally {
      this.loadingService.hide();
    }
  }

  private async unsubscribeFund(fund: FundEntity): Promise<void> {
    try {
      this.loadingService.show();
      await this.fundsInteractor.unsubscribeFund(fund.id);
      this.accountStore.unsubscribeFund(fund);

      this.loadingService.hide();
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.hide();
    }
  }

  protected navigateToHistory(): void {
    this.router.navigate(['/transacciones']);
  }

  private showNotEnoughMoneyModal() {
    this.modalService.show(this.config.i18n.modals.notEnoughMoney);
  }
}
