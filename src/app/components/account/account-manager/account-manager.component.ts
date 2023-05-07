import {Component, OnInit} from '@angular/core';
import {User} from "../../../common/user";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Account} from "../../../common/account";
import {TransactionHistory} from "../../../common/transaction-history";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AccountService} from "../../../services/account.service";
import {UserAuthService} from "../../../services/user-auth.service";

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css']
})
export class AccountManagerComponent implements OnInit{
  accountId !: number;
  user : User = new User();
  UserAccounts : Account [] = [];
  accountTransactions : TransactionHistory [] = [];
  balanceFromGroup!: FormGroup;
  isFunder : boolean =false;
  constructor(private formBuilder: FormBuilder,
              private userService : UserService,
              private route: ActivatedRoute,
              private accountService : AccountService,
              private userAuthService : UserAuthService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.formGroupInit();
      this.getUserByAccountId();
      this.isFunder = this.userAuthService.isFunderRole();
    });
  }

  formGroupInit() {
    this.balanceFromGroup = this.formBuilder.group({
      balanceInfo : this.formBuilder.group({
        inputBalance : new FormControl('', [Validators.required])
      })
    })
  }

  get inputBalance() { return this.balanceFromGroup.get('balanceInfo.inputBalance'); }
  inputBalanceValide(): boolean {
    return this.inputBalance?.invalid && (this.inputBalance?.dirty || this.inputBalance?.touched) ? true : false;
  }

  getUserByAccountId() {
    if(this.route.snapshot.paramMap.has('accountId')) {
      this.accountId = +this.route.snapshot.paramMap.get('accountId')!;
      this.userService.getUserByAccountId(this.accountId).subscribe(
        data => {
          this.user = data;
          this.user.account.forEach(acc => {
            this.UserAccounts.push(acc);
            acc.transactionHistories.forEach(t => {
              this.accountTransactions.push(t);
            });
          });
        },
        error => {
          console.log(error.message());
        }
      );
    }
  }

  onSubmitBalance() {
    let accDeposit = new Account();
    accDeposit.id = this.accountId;
    let t = new TransactionHistory();
    t.amount = this.inputBalance?.value;
    accDeposit.transactionHistories = [];
    accDeposit.transactionHistories.push(t);

    if(this.balanceFromGroup.invalid) {
      this.balanceFromGroup.markAllAsTouched();
      this.toastr.warning("please enter an amount !");

      return;
    }

    console.log(JSON.stringify(accDeposit));

    this.accountService.depositMoney(accDeposit).subscribe(
      data => {
        this.toastr.success("Successfully Deposit !");
        window.location.reload();
      }, error => {
        alert("There was an error: " + error.message());
      }
    )
  }

}
