import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Transaccion } from './transaccion';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private storage: SQLiteObject;
  transaccionesList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchTransaccion(): Observable<Transaccion[]> {
    return this.transaccionesList.asObservable();
  }

    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getTransacciones();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

  // Get list
  getTransacciones(){
    return this.storage.executeSql('SELECT * FROM transacciontable', []).then(res => {
      let items: Transaccion[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,  
            cantidad: res.rows.item(i).cantidad,
            porcentajeIVA: res.rows.item(i).porcentajeIVA,
            descripcion: res.rows.item(i).descripcion,
            comprobante: res.rows.item(i).comprobante
           });
        }
      }
      this.transaccionesList.next(items);
    });
  }

  // Add
  addTransaccion(nombre, cantidad, porcentajeIVA, descripcion, comprobante) {
    let data = [nombre, cantidad, porcentajeIVA, descripcion, comprobante];
    return this.storage.executeSql('INSERT INTO transacciontable (nombre, cantidad, porcentajeIVA, descripcion, comprobante) VALUES (?, ?, ?, ?, ?)', data)
    .then(res => {
      this.getTransacciones();
    });
  }

  // Get single object
  getTransaccion(id): Promise<Transaccion> {
    return this.storage.executeSql('SELECT * FROM transacciontable WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        nombre: res.rows.item(0).nombre,  
        cantidad: res.rows.item(0).cantidad,
        porcentajeIVA: res.rows.item(0).porcentajeIVA,
        descripcion: res.rows.item(0).descripcion,
        comprobante: res.rows.item(0).comprobante
      }
    });
  }

  // Update
  updateTransaccion(id, transaccion: Transaccion) {
    let data = [transaccion.nombre, transaccion.cantidad, transaccion.porcentajeIVA, transaccion.descripcion, transaccion.comprobante];
    return this.storage.executeSql(`UPDATE transacciontable SET nombre = ?, cantidad = ?, porcentajeIVA = ?, porcentajeIVA = ?, descripcion = ?, comprobante = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getTransacciones();
    })
  }

  // Delete
  deleteTransaccion(id) {
    return this.storage.executeSql('DELETE FROM transacciontable WHERE id = ?', [id])
    .then(_ => {
      this.getTransacciones();
    });
  }
}
