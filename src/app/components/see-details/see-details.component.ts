import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICase } from 'src/app/interfaces/Case.interface';

@Component({
  selector: 'app-see-details',
  templateUrl: './see-details.component.html',
  styleUrls: ['./see-details.component.scss']
})
export class SeeDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ICase[]) { }

  ngOnInit(): void {
  }

}
