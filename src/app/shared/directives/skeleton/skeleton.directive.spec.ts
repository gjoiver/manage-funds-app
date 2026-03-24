import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonDirective } from './skeleton.directive';

@Component({
  standalone: true,
  imports: [SkeletonDirective],
  template: `<div [appSkeleton]="showSkeleton" style="width:100px;height:50px;"></div>`,
})
class TestHostComponent {
  showSkeleton = false;
}

describe(`SkeletonDirective`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Given appSkeleton is false
    When the directive initializes
    Then no overlay is appended to the host`, () => {
    // Act
    fixture.detectChanges();

    // Assert
    const overlay = fixture.nativeElement.querySelector('.skeleton-overlay');
    expect(overlay).toBeNull();
  });

  it(`Given appSkeleton changes to true
    When the directive reacts
    Then appends a skeleton overlay to the host`, () => {
    // Act
    host.showSkeleton = true;
    fixture.detectChanges();

    // Assert
    const overlay = fixture.nativeElement.querySelector('.skeleton-overlay');
    expect(overlay).not.toBeNull();
  });

  it(`Given appSkeleton is true
    When the directive reacts
    Then sets position relative on the host element`, () => {
    // Arrange
    host.showSkeleton = true;

    // Act
    fixture.detectChanges();

    // Assert
    const el = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(el.style.position).toBe('relative');
  });

  it(`Given appSkeleton is true
    When the directive reacts
    Then sets overflow hidden on the host element`, () => {
    // Arrange
    host.showSkeleton = true;

    // Act
    fixture.detectChanges();

    // Assert
    const el = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(el.style.overflow).toBe('hidden');
  });

  it(`Given the skeleton overlay is active
    When appSkeleton changes to false
    Then removes the overlay from the host`, () => {
    // Arrange
    host.showSkeleton = true;
    fixture.detectChanges();

    // Act
    host.showSkeleton = false;
    fixture.detectChanges();

    // Assert
    const overlay = fixture.nativeElement.querySelector('.skeleton-overlay');
    expect(overlay).toBeNull();
  });

  it(`Given the skeleton overlay is active
    When appSkeleton changes to false
    Then resets the position style on the host`, () => {
    // Arrange
    host.showSkeleton = true;
    fixture.detectChanges();

    // Act
    host.showSkeleton = false;
    fixture.detectChanges();

    // Assert
    const el = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(el.style.position).toBe('');
  });
});
