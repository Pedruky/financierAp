import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransaccionesPage } from './transacciones.page';

describe('TransaccionesPage', () => {
  let component: TransaccionesPage;
  let fixture: ComponentFixture<TransaccionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaccionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransaccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
