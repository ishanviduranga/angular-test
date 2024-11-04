import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
//import { MatTreeModule } from '__node_modules/@angular/material/tree';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

import { MatChipsModule } from '@angular/material/chips';
import { MiNavComponent } from './mi-nav/mi-nav.component';

import { DragulaModule } from 'ng2-dragula';
import { MisHomeComponent } from './mis-home/mis-home.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { MatTreeModule } from '@angular/material/tree';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatSelectModule} from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {OverlayModule} from '@angular/cdk/overlay';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { ProductComponent } from './product/product.component';
import { GroupComponent } from './group/group.component';
import { SecurityLayerComponent } from './security-layer/security-layer.component';
import { MenuGroupComponent } from './menu-group/menu-group.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { MenuItemAssignSecLayerComponent } from './menu-item-assign-sec-layer/menu-item-assign-sec-layer.component';
import { MenuButtonAssignSecLayerComponent } from './menu-button-assign-sec-layer/menu-button-assign-sec-layer.component';
import { MisConfigurationComponent } from './mis-configuration/mis-configuration.component';
import { AppRoutingModule } from './app-routing.module';

const appRoutes: Routes = [
    { path: '', component: MisHomeComponent, data: { title: '' } },
    { path: 'home', component: MisHomeComponent, data: { title: 'home'}},
    { path: 'configuration', component: MisConfigurationComponent, data: { title: 'configuration'}},
    { path: 'product', component: ProductComponent, data: { title: 'product'}},
    { path: 'group', component: GroupComponent, data: { title: 'group'}},
    { path: 'securitylayer', component: SecurityLayerComponent, data: { title: 'securitylayer'}},
    { path: 'menuitem', component: MenuItemComponent, data: { title: 'menuitem'}},
    { path: 'menugroup', component: MenuGroupComponent, data: { title: 'menugroup'}},
    { path: 'menubutton', component: MenuButtonComponent, data: { title: 'menubutton'}},
    { path: 'menuitemassign', component: MenuItemAssignSecLayerComponent, data: { title: 'menuitemassign'}},
    { path: 'menubuttonsassignseclayer', component: MenuButtonAssignSecLayerComponent, data: { title: 'menubuttonsassignseclayer'}},
    { path: 'seclayerassigngroup', component: MenuButtonComponent, data: { title: 'seclayerassigngroup'}},
    { path: 'userassigngroup', component: MenuButtonComponent, data: { title: 'userassigngroup'}},
    { path: 'userassignseclayer', component: MenuButtonComponent, data: { title: 'userassignseclayer'}},
    
    { path: 'reports', component: ReportDetailsComponent, data: { title: 'reports'}},
];

@NgModule({
  exports: [
    MatSidenavModule,
  ],

  declarations: [
    AppComponent,
    MiNavComponent,
    MisHomeComponent,
    FooterComponent,
    ReportDetailsComponent,
    MenuListItemComponent,
    ProductComponent,
    GroupComponent,
    SecurityLayerComponent,
    MenuGroupComponent,
    MenuItemComponent,
    MenuButtonComponent,
    MenuItemAssignSecLayerComponent,
    MenuButtonAssignSecLayerComponent,
    MisConfigurationComponent
  ],

  imports: [
    MatTabsModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,    
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatTreeModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatBadgeModule,
    CdkTreeModule,
    MatChipsModule,
    HttpClientModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatRadioModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatBadgeModule,
    MatChipsModule,
    AppRoutingModule,
    
    RouterModule.forRoot(
      appRoutes,{ useHash: false }
    )
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
 ],
  //providers: [DashboardService],

  bootstrap: [AppComponent]
})

export class AppModule { }

export class DragulaDemoModule { }
