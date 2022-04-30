import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatCardComponent } from 'src/app/component/stat-card/stat-card.component';
import { VideoCardComponent } from 'src/app/component/video-card/video-card.component';
import { UserListComponent } from 'src/app/component/user-list/user-list.component';
import { ExerciseComponent } from 'src/app/pages/exercise/exercise.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    StatCardComponent,
    VideoCardComponent,
    UserListComponent,
    ExerciseComponent
  ]
})

export class AdminLayoutModule {}
