import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WhatsappbotmainpageComponent } from '../whatsappbotmainpage/whatsappbotmainpage.component';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  form: FormGroup;
  FormState: string = 'INVALID';
  ActiveDates: boolean = false;
  showOptions: boolean = false;
  messageTypes: string[] = [
    'Carta de Presentacion',
    'Carta de Oferta',
    'Carta de Definicion'];
  private LoadRequiredFields: any = {
    'Carta de Presentacion': () => {
      this.ActiveDates = false;
      this.showOptions = false;
      this.form.removeControl('timeToResponse');
      this.form.removeControl('timeToPay');
      this.form.removeControl('options');
    },
    'Carta de Oferta': () => {
      this.activeDateRequired();
      this.activeOptions();
    },
    'Carta de Definicion': () => {
      this.activeDateRequired();
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private matdialogRef: MatDialogRef<WhatsappbotmainpageComponent>) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.form.statusChanges.subscribe(state => this.FormState = state);
    this.form.controls['messageType'].valueChanges.subscribe(v => {
      this.LoadRequiredFields[v]();
    });

  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      messageType: [, Validators.required]
    })
  };

  private activeDateRequired = () => {
    this.form.addControl('timeToResponse', new FormControl('', Validators.required));
    this.form.addControl('timeToPay', new FormControl('', Validators.required));
    this.ActiveDates = true;
  };

  private activeOptions() {
    this.form.addControl('options', this.formBuilder.group({
      quitas: this.formBuilder.array([]),
      cuotas: this.formBuilder.array([])
    }));
    this.showOptions = true;
  };

  getQuitas() {
    return this.form.controls['options'].get('quitas') as FormArray;
  };

  getCuotas() {
    return this.form.controls['options'].get('cuotas') as FormArray;
  };

  deleteControlQuita(idx: number) {
    this.getQuitas().removeAt(idx)
  }

  deleteControlCuotas(idx: number) {
    this.getCuotas().removeAt(idx)
  }

  addQuita() {
    this.getQuitas().push(this.formBuilder.group({
      condicion: [, Validators.required],
      valorQuita: [, Validators.required],
      SiNoCumple: [, Validators.required]
    }));
  };

  addPlanDePago() {
    this.getCuotas().push(this.formBuilder.group({
      condicion: [,Validators.required],
      cantidadDeCuotas: [,Validators.required]
    }))
  };

  saveTask() {
    let task;
    if (!this.form.valid) return;
    if (this.form.get('timeToResponse')) {
      task = {
        ...this.form.value,
        timeToResponse: this.form.value.timeToResponse.split('-').reverse().join('/'),
        timeToPay: this.form.value.timeToPay.split('-').reverse().join('/')
      };
      console.log(task);
      return this.matdialogRef.close(task)
    };
    this.matdialogRef.close(this.form.value)
  };
}
