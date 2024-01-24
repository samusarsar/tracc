import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';
import * as WalletsActions from '../../../dashboard/wallets/store/wallets.actions';
import { Wallet } from '../../types';

@Component({
  selector: 'app-create-wallet',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-wallet.component.html',
  styleUrl: './create-wallet.component.scss',
})
export class CreateWalletComponent {
  newWalletForm!: FormGroup;
  error!: string;
  isLoading!: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public wallet: Wallet
  ) {}

  ngOnInit() {
    this.newWalletForm = this.fb.group({
      name: [this.wallet?.name || '', Validators.required],
      description: this.wallet?.description || '',
    });

    this.store.select('wallets').subscribe((state) => {
      this.error = state.walletError;

      if (!this.error && this.isLoading === true && state.loading === false) {
        this.isLoading = state.loading;
        this.dialog.closeAll();
      } else {
        this.isLoading = state.loading;
      }
    });
  }

  onSubmit(form: FormGroup) {
    if (form.status === 'INVALID' || !form.touched) return;

    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((state) => {
        if (!this.wallet) {
          this.store.dispatch(
            WalletsActions.createWalletStart({
              name: form.value.name,
              description: form.value.description,
              owner: state.user!.email,
            })
          );
        } else {
          this.store.dispatch(
            WalletsActions.editWalletStart({
              id: this.wallet.id,
              name: form.value.name,
              description: form.value.description,
            })
          );
        }
      });
  }
}
