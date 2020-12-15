import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FileFormat, FileService } from '@app/services/file.service';
import { environment } from '@env';
import { ToastService } from '@shared/services/toast.service';
import { TextfieldButton } from './models/TextfieldButton';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent implements AfterViewInit, OnChanges {

  @Input()
  public deep = '';

  @Input()
  public ableToAddFile = true;

  @Input()
  public ableToAddImage = true;

  @Input()
  public maxLenght: number;

  @Input()
  public sendButton: TextfieldButton | boolean = true;

  @Input()
  public value: string;

  @ViewChild('fakeTextarea', { static: true })
  private textarea: ElementRef<HTMLDivElement>;

  @Output()
  public valueChange = new EventEmitter<string>();

  @Output()
  public submit = new EventEmitter<string>();

  public currentLenght = 0;

  public defaultSendButton: TextfieldButton = {
    classes: 'btn btn-primary',
    color: environment.defaultColor,
    label: 'Enviar'
  };

  constructor(
    private fileService: FileService,
    private toastService: ToastService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (changes.hasOwnProperty(key) && key === 'value') {
        this.textarea.nativeElement.innerHTML = this.value ?? '';
      }
    }
  }

  ngAfterViewInit(): void {
    this.textarea.nativeElement.focus();
  }

  public sendFile() {
    this.toastService.showSnack('Enviando arquivo');
    this.fileService.requestAndUpload()
    .subscribe(result => {
      this.toastService.hideSnack();
      this.appendFile(result.url, result.name);
    });
  }

  public sendImage() {
    this.toastService.showSnack('Enviando imagem');
    this.fileService.requestAndUpload(FileFormat.IMAGE)
    .subscribe(result => {
      this.toastService.hideSnack();
      this.appendImage(result.url, result.name);
    });
  }

  private appendFile(fileUrl: string, fileName: string) {
    this.textarea.nativeElement.innerHTML += `
    <a href="${fileUrl}" target="_blank">${fileName}</a>
    `;
  }

  private appendImage(imageUrl: string, imageName: string) {
    this.textarea.nativeElement.innerHTML += `
    <img src="${imageUrl}" title="${imageName}" width="50" height="50">
    `;
  }

  public onInput() {
    if (this.textarea.nativeElement.innerHTML.toUpperCase().includes('SCRIPT')) { // ! NECESSÁRIO PARA SEGURANÇA
      this.textarea.nativeElement.innerHTML = this.textarea.nativeElement.innerHTML.replace(/script/ig, 'sсrірt');
      // O segundo "script" está escrito com alfabeto cirílico para que perca o efeito, mas pareça igual, NÃO MEXER.
    }
    this.currentLenght = this.textarea.nativeElement.innerText.length;
    if (!this.maxLenght || this.currentLenght <= this.maxLenght) {
      this.valueChange.emit(this.textarea.nativeElement.innerHTML);
    }
  }

  public onClick() {
    if (!this.maxLenght || this.currentLenght <= this.maxLenght) {
      if (this.textarea.nativeElement.innerHTML.toUpperCase().includes('SCRIPT')) { // ! NECESSÁRIO PARA SEGURANÇA
        this.textarea.nativeElement.innerHTML = this.textarea.nativeElement.innerHTML.replace(/script/ig, 'sсrірt');
        // O segundo "script" está escrito com alfabeto cirílico para que perca o efeito, mas pareça igual, NÃO MEXER.
      }
      this.submit.emit(this.textarea.nativeElement.innerHTML);
      this.textarea.nativeElement.innerHTML = '';
    }
  }

}
