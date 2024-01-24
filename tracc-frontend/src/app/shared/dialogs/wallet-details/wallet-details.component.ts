import { Component, Inject, Input } from '@angular/core';
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
import { Subscription, take } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';
import * as WalletsActions from '../../../dashboard/wallets/store/wallets.actions';
import { Wallet } from '../../types';

@Component({
  selector: 'app-wallet-details',
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
  templateUrl: './wallet-details.component.html',
  styleUrl: './wallet-details.component.scss'
})
export class WalletDetailsComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public wallet: Wallet
  ) {}
}
