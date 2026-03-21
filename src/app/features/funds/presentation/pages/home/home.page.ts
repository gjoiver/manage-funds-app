import { Component, inject, OnInit, signal } from '@angular/core';
import { HomePageConfig, TableConfig } from './home.config';
import { FundEntity } from '@funds/core/entities';
import { FundsInteractor } from '@funds/core/interactor/funds.interactor';
import { TableComponent } from '@shared/components';
import { GetFundsUseCase, SubscribeFundUseCase } from '@funds/core/usecases';
import { BaseButtonComponent } from '@shared/components/base-button/base-button.component';
import { ColumnDef } from '@shared/entities';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  providers: [FundsInteractor, GetFundsUseCase, SubscribeFundUseCase],
  imports: [TableComponent],
})
export class HomePage implements OnInit {
  public config = HomePageConfig;
  public tableCols = TableConfig(this);
  protected funds = signal<FundEntity[]>([]);
  protected isLoading = signal<boolean>(false);

  private readonly fundsInteractor = inject(FundsInteractor);

  public ngOnInit(): void {
    this.getFunds();
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

  public onFundSelected(event: FundEntity) {
    console.log(event);
  }
}
