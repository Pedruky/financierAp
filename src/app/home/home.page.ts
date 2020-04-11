import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DatabaseService } from './../services/database.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private db: DatabaseService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) {}

  mainForm: FormGroup;
  Data: any[] = []

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchTransaccion().subscribe(item => {
          this.Data = item
        })
      }
    });
  
    this.mainForm = this.formBuilder.group({
      nombre: [''],
      cantidad: [''],
      porcentajeIVA: [''],
      descripcion: [''],
      comprobante: ['']
    })
  }

  storeData() {
    this.db.addTransaccion(
      this.mainForm.value.nombre,
      this.mainForm.value.cantidad,
      this.mainForm.value.porcentajeIVA,
      this.mainForm.value.descripcion,
      this.mainForm.value.comprobante
    ).then((res) => {
      this.mainForm.reset();
    })
  }

  deleteSong(id){
    this.db.deleteTransaccion(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Transaccion Eliminada.',
        duration: 2500
      });
      toast.present();      
    })
  }

}
