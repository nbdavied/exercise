import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(private snackBar: MatSnackBar) { }
  public openSnackBar(message:string){
    this.snackBar.open(message, "确认", {
      duration: 2000
    })
  }
}
