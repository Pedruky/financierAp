import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DatabaseService } from './../../services/database.service'
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.page.html',
  styleUrls: ['./transaccion.page.scss'],
})
export class TransaccionPage implements OnInit {
  editForm: FormGroup;
  id: any;

  constructor(
    private db: DatabaseService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.db.getTransaccion(this.id).then(res => {
      this.editForm.setValue({
        nombre: res['nombre'],
        cantidad: res['cantidad'],
        porcentajeIVA: res['porcentajeIVA'],
        descripcion: res['descripcion'],
        comprobante: res['comprobante']
      })
    })
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      nombre: [''],
      cantidad: [''],
      porcentajeIVA: [''],
      descripcion: [''],
      comprobante: ['']
    })
  }

  saveForm(){
    this.db.updateTransaccion(this.id, this.editForm.value)
    .then( (res) => {
      console.log(res)
      this.router.navigate(['/home']);
    })
  }

}
