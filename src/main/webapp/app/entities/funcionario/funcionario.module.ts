import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { Sicapuc20201SharedModule } from 'app/shared';
import {
  FuncionarioComponent,
  FuncionarioDetailComponent,
  FuncionarioUpdateComponent,
  FuncionarioDeletePopupComponent,
  FuncionarioDeleteDialogComponent,
  funcionarioRoute,
  funcionarioPopupRoute
} from './';

const ENTITY_STATES = [...funcionarioRoute, ...funcionarioPopupRoute];

@NgModule({
  imports: [Sicapuc20201SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FuncionarioComponent,
    FuncionarioDetailComponent,
    FuncionarioUpdateComponent,
    FuncionarioDeleteDialogComponent,
    FuncionarioDeletePopupComponent
  ],
  entryComponents: [FuncionarioComponent, FuncionarioUpdateComponent, FuncionarioDeleteDialogComponent, FuncionarioDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Sicapuc20201FuncionarioModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
