import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import * as WalletsActions from '../../../dashboard/wallets/store/wallets.actions';
import { Coin, Wallet } from '../../types';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.scss',
})
export class CreateTransactionComponent {
  newTransactionForm!: FormGroup;
  error!: string;
  isLoading!: boolean;

  maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialogRef<CreateTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { wallet: Wallet; coins: Coin[] }
  ) {}

  ngOnInit() {
    this.newTransactionForm = this.fb.group({
      coinId: ['', [Validators.required, this.validateCoinIsInList()]],
      buyPrice: [0, Validators.min(0)],
      buyAmount: [0, Validators.min(0)],
      buyDate: new Date(),
    });

    this.store.select('wallets').subscribe((state) => {
      this.error = state.walletError;

      if (!this.error && this.isLoading === true && state.loading === false) {
        this.isLoading = state.loading;
        this.dialog.close();
      } else {
        this.isLoading = state.loading;
      }
    });
  }

  validateCoinIsInList(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        !!this.data.coins.find((c) => c.id === control.value?.toLowerCase())
      ) {
        return null;
      } else {
        return { coinNotFound: true };
      }
    };
  }

  onSubmit(form: FormGroup) {
    if (form.status === 'INVALID' || !form.touched) return;

    this.store.dispatch(
      WalletsActions.createTransactionStart({
        walletId: this.data.wallet.id,
        coinId: form.value.coinId,
        buyPrice: form.value.buyPrice,
        buyAmount: form.value.buyAmount,
        buyDate: form.value.buyDate,
      })
    );
  }
}
