import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './suggestion-modal.component.html',
  styleUrls: ['./suggestion-modal.component.scss']
})
export class SuggestionModalComponent {

  problem = '';
  improvement = '';
  hype = '';
  diminuicaoSuporte: number;
  automacaoProcesso: number;
  aumentoProdutividade: number;
  errorLabel = this.pattern;
  errorBorder = this.pattern;

  constructor(
    public dialogRef: MatDialogRef<SuggestionModalComponent>,
  ) {}

  private get pattern() {
    return { problem: '', improvement: '', hype: '' };
  }

  getResult() {
    return {
      problem: this.problem,
      improvement: this.improvement,
      hype: this.hype
    };
  }

  onNoClick(): void {
    this.dialogRef.close(this.getResult());
  }

  submit() {
    if (this.problem && this.problem.length && this.improvement && this.improvement.length && this.hype && this.hype.length &&
        this.aumentoProdutividade !== undefined && this.diminuicaoSuporte !== undefined && this.automacaoProcesso !== undefined) {
      this.dialogRef.close(this.getResult());
    } else {
      this.errorLabel = this.pattern;
      this.errorBorder = this.pattern;

      if (!this.problem || !this.problem.length) {
        this.errorLabel.problem = 'labelred';
        this.errorBorder.problem = 'border-danger';
      }
      if (!this.improvement || !this.improvement.length) {
        this.errorLabel.improvement = 'labelred';
        this.errorBorder.improvement = 'border-danger';
      }
      if (!this.hype || !this.hype.length) {
        this.errorLabel.hype = 'labelred';
        this.errorBorder.hype = 'border-danger';
      }
    }

  }

}
