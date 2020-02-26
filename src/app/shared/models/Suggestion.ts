export class Suggestion {

  private _tags: string[] = [];

  constructor(
    public id: number,
    public titulo: string,
    public problema: string,
    public sugestaoMelhoria: string,
    public resultadoEsperado: string,
    public diminuicaoSuporte: boolean,
    public automacaoProcesso: boolean,
    public aumentoProdutividade: boolean,
    public userId: string,
    public comments: number,
    public likes: number,
    public dislikes: number,
    public createdIn: Date
  ) { }

  public addTag(tag: string) {
    if (this._tags.length < 5 && tag.length < 12) {
      this._tags.push(tag);
    }
    return this._tags;
  }

  public removeTag(tag: string) {
    this._tags.splice(this._tags.indexOf(tag), 1);
    return this._tags;
  }

  public get tags() {
    return this._tags;
  }

}
