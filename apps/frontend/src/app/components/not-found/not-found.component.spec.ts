import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide true native error element',()=>{
    const data = fixture.nativeElement;
    expect(data.querySelector(".error").textContent).toContain("Oops!");
  });
  
  it('should provide true native notfound element',()=>{
    const data = fixture.nativeElement;
    expect(data.querySelector(".notfound").textContent).toContain("404 Not Found");
  })

  it('should provide true native error-details element',()=>{
    const data = fixture.nativeElement;
    expect(data.querySelector(".error-details").textContent).toContain("Sorry, an error has occured, Requested page not found!");
  })

  it('should provide true native error-actions element',()=>{
    const data = fixture.nativeElement;
    expect(data.querySelector(".error-actions").textContent).toContain("Take Me Home");
  })
});
