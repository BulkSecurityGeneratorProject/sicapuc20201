import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFamilia } from 'app/shared/model/familia.model';

@Component({
  selector: 'jhi-familia-detail',
  templateUrl: './familia-detail.component.html'
})
export class FamiliaDetailComponent implements OnInit {
  familia: IFamilia;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ familia }) => {
      this.familia = familia;
    });
  }

  previousState() {
    window.history.back();
  }
}
