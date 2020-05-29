import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // false == not loading 

  constructor() { }

  setLoader(value: boolean){
    this.isLoading.next(value);
  }
  getLoaderValue$(){
    return this.isLoading.asObservable();
  }


}
