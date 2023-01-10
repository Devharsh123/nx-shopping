import { HttpClientModule } from "@angular/common/http";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

export class User {
  _id: string='';
  email: string='';
  password: string='';
  __v: number=0;
}

export class Token {
  access_token: string =''
}

const user ={
  email:'demo@gmail.com',
  password: 'demo123'
}

const loggedInUser = {
  email: 'kevin@gmail.com',
  password: 'kevin123'
}

const api = 'http://localhost:3333/api'

describe('Auth Service',()=>{
  let httpMock: HttpTestingController;
 let service: AuthService;
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpClientTestingModule],
      providers: []
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should return user',fakeAsync(()=>{
    service.registerUser(user).subscribe(user=>{
      expect(user).toStrictEqual(typeof User)
    })

    const req = httpMock.expectOne({
      method: 'POST',
      url: `${api}/user/create`
    });
    expect(req.request.method).toBe('POST');
    req.flush(typeof User);

    tick();
    expect(service)
  }))

  it('should return user',()=>{
    service.loginUser(loggedInUser).subscribe(user=>{
      expect(user).toStrictEqual(typeof User)
    })

    const req = httpMock.expectOne({
      method: 'POST',
      url: `${api}/auth/login`
    });
    expect(req.request.method).toBe('POST');
    req.flush(typeof User)
  })
})