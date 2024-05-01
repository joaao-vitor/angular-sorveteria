import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUserDropdownComponent } from './menu-user-dropdown.component';

describe('MenuUserDropdownComponent', () => {
  let component: MenuUserDropdownComponent;
  let fixture: ComponentFixture<MenuUserDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuUserDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuUserDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
