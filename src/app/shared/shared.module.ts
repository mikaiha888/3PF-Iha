import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListCardsComponent } from './components/list-cards/list-cards.component';
import { ListHeaderComponent } from './components/list-header/list-header.component';

import { HeaderFontSizeDirective } from './directives/header-font-size.directive';
import { FormFieldValidationsPipe } from './pipes/form-field-validations.pipe';
import { DisplayFullnamePipe } from './pipes/display-fullname.pipe';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    NavbarComponent,
    FormFieldValidationsPipe,
    DisplayFullnamePipe,
    HeaderFontSizeDirective,
    ListCardsComponent,
    ListHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [
    NavbarComponent,
    ListCardsComponent,
    ListHeaderComponent,
    HeaderFontSizeDirective,
    FormFieldValidationsPipe,
    DisplayFullnamePipe,
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule {}