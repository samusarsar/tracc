import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';
import * as WalletsActions from '../../../dashboard/wallets/store/wallets.actions';

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

  private walletsStoreSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.newWalletForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
    });

    this.walletsStoreSub = this.store.select('wallets').subscribe((state) => {
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

    this.store.dispatch(
      WalletsActions.createWalletStart({
        name: form.value.name,
        description: form.value.description,
      })
    );
  }
}
