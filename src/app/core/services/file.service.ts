import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { FileStorageService } from '@app/http/file-storage.service';
import { fromEvent, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private fileStorageService: FileStorageService
  ) {}

  public prepareFile(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    return fd;
  }

  public blobToFile(blob: Blob, fileName = `file_${Date.now()}`) {
    const b: any = blob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return b as File;
  }

  public readFile(file: File | Blob) {
    const reader = new FileReader();
    const text$ = fromEvent<ProgressEvent<FileReader>>(reader, 'load');
    reader.readAsText(file);
    return text$.pipe(
      take(1),
      map(() => reader.result.toString())
    );
  }

  public requestFile(): Observable<File> {
    const input = this.doc.createElement('input');
    input.type = 'file';
    input.style.display = 'none';

    const file$ = fromEvent<any>(input, 'change');

    input.click();

    return file$.pipe(
      take(1),
      map(e => e.target.files.item(0))
    );
  }

  public requestAndUpload() {
    return this.requestFile()
    .pipe(
      switchMap(file => this.fileStorageService.store(file)),
      map(result => this.fileStorageService.getResourceURL(result.record.id))
    );
  }

}
