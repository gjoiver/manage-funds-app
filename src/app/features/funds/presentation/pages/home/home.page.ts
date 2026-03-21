import { Component, inject, OnInit, signal } from '@angular/core';
import { HomePageConfig } from './home.config';
import { FundEntity } from '@funds/core/entities';
import { FundsInteractor } from '@funds/core/interactor/funds.interactor';
import { TableComponent } from '@shared/components';
import { GetFundsUseCase, SubscribeFundUseCase } from '@funds/core/usecases';

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
  protected funds = signal<FundEntity[]>([]);

  private readonly fundsInteractor = inject(FundsInteractor);

  public ngOnInit(): void {
    this.getFunds();
  }

  private async getFunds(): Promise<void> {
    try {
      const response = await this.fundsInteractor.getFunds();

      this.funds.set(response);
    } catch (error) {
      console.error(error);
    }
  }
}
