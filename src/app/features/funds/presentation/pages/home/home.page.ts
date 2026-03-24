import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HomePageConfig, TableConfig } from './home.config';
import { FundEntity } from '@funds/core/entities';
import { FundsInteractor } from '@funds/core/interactor/funds.interactor';
import { CardListComponent, TableComponent } from '@shared/components';
import {
  GetFundsUseCase,
  SubscribeFundUseCase,
  UnsubscribeFundUseCase,
} from '@funds/core/usecases';
import { AccountStore } from '@funds/core/store/account.store';
import { CurrencyPipe } from '@angular/common';
import { LoadingService, ModalService, ToastService } from '@shared/services';
import { NOTIFICATIONS_TYPES } from '@shared/constants';
import { NotificationEntity } from '@shared/entities';
import { NotificationChooserComponent } from '@funds/presentation/components/notification-chooser/notification-chooser.component';
import { error } from 'console';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  providers: [FundsInteractor, GetFundsUseCase, SubscribeFundUseCase, UnsubscribeFundUseCase],
  imports: [TableComponent, CardListComponent, CurrencyPipe],
})
export class HomePage implements OnInit {
  public config = HomePageConfig;
  public tableCols = TableConfig(this);
  protected funds = signal<FundEntity[]>([]);
  protected isLoading = signal<boolean>(false);
  protected balance = computed(() => this.accountStore.getBalance());
  private selectedNotification = signal<NotificationEntity>(NOTIFICATIONS_TYPES.Email);
  private readonly accountStore = inject(AccountStore);
  private readonly fundsInteractor = inject(FundsInteractor);
  private readonly loadingService = inject(LoadingService);
  private readonly modalService = inject(ModalService);
  private readonly toastService = inject(ToastService);

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
      this.showUnsubscribeModal(fund);

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
      this.toastService.error(this.config.i18n.toast.fundsError);
    } finally {
      this.isLoading.set(false);
    }
  }

  private subscribeFund(fund: FundEntity): void {
    if (!this.hasEnoughBalance(fund)) {
      this.showNotEnoughMoneyModal();

      return;
    }

    this.showNotificationModal(fund);
  }

  private showNotificationModal(fund: FundEntity): void {
    this.selectedNotification.set(NOTIFICATIONS_TYPES.Email);
    const { title, message, buttons } = this.config.i18n.modals.subscribe;

    this.modalService.show({
      title: title,
      message: `${message} ${fund.name}?`,
      buttons: [
        buttons[0],
        {
          ...buttons[1],
          action: () => this.confirmSubscription(fund),
        },
      ],
      contentComponent: {
        class: NotificationChooserComponent,
        inputs: {
          onSelect: (value: NotificationEntity) => this.selectedNotification.set(value),
        },
      },
    });
  }

  private async confirmSubscription(fund: FundEntity): Promise<void> {
    const { success, error } = this.config.i18n.toast.subscribe;
    try {
      this.loadingService.show();
      await this.fundsInteractor.subscribeFund(fund.id);
      this.accountStore.subscribeToFund(fund, this.selectedNotification());

      this.loadingService.hide();
      this.toastService.success(success);
    } catch {
      this.toastService.error(error);
    } finally {
      this.loadingService.hide();
    }
  }

  private async unsubscribeFund(fund: FundEntity): Promise<void> {
    const { success, error } = this.config.i18n.toast.unsubscribe;
    try {
      this.loadingService.show();
      await this.fundsInteractor.unsubscribeFund(fund.id);
      this.accountStore.unsubscribeFund(fund);

      this.loadingService.hide();
      this.toastService.success(success);
    } catch {
      this.toastService.error(error);
    } finally {
      this.loadingService.hide();
    }
  }

  private showUnsubscribeModal(fund: FundEntity): void {
    const { title, message, buttons } = this.config.i18n.modals.unsubscribe;

    this.modalService.show({
      title,
      message: `${message} ${fund.name}?`,
      buttons: [
        buttons[0],
        {
          ...buttons[1],
          action: () => this.unsubscribeFund(fund),
        },
      ],
    });
  }

  private showNotEnoughMoneyModal() {
    this.modalService.show(this.config.i18n.modals.notEnoughMoney);
  }
}
