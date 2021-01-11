import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '@app/http/suggestion.service';
import { BreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { Suggestion } from '@shared/models/Suggestion';
import { ArrayUtils } from '@shared/utils/array.utils';

@Component({
  templateUrl: './suggestion-display.component.html',
  styleUrls: ['./suggestion-display.component.scss']
})
export class SuggestionDisplayComponent implements OnInit {

  public suggestion: Suggestion;

  public append: BreadCrumb = {
    label: 'Obtendo sugestão...',
    url: ''
  };

  constructor(
    private router: Router,
    private service: SuggestionService
  ) {}

  ngOnInit(): void {
    const id = +ArrayUtils.urlParams;
    if (id) {

      this.service.getById(id).subscribe(result => {
        if (result?.id) {
          this.suggestion = result;
          this.append = {
            label: result.titulo,
            url: window.location.href
          }
        } else {
          this.exit();
        }
      });

    } else {
      this.exit();
    }
  }

  private exit() {
    this.router.navigate(['/']);
  }

}
