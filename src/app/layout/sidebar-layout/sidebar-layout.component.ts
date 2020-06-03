import { Component, OnInit, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { User } from '@shared/models/User';
import { environment } from '@env';
// import { OverlayContainer } from '@angular/cdk/overlay';

// import { ThemeService } from '@app/service/theme.service';

export interface SidebarItem {
  icon: string;
  label: string;
  url: string;
}

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent implements OnInit {

  public items: SidebarItem[];
  private _color: string;

  constructor(@Inject(DOCUMENT) public document: Document) { }

  public hide(e) {
    this.document.getElementsByTagName('body')[0].classList.remove('show-sidebar');
  }

  get color() {
    if (!this._color) {
      this._color = environment.defaultColor;
    }
    return `background-color: ${this._color};`;
  }

  ngOnInit() {
    const userType = User.fromLocalStorage().type;
    this.items = [
      { icon: 'fad fa-stream', label: 'Timeline', url: '/timeline' },
      { icon: 'fad fa-frown', label: userType === 0 ? 'Desabafos' : 'Meus desabafos', url: '/timeline/desabafos' }
    ];
  }
}
