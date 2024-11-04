import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../app/product/product.component';
import { Group } from '../app/group/group.component';
import { SecurityLayer } from '../app/security-layer/security-layer.component';
import { MenuGroup } from '../app/menu-group/menu-group.component';
import { MenuItem } from '../app/menu-item/menu-item.component';
import { MenuButton } from '../app/menu-button/menu-button.component';
import { MenuItemSeclayer } from '../app/menu-item-assign-sec-layer/menu-item-assign-sec-layer.component';

@Injectable({
  providedIn: 'root'
})

export class SecurityService {

  constructor(private http:HttpClient,private router : Router) { }
  //readonly baseurl = "http://192.168.100.51:8010/core";
  //readonly baseurl="http://localhost:8010/core";
  readonly baseurl = "http://localhost:44368";
  //readonly baseurl = "http://192.168.100.51:6067/CSE";

  public productList : any;

  GetIsUserActive():Observable<string>{
    return this.http.get<any>(this.baseurl +"/api/SecurityModuleAPI/GetIsUserActive");  
  }

  GetCurrentUser():Observable<string>{
    return this.http.get<any>(this.baseurl +"/api/SecurityModuleAPI/GetCurrentUser");
  }

  Logout():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetRemoveUser").toPromise(); 
  }

  //------------------

  AddProduct(product: Product){
    return this.http.post<Product>(this.baseurl +"/api/SecurityModuleAPI/CreateProduct", product);
  }
  getNavItems(): Observable<NavItem[]> {
    return this.http.get<NavItem[]>(this.baseurl +"/api/SecurityModuleAPI/GetNavItems");
  }
  GetProduct():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllProducts").toPromise();
  }
  GetMenu():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetNavItems").toPromise();
  }
  AddGroup(group: Group){
    return this.http.post<Group>(this.baseurl +"/api/SecurityModuleAPI/CreateGroup", group);
  }

  GetGroup():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllGroups").toPromise();
  }
  
   AddSecurityLayer(securityLayer: SecurityLayer){
    return this.http.post<Group>(this.baseurl +"/api/SecurityModuleAPI/CreateLayer", securityLayer);
  }

  GetSecurityLayer():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllSecurityLayers").toPromise();
  } 

  AddMenuGroup(menugroup: MenuGroup){
    return this.http.post<MenuGroup>(this.baseurl +"/api/SecurityModuleAPI/CreateMenuGroup", menugroup);
  }

  GetMenuGroup():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllMenuGroups").toPromise();
  }

  AddMenuItem(menuItem: MenuItem){
    return this.http.post<MenuItem>(this.baseurl +"/api/SecurityModuleAPI/CreateMenuItems", menuItem);
  }

  GetMenuItem():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllMenuItems").toPromise();
  } 

  GetParentMenu():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllParentMenuItems").toPromise();
  }

  AddMenuButton(menuButton: MenuButton){
    return this.http.post<MenuButton>(this.baseurl +"/api/SecurityModuleAPI/CreateMenuButtons", menuButton);
  }
  
  GetMenuButton():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllMenuButtons").toPromise();
  }

  AddMenuItemAssign(menuButton: MenuItemSeclayer){
    return this.http.post<MenuItemSeclayer>(this.baseurl +"/api/SecurityModuleAPI/MenuItemsAssignSecurityLayer", menuButton);
  }
  
  GetMenuItemAssign():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllMenuItemsSecLayer").toPromise();
  }

  GetMenuButtonsByMenuID(menuID : string):Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllMenuButtonsByMenuId?MenuId="+menuID).toPromise();
  }

  GetMenuItemsBySecLayerID(secLayerID : string):Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllMenuItemsBySecLayerId?SecLayerId="+secLayerID).toPromise();
  }

  GetMenuButtonAssignSecLayer():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/MenuButtonsAssignSecLayers").toPromise();
  }









  GetClassification():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllClassification").toPromise();
  }

  GetType():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllType").toPromise();
  }

  GetCategory():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllCategory").toPromise();
  }

  GetCompany():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllCompany").toPromise();
  }

  GetSecurity():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllSecurity").toPromise();
  }

  GetBuy():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllBuy").toPromise();
  }

  GetSell():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllSell").toPromise();
  }
/*
  AddMovement(movement: Movement){
    return this.http.post<Movement>(this.baseurl +"/api/SecurityModuleAPI/AddMovement", movement);
  }
*/
  GetMovement():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllMovement").toPromise();
  }

  GetAvailableShares(CompanyID:string,SecurityID:string):Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAvailableShares/"+CompanyID+"/"+SecurityID).toPromise();
  }

  GetSummery():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetSummery").toPromise();
  }

  GetMarketPrice():Promise<any>{
    return this.http.get(this.baseurl +"/api/SecurityModuleAPI/GetAllMarketPrice").toPromise();
  }


}
export interface NavItem {
  displayName: string;
  iconName: string;
  route: string;
  children?: NavItem[];
}