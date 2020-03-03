import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { LoggerUtils } from '@shared/utils/logger.utills';

@Component({
  templateUrl: './like-modal.component.html',
  styleUrls: ['./like-modal.component.scss']
})
export class LikeModalComponent {

  opinion: string;
  diminuicaoSuporte: number;
  automacaoProcesso: number;
  aumentoProdutividade: number;

  constructor(
    public dialogRef: MatDialogRef<LikeModalComponent>,
    @Inject(DOCUMENT) private _document: Document
  ) {}

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

  select(id: string, clazz: string) {
    this._deMark(this._document.querySelectorAll(`.${clazz}`));
    this._mark(this._document.getElementById(id));

    const info = id.split('*');
    const n = this._evaluationConversor(info[1]);
    switch (info[0]) {
      case 'diminuicao-suporte':
        this.diminuicaoSuporte = n;
        break;
      case 'automacao-processo':
        this.automacaoProcesso = n;
        break;
      case 'aumento-produtividade':
        this.aumentoProdutividade = n;
        break;
    }
  }

  private _mark(element: HTMLElement) {
    element.classList.remove('fal');
    element.classList.add('fa');
  }

  private _deMark(list: NodeListOf<Element>) {
    list.forEach(el => {
      el.classList.remove('fa');
      el.classList.add('fal');
    });
  }

  _evaluationConversor(e: string) {
    if (e === 'bad') {
      return 0;
    } else if (e === 'meh') {
      return 1;
    } else if (e === 'top') {
      return 2;
    }
  }

}
