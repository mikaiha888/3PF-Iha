import { Component, OnInit } from '@angular/core';
import { Classe } from '../../../../core/models';
import { ClassesService } from '../../../../core/services/classes.service';
import { MatDialog } from '@angular/material/dialog';
import { ClasseDialogComponent } from '../../components/classe-dialog/classe-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classe-detail',
  templateUrl: './classe-detail.component.html',
  styleUrl: './classe-detail.component.scss',
})
export class ClasseDetailComponent implements OnInit {
  classe?: Classe;
  classeData = {
    courseName: '',
    classNumber: ''
  };

  constructor(
    private _classes: ClassesService,
    private _router: Router,
    private matDialog: MatDialog
  ) {
    this.classeData.courseName = this._router.url
  }
  
  ngOnInit(): void {
    // this._classes.getClasseByData()
  }

  updateClasse(editingClasse: Classe): void {
    this.matDialog
      .open(ClasseDialogComponent, { data: editingClasse })
      .afterClosed()
      .subscribe({
        next: (response) => {
          response.id = editingClasse.id;
          this._classes.updateClasse(response).subscribe({
            next: (updatedClasse) => (this.classe = updatedClasse),
          });
        },
      });
  }
}
