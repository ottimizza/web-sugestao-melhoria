import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styles: [`
  .tag-chip {
    color: white;
    background-color: gray
  }
  `]
})
export class TagComponent {

  @Input() tags: string[];

}
