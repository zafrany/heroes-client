import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
  private _loaderOpen : boolean = true;

  private _loaderSubject = new Subject<boolean> ();
  currentLoaderState = this._loaderSubject.asObservable();

  constructor() { }

  closeLoader() : void {
    this._loaderOpen = false;
    this._loaderSubject.next(this._loaderOpen) ;
  }

  openLoader() : void {
    this._loaderOpen = true;
    this._loaderSubject.next(this._loaderOpen) ;
  }

}
