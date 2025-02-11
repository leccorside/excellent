import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteListComponent } from './cliente-list.component';

describe('ClienteListComponent', () => {
  let component: ClienteListComponent;
  let fixture: ComponentFixture<ClienteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of clientes', () => {
    component.clientes = [
      { nome: 'Cliente 1' },
      { nome: 'Cliente 2' },
      { nome: 'Cliente 3' }
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('li').length).toBe(3);
    expect(compiled.querySelector('li')?.textContent).toContain('Cliente 1');
  });
});
