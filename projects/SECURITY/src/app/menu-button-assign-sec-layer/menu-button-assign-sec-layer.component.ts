import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DragulaService } from 'ng2-dragula';
import { SecurityService } from '../../shared/security-service.service';

@Component({
  selector: 'app-menu-button-assign-sec-layer',
  templateUrl: './menu-button-assign-sec-layer.component.html',
  styleUrls: ['./menu-button-assign-sec-layer.component.scss']
})
export class MenuButtonAssignSecLayerComponent implements OnInit {

  today =new Date();

  dataSource: MatTableDataSource<Element>;
  expandedElement: any;
  
  displayedColumns = ['action', 'sec_layer_name','menu_name','visible','disable','edit'  ];
  MenuItemSecLayerList : any=[];
  SecurityLayerList : any=[];
  MenuItemList : any=[];
  MenuButtonList : any=[];

  menuItemSecLayer_id : number = 0;
  secLayer_id : number = 0;
  menuItem_id : number = 0;
  menuButton_id : number = 0;

  is_visible : boolean = true; 
  is_disable : boolean = false; 

  btnName:string = "Save";

  constructor(private dragulaService: DragulaService,public securityService:SecurityService) {
    this.dataSource = new MatTableDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: false })
  set paginator(v: MatPaginator) {
    this.dataSource.paginator = v;
  }

  ngOnInit(): void {
    setInterval(() => { this.today = new Date();}, 1000);

    this.securityService.GetSecurityLayer().then(data=>{
      this.SecurityLayerList = this.prepareSecurityLayerList(data);
    });
    
    this.onLoad();
  }

  ngAfterViewInit(): void {
    //this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
 }

 
   //MenuItem SecLayer Functions
  EditMenuItemSecLayer(menuItemSecLayerID:string){
    this.btnName = "Edit";
    this.menuItemSecLayer_id = parseInt(menuItemSecLayerID);
    for(var i=0;i<this.MenuItemSecLayerList.length;i++){
      if(this.MenuItemSecLayerList[i].SecLayerMenuID==menuItemSecLayerID){
        this.menuItem_id = this.MenuItemSecLayerList[i].MenuID;
        this.secLayer_id = this.MenuItemSecLayerList[i].SecLayerID;
        this.is_visible = this.MenuItemSecLayerList[i].Visible;
        this.is_disable = this.MenuItemSecLayerList[i].Disable;
      }
    }
  }
  
  //MenuItem SecLayer Functions
  AssignMenuItemSecLayer(){
    if(this.menuItem_id > 0 && this.secLayer_id > 0 ){
      var data = {"iSecLayerMenuID":this.menuItemSecLayer_id,"iSecLayerID":this.secLayer_id,"iMenuID":this.menuItem_id,
      "boolVisible":this.is_visible,"boolDisable":this.is_disable};
      this.securityService.AddMenuItemAssign(data).subscribe(c=>{
        alert(c);
          this.onLoad();
          this.Clear();
       });
    }else{
      alert("Check Inputs");
    }
  }

  onChangeSecLayer(item : any ){
    this.securityService.GetMenuItemsBySecLayerID(this.secLayer_id.toString()).then(data=>{
      this.MenuItemList = this.prepareMenuItemList(data);
    });
  }

  onChangeMenuItem(item : any ){
    this.securityService.GetMenuButtonsByMenuID(this.menuItem_id.toString()).then(data=>{
      this.MenuButtonList = this.prepareMenuButtonList(data);
    });
  }

  Clear(){
    this.menuItemSecLayer_id=0;
    this.menuItem_id=0;
    this.secLayer_id=0;
    this.btnName="Save";
  }

  onLoad(){
    this.securityService.GetMenuButtonAssignSecLayer().then(data=>{
      this.MenuItemSecLayerList = this.prepareMenuButtonSecLayerList(data);
      this.dataSource.data = this.MenuItemSecLayerList;
    });
  }

  prepareMenuItemList(rows:any) {
    const res=[];
    for(let i=0;i<rows.length;i++) {
      res.push({
        MenuItemID:rows[i].iMenuID,
        MenuItemName:rows[i].strMenu_Alias,
      });
    }
    return res;
  }

  prepareMenuButtonList(rows:any) {
    const res=[];
    for(let i=0;i<rows.length;i++) {
      res.push({
        MenuButtonID:rows[i].iBtnID,
        MenuButtonName:rows[i].strBtnName,
      });
    }
    return res;
  } 

  prepareSecurityLayerList(rows:any) {
    const res=[];
    for(let i=0;i<rows.length;i++) {
      res.push({
        SecLayerID:rows[i].iSecLayerID,
        SecLayerName:rows[i].strSecLayerName
      });
    }
    return res;
  }

  prepareMenuButtonSecLayerList(rows:any) {
    const res=[];
    for(let i=0;i<rows.length;i++) {
      res.push({
        SecLayerMenuButtonID:rows[i].iSecLayerMenuID,
        SecLayerID:rows[i].iSecLayerID,
        SecLayerName:rows[i].strSecLayerName,
        MenuID:rows[i].iMenuID,
        BtnID:rows[i].iBtnID,
        ButtonName:rows[i].strBtn_Alias,
        Visible:rows[i].boolVisible,
        Disable:rows[i].boolDisable
      });
    }
    return res;
  }

}
export interface MenuButtonSeclayer {
  iSecLayerMenuID: number;
  iSecLayerID: number;
  iMenuID: number;
  boolVisible:boolean;
  boolDisable:boolean;
}