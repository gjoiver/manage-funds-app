import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';

describe(`SidebarComponent`, () => {
  let fixture: ComponentFixture<SidebarComponent>;
  let component: SidebarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Given the component is created
    When initialized
    Then renders successfully`, () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it(`Given the initial state
    When asideClasses is evaluated
    Then contains the closed translate class`, () => {
    // Act
    const asideClasses = component['asideClasses']();

    // Assert
    expect(asideClasses).toContain('-translate-x-full');
  });

  it(`Given the sidebar is closed
    When toggle is called
    Then isOpen becomes true`, () => {
    // Act
    component['toggle']();

    // Assert
    expect(component['isOpen']()).toBe(true);
  });

  it(`Given the sidebar is open
    When toggle is called again
    Then isOpen becomes false`, () => {
    // Arrange
    component['toggle']();

    // Act
    component['toggle']();

    // Assert
    expect(component['isOpen']()).toBe(false);
  });

  it(`Given the sidebar is open
    When close is called
    Then isOpen becomes false`, () => {
    // Arrange
    component['toggle']();

    // Act
    component['close']();

    // Assert
    expect(component['isOpen']()).toBe(false);
  });

  it(`Given the sidebar is open
    When asideClasses is evaluated
    Then does not contain the closed class`, () => {
    // Arrange
    component['toggle']();

    // Act
    const classes = component['asideClasses']();

    // Assert
    expect(classes).not.toContain('-translate-x-full');
  });

  it(`Given the sidebar is open
    When asideClasses is evaluated
    Then contains the visible translate class`, () => {
    // Arrange
    component['toggle']();

    // Act
    const classes = component['asideClasses']();

    // Assert
    expect(classes).toContain('translate-x-0');
  });
});
