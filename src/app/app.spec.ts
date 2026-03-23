import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { RouterModule } from '@angular/router';

describe(`App`, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it(`Given the root component
    When it is created
    Then it initializes successfully`, () => {
    // Act
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    // Assert
    expect(app).toBeTruthy();
  });

  it(`Given the root component
    When rendered
    Then contains the sidebar`, () => {
    // Arrange
    const fixture = TestBed.createComponent(App);

    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement.querySelector('app-sidebar')).not.toBeNull();
  });
});
