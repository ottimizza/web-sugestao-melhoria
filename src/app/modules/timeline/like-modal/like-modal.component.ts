import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './like-modal.component.html',
  styleUrls: ['./like-modal.component.scss']
})
export class LikeModalComponent {

  opinion = '';
  diminuicaoSuporte: number;
  automacaoProcesso: number;
  aumentoProdutividade: number;

  constructor(
    public dialogRef: MatDialogRef<LikeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, icon: string },
  ) {}

  get info() {
    return {
      bad: 'Não',
      meh: 'Não sei',
      top: 'Sim'
    };
  }

  get evaluation() {
    return {
      opiniao: this.opinion,
      diminuicaoSuporte: this.diminuicaoSuporte,
      automacaoProcesso: this.automacaoProcesso,
      aumentoProdutividade: this.aumentoProdutividade
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
