import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPessoa, Pessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from './pessoa.service';
import { IFamilia } from 'app/shared/model/familia.model';
import { FamiliaService } from 'app/entities/familia';

@Component({
  selector: 'jhi-pessoa-update',
  templateUrl: './pessoa-update.component.html'
})
export class PessoaUpdateComponent implements OnInit {
  pessoa: IPessoa;
  isSaving: boolean;

  familias: IFamilia[];

  editForm = this.fb.group({
    id: [],
    cpf: [null, [Validators.required]],
    nome: [null, [Validators.required]],
    email: [null, [Validators.required]],
    telefone: [null, [Validators.required]],
    familiaId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected pessoaService: PessoaService,
    protected familiaService: FamiliaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      this.updateForm(pessoa);
      this.pessoa = pessoa;
    });
    this.familiaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFamilia[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFamilia[]>) => response.body)
      )
      .subscribe((res: IFamilia[]) => (this.familias = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(pessoa: IPessoa) {
    this.editForm.patchValue({
      id: pessoa.id,
      cpf: pessoa.cpf,
      nome: pessoa.nome,
      email: pessoa.email,
      telefone: pessoa.telefone,
      familiaId: pessoa.familiaId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pessoa = this.createFromForm();
    if (pessoa.id !== undefined) {
      this.subscribeToSaveResponse(this.pessoaService.update(pessoa));
    } else {
      this.subscribeToSaveResponse(this.pessoaService.create(pessoa));
    }
  }

  private createFromForm(): IPessoa {
    const entity = {
      ...new Pessoa(),
      id: this.editForm.get(['id']).value,
      cpf: this.editForm.get(['cpf']).value,
      nome: this.editForm.get(['nome']).value,
      email: this.editForm.get(['email']).value,
      telefone: this.editForm.get(['telefone']).value,
      familiaId: this.editForm.get(['familiaId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoa>>) {
    result.subscribe((res: HttpResponse<IPessoa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackFamiliaById(index: number, item: IFamilia) {
    return item.id;
  }
}
