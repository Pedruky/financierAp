import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransaccionPage } from './transaccion.page';

describe('TransaccionPage', () => {
  let component: TransaccionPage;
  let fixture: ComponentFixture<TransaccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransaccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
