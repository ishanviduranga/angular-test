import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import { ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { SecurityService } from '../../shared/security-service.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { DOCUMENT } from '@angular/common';

//import jsPDF from 'jspdf';
//import 'jspdf-autotable';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit {

  today =new Date();
  
  displayedColumns = ['company', 'holding','noofshares','totalCost','costperShare','marketpriceStart','marketpriceCurrent','marketValue','unrealisedPL','unrealisedOCI','unrealisedTotal' ];
  displayedColumnsTotal = ['TotalInvestmentTitle1', 'TotalInvestmentTitle2','emptyFooter','TotalInvestment','emptyFooter','emptyFooter','emptyFooter','TotalMarketValue','emptyFooter','emptyFooter','emptyFooter' ];
  
  dataSource: MatTableDataSource<Element>;
  selection = new SelectionModel<Element>(true, []);
  SummeryList: any[] =[];
 
  marketnum:number=0;
  prepare: any[] =[];


  TotalInvestment:number=0;
  TotalMarketValue:number=0;

  UnrealizedTotalCost:number = 0;
  UnrealizedTotalMarketValue:number = 0;
  UnrealizedTotalPL:number = 0;
  UnrealizedTotalOCI:number = 0;
  UnrealizedTotalAll:number = 0;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

/*
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }*/

  @ViewChild(MatPaginator, { static: false })
  set paginator(v: MatPaginator) {
    this.dataSource.paginator = v;
  }

  constructor(private dragulaService: DragulaService,public securityService:SecurityService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    setInterval(() => { this.today = new Date();}, 1000);

    this.securityService.GetSummery().then(data=>{
      this.SummeryList = this.prepareSummeryList(data.TypeList);

      this.UnrealizedTotalCost = data.dUnrealizedTotalCost;
      this.UnrealizedTotalMarketValue = data.dUnrealizedTotalMarketValue;
      this.UnrealizedTotalPL = data.dUnrealizedTotalPL;
      this.UnrealizedTotalOCI = data.dUnrealizedTotalOCI;
      this.UnrealizedTotalAll = data.dUnrealizedTotalAll;

      this.dataSource.data = this.SummeryList;
    });
    
  }

  ngAfterViewInit(): void {
    //this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
 }



 prepareSummeryList(rows:any) {
   const res=[];

  for(let i=0;i<rows.length;i++) {
    res.push({initial: rows[i].strTypeName, isGroupBy: true});
    
    for(let j=0;j<rows[i].CategoryList.length;j++) {

      if(rows[i].CategoryList[j].strCategoryName!=""){
        res.push({initial: "- "+ rows[i].CategoryList[j].strCategoryName, isGroupBy: true});
      }
      
      for(let k=0;k<rows[i].CategoryList[j].SummeryList.length;k++) {

        res.push({
          CompanyName:rows[i].CategoryList[j].SummeryList[k].strCompanyName,
          Holding:rows[i].CategoryList[j].SummeryList[k].dHolding,
          NoOfShares:rows[i].CategoryList[j].SummeryList[k].iNoOfShares,
          TotalCost:rows[i].CategoryList[j].SummeryList[k].dTotalCost,
          CostPerShare:rows[i].CategoryList[j].SummeryList[k].dCostPerShare,
          MarketPriceStart:rows[i].CategoryList[j].SummeryList[k].dMarketPriceStart,
          MarketPriceCurrent:rows[i].CategoryList[j].SummeryList[k].dMarketPriceCurrent,
          MarketValue:rows[i].CategoryList[j].SummeryList[k].dMarketValue,
          UnrealisedCurrent: rows[i].CategoryList[j].SummeryList[k].dUnrealisedCurrent,
          
          UnrealisedPL : rows[i].CategoryList[j].SummeryList[k].strClassification=="FVPL" ? rows[i].CategoryList[j].SummeryList[k].dUnrealisedCurrent:"0",
          UnrealisedOCI : rows[i].CategoryList[j].SummeryList[k].strClassification=="FVOCI" ?rows[i].CategoryList[j].SummeryList[k].dUnrealisedCurrent:"0",
          Classification : rows[i].CategoryList[j].SummeryList[k].strClassification,
        });

      }
    }

    this.TotalInvestment += rows[i].dTotalCost;
    this.TotalMarketValue+=rows[i].strTypeName=="Un Quoted Investments" ? rows[i].dTotalCost : rows[i].dMarketValue;

    res.push({CompanyName:"Total", Holding:"", NoOfShares:null,
      TotalCost:rows[i].dTotalCost,
      CostPerShare:null, MarketPriceStart:null, MarketPriceCurrent:null,
      MarketValue:rows[i].dMarketValue,
      UnrealisedCurrent:rows[i].dUnrealisedTotal,
      UnrealisedPL:rows[i].dUnrealisedPL,
      UnrealisedOCI:rows[i].dUnrealisedOCI,
      Classification:""
    });
  }
   return res;
 }
 saverange(num:number,companyID:number){
   this.marketnum=num;
 }

//PDF Generate
numberWithCommas(x:number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
  
downloadPdf() { 
//Summery records
    //this.SummeryList.push([]);
    /*this.SummeryList.push({CompanyName:"Unrealized Gain /(Loss)", Holding:" Quoted", NoOfShares:" Shares",
      TotalCost:this.UnrealizedTotalCost, CostPerShare:"", MarketPriceStart:"", MarketPriceCurrent:"",
      MarketValue:this.UnrealizedTotalMarketValue, UnrealisedCurrent:this.UnrealizedTotalAll, 
      UnrealisedPL:this.UnrealizedTotalPL, UnrealisedOCI:this.UnrealizedTotalOCI, Classification:""
    });*/

    this.SummeryList.push({CompanyName:"Unrealized Gain /(Loss) Quoted Shares", Holding:null, NoOfShares:null,
    TotalCost:this.UnrealizedTotalCost, CostPerShare:null, MarketPriceStart:null, MarketPriceCurrent:null,
    MarketValue:this.UnrealizedTotalMarketValue, UnrealisedCurrent:this.UnrealizedTotalAll, 
    UnrealisedPL:this.UnrealizedTotalPL, UnrealisedOCI:this.UnrealizedTotalOCI, Classification:""
    }); 

    this.SummeryList.push({CompanyName:"Total Investments", Holding:null, NoOfShares:null,
      TotalCost:this.TotalInvestment, CostPerShare:null, MarketPriceStart:null, MarketPriceCurrent:null,
      MarketValue:null,UnrealisedCurrent:null, UnrealisedPL:null,UnrealisedOCI:null, Classification:""
    });

    this.prepare=[];
    this.SummeryList.forEach(e=>{
      var tempObj =[];
          
      tempObj.push(e.initial!=undefined?e.initial:e.CompanyName);
      tempObj.push(e.Holding);
      tempObj.push(e.NoOfShares!=null ? new Intl.NumberFormat().format(e.NoOfShares):"");
      tempObj.push(e.TotalCost!=null ? new Intl.NumberFormat().format(e.TotalCost):"");
      tempObj.push(e.CostPerShare!=null ? new Intl.NumberFormat().format(e.CostPerShare):"");
      tempObj.push(e.MarketPriceStart!=null ? new Intl.NumberFormat().format(e.MarketPriceStart):"");
      tempObj.push(e.MarketPriceCurrent!=null ? new Intl.NumberFormat().format(e.MarketPriceCurrent):"");
      tempObj.push(e.MarketValue!=null ? new Intl.NumberFormat().format(e.MarketValue):"");
      
      if(e.initial!=undefined){
        tempObj.push(null);
        tempObj.push(null);
      }else{
        if(e.Classification=="FVPL"){
          tempObj.push(e.UnrealisedCurrent!=null ? new Intl.NumberFormat().format(e.UnrealisedCurrent):"");
          tempObj.push("-");
        }else if(e.Classification=="FVOCI"){
          tempObj.push("-");
          tempObj.push(e.UnrealisedCurrent!=null ? new Intl.NumberFormat().format(e.UnrealisedCurrent):"");
        }else{
          tempObj.push(e.UnrealisedPL!=null ? new Intl.NumberFormat().format(e.UnrealisedPL):"");
          tempObj.push(e.UnrealisedOCI!=null ? new Intl.NumberFormat().format(e.UnrealisedOCI):"")
        }
      }      
      tempObj.push(e.UnrealisedCurrent!=null ? new Intl.NumberFormat().format(e.UnrealisedCurrent):"");

      this.prepare.push(tempObj);
      
//------------------
      if(e.CompanyName=="Total"){
        this.prepare.push(["","","","","","","","","","",""]);
      }

    });
 
    const doc = new jsPDF('l', 'mm', [297, 210]);

    doc.text('Mercantile Investment and Finance PLC', 11, 9);    
    doc.setFontSize(16);

    (doc as any).autoTable({
      head: [['Company','Holding','No of Shares','Total Cost','Cost per Share','Market Price (Start)','Market Price (Current)','Market Value','Unrealised PL','Unrealised OCI','Unrealised Total']],
      body: this.prepare,
      startY: 18,
      showHead: 'everyPage',
      //theme: 'plain', 
      styles: {
        fontSize: 8,
        cellPadding: 1,
      },
      didDrawPage: function (data:any) {

        var date = new Date();
        var dateString = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

        // Header
        doc.setFontSize(8);
        doc.setTextColor(40);
        doc.text("Created Date : "+ dateString, data.settings.margin.left, 13);
    
        // Footer
        var str = "Page "+ doc.getNumberOfPages();
        doc.setFontSize(10);
    
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
      columnStyles: {
        5: {cellWidth: 40}
      },
      bodyStyles: {
          minCellHeight: 5
      }

    });
    
    doc.save('cse-report' + '.pdf');
  }

  isGroup(index:any, item:any): boolean{
    return item.isGroupBy;
  }
}

export interface Company {
  iCompanyID: number;
  strCompanyName: string;
}





