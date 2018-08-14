import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UsersService } from '../../providers/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import * as async from 'async';
import { concat } from 'rxjs/operators/concat';
import { DataTableModule, SharedModule, GrowlModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';


@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
    data: any;
    msgs: Message[] = [];
    // msgs: any = [];
    dayArr: any = [];
    monthData: any = [];
    public loading = false;
    selectedValue: any;
    days_iterator = 1;
    yearData: any = [];
    year_iterator = 2010;
    month_iterator = 1;
    dayData: any = [];
    volumeDayData: any = [];
    lineChartDayLabels: any = [];
    lineChartDayData: any = [];
    myLineChartDataArr: any = [];

    dayFlag: boolean = false;
    tanksArray: any = [];

    volumeMonthData: any = [];
    lineChartMonthLabels: any = [];
    lineChartMonthData: any = [];
    monthFlag: boolean = false;


    volumeYearData: any = [];
    lineChartYearLabels: any = [];
    lineChartYearData: any = [];
    yearFlag: boolean = false;

    totalTransitVolume: any = [];
    pieChartLabels: any = [];
    pieChartData: any = [];
    pieChartType: any;
    totalVolumes: any = [];
    singleTankValue: any = [];
    tankjson: any;
    tankId: any;
    selectTime: number = 1;
    ch: any = [];
    select: number = 1;
    selectDay: number = 1;

    //for bar
    checkTankId: any;
    barChartDayLabels: any = [];
    barChartDayData: any = [];

    barChartMonthLabels: any = [];
    barChartMonthData: any = [];

    barChartYearData: any = [];
    barChartYearLabels: any = [];

    barChartDayvolume: any = [];
    barChartYearvolume: any = [];
    barChartMonthvolume: any = [];


    dayBarFlag: boolean = false;
    monthBarFlag: boolean = false;
    yearBarFlag: boolean = false;

    bar_days_iterator = 1;
    bar_month_iterator = 1;
    bar_year_iterator = 2010;

    selectedBarDays: any = [];
    selectedBarMonth: any = [];
    selectedBarYear: any = [];

    singleTankDay: any = [];
    singleTankMonth: any = [];
    singleTankYear: any = [];
    singleLineTankArray: any = [];
    singleTankForMonth: any = [];
    singleTankForYear: any = [];

    tempArray: any = [];
    selectedDays: any = [];
    selectedMonth: any = [];
    selectedYear: any = [];
    padsArr: any = [];

    PieType: any[] = [
        { id: 1, Name: 'All Tanks' },
        { id: 2, Name: 'Single Tank' }
    ];
pieChartValue:any;

    selectTime1:number = 1;
    selectTime2:number = 2;
    selectTime3:number = 3;

    //bar
    selectDay2:number = 2;
    selectDay3:number = 3;

    barChartColors=[{ fillColor: 'rgba(151,187,205,0.2)'}];
    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    // public lineChartLabels: Array<any> = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'sept', 'Oct', 'Nov', 'Dec'];
    public lineChartOptions: any = {
        responsive: true
    };

    // public Time = [{ label: 'Day' }, { label: 'Months' }, { label: 'year' }];
    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';
    public randomize(): void {

    }


    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };


    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    // bar charts events
    public barChartClicked(e: any): void {
        console.log(e);
    }

    public barChartHovered(e: any): void {
        console.log(e);
    }

    constructor(private userService: UsersService, private router: Router, private route: ActivatedRoute) {
        this.tankId = 'all';
        this.checkTankId = 'all';
    }

    ngOnInit() {
        this.fetchDayData();
        this.fetchMonthChart();
        this.fetchYearChart();
        this.pieChart();
        // this.pieChartVolume();
        this.totalVolume();
        this.fetchtanks();
        this.fetchBarDayData();
        this.fetchBarMonthChart();
        this.fetchBarYearChart();

    }
    typeOfReports(type) {

        if (type == 'days') {
            console.log('check days');
            this.selectedMonth = [];
            this.selectedYear = [];
            this.lineChartDayLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
            this.dayArr.forEach((item, index) => {
                for (var i = this.days_iterator; i <= 31; i++) {
                    if (item._id == i) {
                        this.volumeDayData.push(parseInt(item.volume));
                        this.days_iterator = i + 1;
                        break;
                    } else {
                        this.volumeDayData.push(0);
                    }
                }
                if (this.dayArr.length == index + 1) {
                    console.log('in if');
                    this.lineChartDayData = [{ data: this.volumeDayData, label: 'Daily Volume' }];
                    this.dayFlag = true;
                    this.monthFlag = false;
                    this.yearFlag = false;
                    //this.selectTime=1;
                }
             
            });
        }
        // else{
        //     this.msgs = [];
        //     this.msgs.push({ severity: 'error', summary: 'Error', detail: "Insufficient Data"});
        // }
        if (type == 'months') {
            console.log('check month');
            this.selectedDays = [];
            this.selectedYear = [];
            this.lineChartMonthLabels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'sept', 'Oct', 'Nov', 'Dec'];
            this.monthData.forEach((item, index) => {
                for (var i = this.month_iterator; i <= 12; i++) {
                    if (item._id == i) {

                        this.volumeMonthData.push(parseInt(item.volume));
                        this.month_iterator = i + 1;
                        break;
                    } else {
                        this.volumeMonthData.push(0);
                    }
                }
                if (this.monthData.length == index + 1) {
                    this.lineChartMonthData = [{ data: this.volumeMonthData, label: 'Monthly Volume' }];

                }
            });
        }
        if (type == 'year') {
            this.selectedMonth = [];
            this.selectedDays = [];
            this.lineChartYearLabels = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
            this.yearData.forEach((item, index) => {
                for (var i = this.year_iterator; i <= 2018; i++) {
                    if (item._id == i) {
                        this.volumeYearData.push(parseInt(item.volume));
                        this.year_iterator = i + 1;
                        break;
                    } else {
                        this.volumeYearData.push(0);
                    }
                }
                if (this.yearData.length == index + 1) {
                    this.lineChartYearData = [{ data: this.volumeYearData, label: 'Yearly Volume' }];

                }
            });
        }
    }

    fetchDayData() {
        this.loading = true;
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        this.userService.fetchTanksForChart(data)
            .then(res => {
                if (res.code == 200) {
                    this.loading = false;
                    this.dayArr = res.data;
                    console.log(' this.dayArr====', this.dayArr);
                    this.typeOfReports('days');
                    //this.fetchtanks();
                }
                else {
                    this.loading = false;
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                }
            })
    }
    fetchMonthChart() {
        this.loading = true;
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        this.userService.fetchMonthChart(data)
            .then(res => {
                if (res.code == 200) {
                    this.loading = false;
                    this.monthData = res.data;
                    this.typeOfReports('months');
                }
                else {
                    this.loading = false;
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                }
            })
    }

    fetchYearChart() {
        this.loading = true;
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        this.userService.fetchYearChart(data)
            .then(res => {
                if (res.code == 200) {
                    this.loading = false;
                    this.yearData = res.data;
                    this.typeOfReports('year');
                }
                else {
                    this.loading = false;
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message});
                }
            })
    }
    lUsers: any[] = [
        { id: 1, Name: 'Day' },
        { id: 2, Name: 'Month' },
        { id: 3, Name: 'Year' }
    ];
    onChange(event, tc) {
        console.log('event===',event);
        console.log(' in tc==', tc);
        if (tc == 1) {
           // this.selectTime=1;
            console.log(' in onChange1', tc);
            this.typeOfReports('days');
            this.monthFlag = false;
            this.yearFlag = false;
            this.dayFlag = true;

        } else if (tc == 2) {
            //this.selectTime2=2;
            console.log(' in onChange2', tc);
            this.typeOfReports('months');
            this.dayFlag = false;
            this.yearFlag = false;
            this.monthFlag = true;

        } else {
            if (tc == 3) {
                //this.selectTime3=3;
                console.log(' in onChange3', tc);
                this.typeOfReports('year');
                this.dayFlag = false;
                this.monthFlag = false;
                this.yearFlag = true;
            }
        }
    }
    pieChart() {
        this.loading = true;
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        this.userService.fetchVolume(data)
            .then(res => {
                if (res.code == 200) {
                    this.loading = false;
                    this.totalTransitVolume = res.data;
                    this.pieChartValue="bbl"
                    this.pieChartVolume();
                }
                else {
                    this.loading = false;
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                }
            })
    }
    pieChartVolume() {
        var transitVolume = new Array;
        var lebelVolume = [];
        this.totalTransitVolume.forEach((item, index) => {
            if (item.volume && item.padsData) {
                transitVolume.push(parseInt(item.volume));
                lebelVolume.push(item.padsData.pad_name);
            }

        });
        this.pieChartLabels = lebelVolume;
        this.pieChartData = transitVolume;
        this.pieChartType = 'pie';
    }

    totalVolume() {
        this.loading = true;
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        this.userService.totalTankVolume(data)
            .then(res => {
                if (res.code == 200) {
                    this.loading = false;
                    this.totalVolumes = res.data;
                    this.pieChartVolume();
                }
                else {
                    this.loading = false;
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                }
            })
    }

    tankVolume() {
        var transitVolume = [];
        var totalVolume = [];
        this.singleTankValue.forEach((item, index) => {
            if (item.transactionData) {
                transitVolume.push(parseInt(item.volume));
                totalVolume.push(parseInt(item.transactionData.volume));
            } else {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: 'Error', detail: 'tank transition is not available' });
               
            }
        });
        var children = transitVolume.concat(totalVolume);
        this.pieChartLabels = ['Total volume', 'Fill Volume'];
        this.pieChartData = [{ data: children }, totalVolume]
        this.pieChartType = 'pie';
    }

    singleTankData(tankId) {
        if (tankId == 'all') {
            this.totalVolume();
            return false;
        }
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        this.userService.fetchSingleTankVolume(tankId)
            .then(res => {
                if (res.code == 200) {
                    this.loading = false;
                    this.singleTankValue = res.data;
                    this.tankVolume();
                }
                else {
                    this.loading = false;
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                }
            })
    }

    fetchtanks() {
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        this.userService.fetchtanks(data)
            .then(res => {
                if (res.code == 200) {
                    this.tanksArray = res.data;
                }
                else {
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message });
                }
            });
    }


    fetchsingleLineDataMonth(tankId) {
        let tempArray = this.selectedMonth;
        this.selectedDays = [];
        this.selectedYear = [];
        var completeArry = [];
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        tempArray.forEach((item, index) => {
            if (item._id == "all") {
                this.typeOfReports('months');
                this.dayFlag = false;
                this.selectTime2 = 2;
                this.monthFlag = true;
                this.yearFlag = false;

            } else {
                if (item._id != 'all' && this.selectTime2 == 2) {
                    let volumeData = [];

                    this.userService.fetchSingleTankLineVolumeMonth(item._id)
                        .then(res => {
                            if (res.code == 200) {
                                this.singleTankForMonth = res.data;
                                if (this.singleTankForMonth.length > 0) {
                                    this.singleTankForMonth.forEach((item, index) => {
                                        this.month_iterator = 1;
                                        for (var i = this.month_iterator; i <= 12; i++) {
                                          
                                            if (item._id == i) {
                                                
                                                volumeData.push(parseInt(item.volume));
                                                this.month_iterator = i + 1;
                                                break;
                                            }
                                            else {
                                                // volumeData.push(0);
                                            }
                                        }
                                    });
                                }
                                else {
                                    // this.lineChartMonthData = [{ data: volumeData, label: 'Monthly Volume' }];
                                   // alert('Data not found for this tank');
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Data not found for this tank'});
                                }
                                completeArry.push({ data: volumeData })
                                var lineChartData = [];
                                var c = 1;

                                for (let i = 0; i < completeArry.length; i++) {
                                    lineChartData.push({ data: Array.from(completeArry[i].data), label: "Distribution" + c });
                                    c++;
                                }
                                this.lineChartMonthData = lineChartData;
                            }
                            else {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message});
                               
                            }
                        });
                }
            }
        });

    }
    fetchsingleLineDataYear(tankId) {

        let tempArray = this.selectedYear;
        this.selectedDays = [];
        this.selectedMonth = [];
        var completeArry = [];
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        tempArray.forEach((item, index) => {
            if (item._id == "all") {
                this.typeOfReports('year');
                this.dayFlag = false;
                this.selectTime3 = 3;
                this.monthFlag = false;
                this.yearFlag = true;
            } else {
                if (item._id != 'all' && this.selectTime3 == 3) {
                    let volumeData = [];

                    this.userService.fetchSingleTankLineVolumeYear(item._id)
                        .then(res => {
                            if (res.code == 200) {
                                this.singleTankForYear = res.data;

                                // if(this.singleTankForYear.length>0){
                                this.singleTankForYear.forEach((item, index) => {
                                    this.year_iterator = 2010;
                                    for (var i = this.year_iterator; i <= 2018; i++) {
                                        if (item._id == i) {
                                            volumeData.push(parseInt(item.volume));
                                            this.year_iterator = i + 1;
                                            break;
                                        } else {
                                            volumeData.push(0);
                                        }
                                    }
                                   
                                });

                                completeArry.push({ data: volumeData })
                                var lineChartData = [];
                                var c = 1;
                                for (let i = 0; i < completeArry.length; i++) {

                                    lineChartData.push({ data: Array.from(completeArry[i].data), label: "Distribution" + c });
                                    c++;
                                }
                                this.lineChartYearData = lineChartData;
                            }
                            else {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message});
                            }
                        });
                }
            }
        });

    }
    fetchsingleLineData(tankId) {
        let tempArray = this.selectedDays;
        this.selectedMonth = [];
        this.selectedYear = [];

        var completeArry = [];
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        tempArray.forEach((item, index) => {
            if (item._id == "all") {
                this.typeOfReports('days');
                this.dayFlag = true;
                this.selectTime = 1;
                this.monthFlag = false;
                this.yearFlag = false;

            } else {
                if (item._id != 'all' && this.selectTime == 1) {

                    let volumeData = [];
                    this.userService.fetchSingleTankLineVolume(item._id)
                        .then(res => {
                            if (res.code == 200) {
                                this.singleLineTankArray = res.data;

                                if (this.singleLineTankArray.length > 0) {

                                    this.singleLineTankArray.forEach((item, index) => {
                                        console.log('item in single line ===', item);
                                        this.days_iterator = 1;
                                        for (var i = this.days_iterator; i <= 31; i++) {
                                            if (item._id == i) {
                                                volumeData.push(parseInt(item.volume));
                                                this.days_iterator = i + 1;
                                                break;
                                            } else {
                                                volumeData.push(0);
                                            }
                                        }
                                        //completeArry.push({ data: volumeData })
                                    });
                                } else {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Data not found for this tank'});
                                }

                                completeArry.push({ data: volumeData })
                                var lineChartData = [];
                                var c = 1;
                                for (let i = 0; i < completeArry.length; i++) {

                                    lineChartData.push({ data: Array.from(completeArry[i].data), label: "Distribution" + c });
                                    c++;

                                }
                                //if (_lineChartData.length == index + 1) {
                                //_lineChartData = [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }, { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }];
                                console.log('lineChartData in day', lineChartData);
                                this.lineChartDayData = lineChartData;
                                this.dayFlag = true;
                                this.monthFlag = false;
                                this.yearFlag = false;
                                //  }

                            }
                            else {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message});
                            }


                        });

                }
            }

        });

    }

    ////// ..........bar charts..........//////


    fetchBarDayData() {
        this.loading = true;
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        this.userService.fetchTanksForChart(data)
            .then(res => {
                if (res.code == 200) {
                    this.loading = false;
                    this.dayArr = res.data;
                    //console.log(' this.dayArr====', this.dayArr);
                    this.typeOfBarReports('days');
                    //this.fetchtanks();
                }
                else {
                    this.loading = false;
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message});
                    
                }
            })
    }
    fetchBarMonthChart() {
        this.loading = true;
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        this.userService.fetchMonthChart(data)
            .then(res => {
                if (res.code == 200) {
                    this.loading = false;
                    this.monthData = res.data;
                    this.typeOfBarReports('months');
                }
                else {
                    this.loading = false;
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message});
                }
            })
    }

    fetchBarYearChart() {
        this.loading = true;
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        this.userService.fetchYearChart(data)
            .then(res => {
                if (res.code == 200) {
                    this.loading = false;
                    this.yearData = res.data;
                    // console.log('yearData===',this.yearData);
                    this.typeOfBarReports('year');
                }
                else {
                    this.loading = false;
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message});
                }
            })
    }
    typeOfBarReports(type) {
        if (type == 'days') {
            //console.log('bar days');
            this.selectedBarMonth = [];
            this.selectedBarYear = [];
            this.barChartDayLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']

            this.dayArr.forEach((item, index) => {
                for (var i = this.bar_days_iterator; i <= 31; i++) {
                    if (item._id == i) {
                        this.barChartDayvolume.push(parseInt(item.volume));
                        this.bar_days_iterator = i + 1;
                        break;
                    } else {
                        this.barChartDayvolume.push(0);
                    }
                }
                if (this.dayArr.length == index + 1) {
                    this.barChartDayData = [{ data: this.barChartDayvolume, label: 'Daily Volume' }];
                    this.dayBarFlag = true;
                    this.monthBarFlag = false;
                    this.yearBarFlag = false;
                }
            });
        }
        if (type == 'months') {
            this.selectedBarDays = [];
            this.selectedBarYear = [];
            this.barChartMonthLabels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'sept', 'Oct', 'Nov', 'Dec'];
            this.monthData.forEach((item, index) => {
                for (var i = this.bar_month_iterator; i <= 12; i++) {
                    if (item._id == i) {

                        this.barChartMonthvolume.push(parseInt(item.volume));
                        this.bar_month_iterator = i + 1;
                        break;
                    } else {
                        this.barChartMonthvolume.push(0);
                    }
                }
                if (this.monthData.length == index + 1) {
                    this.barChartMonthData = [{ data: this.barChartMonthvolume, label: 'Monthly Volume' }];

                }
            });
        }
        if (type == 'year') {
            this.selectedBarMonth = [];
            this.selectedBarDays = [];
            this.barChartYearLabels = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
            this.yearData.forEach((item, index) => {
                for (var i = this.bar_year_iterator; i <= 2018; i++) {
                    if (item._id == i) {
                        this.barChartYearvolume.push(parseInt(item.volume));
                        this.bar_year_iterator = i + 1;
                        break;
                    } else {
                        this.barChartYearvolume.push(0);
                    }
                }
                if (this.yearData.length == index + 1) {
                    this.barChartYearData = [{ data: this.barChartYearvolume, label: 'Yearly Volume' }];
                }
            });
        }
    }

    reportType: any[] = [
        { id: 1, Name: 'Day' },
        { id: 2, Name: 'Month' },
        { id: 3, Name: 'Year' }
    ];
    onReportChange(event, bar) {
        console.log('bar.value', bar);
        if (bar == 1) {
            this.typeOfBarReports('days');
            this.dayBarFlag = true;
            this.monthBarFlag = false;
            this.yearBarFlag = false;

        } else if (bar == 2) {
            this.typeOfBarReports('months');
            this.monthBarFlag = true;
            this.dayBarFlag = false;
            this.yearBarFlag = false;

        } else {
            if (bar == 3) {
                this.typeOfBarReports('year');
                this.yearBarFlag = true;
                this.dayBarFlag = false;
                this.monthBarFlag = false;

            }
        }
    }
    fetchsingleBarData(tankId) {
        //  console.log('in fetchingsinglebardata');
        let tempArray = this.selectedBarDays;
        //console.log('tempArray in fetchsingleBarData',tempArray);
        this.selectedBarMonth = [];
        this.selectedBarYear = [];

        var completeArry = [];
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        tempArray.forEach((item, index) => {
            // console.log('item in tempArray',item);
            if (item._id == "all") {
                this.typeOfBarReports('days');
                this.dayBarFlag = true;
                this.selectDay = 1;
                this.monthBarFlag = false;
                this.yearBarFlag = false;

            } else {
                // console.log('inside else--------');
                if (item._id != 'all' && this.selectDay == 1) {

                    let volumeData = [];
                    this.userService.fetchSingleTankLineVolume(item._id)
                        .then(res => {
                            if (res.code == 200) {
                                this.singleTankDay = res.data;
                                //console.log('this.singleTankDay',this.singleTankDay);

                                if (this.singleTankDay.length > 0) {

                                    this.singleTankDay.forEach((item, index) => {
                                        this.bar_days_iterator = 1;
                                        for (var i = this.bar_days_iterator; i <= 31; i++) {

                                            if (item._id == i) {
                                                volumeData.push(parseInt(item.volume));
                                                this.bar_days_iterator = i + 1;
                                                break;
                                            } else {
                                                volumeData.push(0);
                                            }
                                        }
                                        //completeArry.push({ data: volumeData })
                                    });
                                } else {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Data not found for this tank'});
                                    //alert('Data not found for this tank');
                                }

                                completeArry.push({ data: volumeData })
                                var barChartData = [];
                                var c = 1;
                                for (let i = 0; i < completeArry.length; i++) {
                                    barChartData.push({ data: Array.from(completeArry[i].data), label: "Distribution" + c });
                                    c++;
                                }
                                this.barChartDayData = barChartData;
                                this.dayBarFlag = true;
                                this.monthBarFlag = false;
                                this.yearBarFlag = false;

                            }
                            else {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message});
                            }
                        });
                }
            }

        });

    }
    fetchsingleBarDataMonth(tankId) {
        let tempArray = this.selectedBarMonth;
        this.selectedBarDays = [];
        this.selectedBarYear = [];
        var completeArry = [];
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        let finalData = [];
        tempArray.forEach((item, index) => {
            if (item._id == "all") {
                this.typeOfBarReports('months');
                this.dayBarFlag = false;
                this.selectDay2 = 2;
                this.monthBarFlag = true;
                this.yearBarFlag = false;

            } else {
                if (item._id != 'all' && this.selectDay2 == 2) {

                    this.userService.fetchSingleTankLineVolumeMonth(item._id)
                        .then(res => {
                            if (res.code == 200) {
                                this.singleTankMonth = res.data;
                                if (this.singleTankMonth.length > 0) {
                                    let volumeData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                    this.singleTankMonth.forEach((item, index) => {
                                        this.bar_month_iterator = 1;
                                        for (var i = this.bar_month_iterator; i <= 12; i++) {
                                            if (item._id == i) {
                                                volumeData[i - 1] = parseInt(item.volume);                                            
                                                this.bar_month_iterator = i + 1;
                                                //break;
                                            }
                                            else {
                                                this.bar_month_iterator = i + 1;
                                            }
                                            if (i == 12 && index == this.singleTankMonth.length-1) {
                                                finalData.push(volumeData);
                                            }
                                        }
                                    });
                                }
                                else {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Data not found for this tank'});
                                    //alert('Data not found for this tank');
                                }
                                var monthChartData = [];
                                var c = 1;
                                for (let i = 0; i < finalData.length; i++) {
                                    monthChartData.push({ data: Array.from(finalData[i]), label: "Distribution" + c });
                                    c++;
                                }
                                this.barChartMonthData = monthChartData;

                            }
                            else {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message});
                               
                            }
                        });
                }
            }
        });

    }
    fetchingleBarDataYear(tankId) {
        let tempArray = this.selectedBarYear;
        //console.log('tempArray========>>>>',tempArray);
        this.selectedBarDays = [];
        this.selectedBarMonth = [];
        //console.log('tempArray', tempArray);
        var completeArry = [];
        let role = this.userService.readSession().role;
        let companyId = this.userService.readSession()._id;
        var data = {
            role: role,
            companyId: companyId
        }
        tempArray.forEach((item, index) => {
            if (item._id == "all") {
                this.typeOfBarReports('year');
                this.dayBarFlag = false;
                this.selectDay3 = 3;
                this.monthBarFlag = false;
                this.yearBarFlag = true;
            } else {
                console.log(' inside else');
                if (item._id != 'all' && this.selectDay3 == 3) {
                    let volumeData = [];

                    this.userService.fetchSingleTankLineVolumeYear(item._id)
                        .then(res => {
                            if (res.code == 200) {
                                this.singleTankYear = res.data;
                                //console.log('this.singleTankForYear', this.singleTankForYear);

                                // if(this.singleTankForYear.length>0){
                                this.singleTankYear.forEach((item, index) => {
                                    this.bar_year_iterator = 2010;
                                    for (var i = this.bar_year_iterator; i <= 2018; i++) {
                                        if (item._id == i) {
                                            volumeData.push(parseInt(item.volume));
                                            this.bar_year_iterator = i + 1;
                                            break;
                                        } else {
                                            volumeData.push(0);
                                        }
                                    }

                                });

                                //console.log('volumeData===>>>',volumeData);
                                completeArry.push({ data: volumeData })
                                var lineChartData = [];
                                var c = 1;
                                for (let i = 0; i < completeArry.length; i++) {

                                    lineChartData.push({ data: Array.from(completeArry[i].data), label: "Distribution" + c });
                                    c++;
                                }
                                console.log('lineChartData', lineChartData);
                                this.barChartYearData = lineChartData;
                            }
                            else {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message});
                            }
                        });
                }
            }
        });

    }

///////////// .............. pie chart................../////////////////

pieDayData:any=[];
pieMonthData:any=[];
pieYearData:any=[];


fetchDayPieChart() {
    console.log(' in fetchDayPieChart');
    this.loading = true;
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
        role: role,
        companyId: companyId
    }
    this.userService.fetchDayPieChart(data)
        .then(res => {
            if (res.code == 200) {
                this.loading = false;
                this.totalTransitVolume = res.data;
                console.log(res);
                this.pieChartVolume();
                // this.pieChartValue="bbl/Date";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         /Date"
                //this.typeOfBarReports('days');
                //this.fetchtanks();
                this.pieChartValue="bbl/Date";
            }
            else {
                this.loading = false;
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message});
            }
        })
}
fetchMonthPieChart() {
    console.log(' in fetchDayPieChart');
    this.loading = true;
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
        role: role,
        companyId: companyId
    }
    this.userService.fetchMonthPieChart(data)
        .then(res => {
            if (res.code == 200) {
                this.loading = false;
                this.totalTransitVolume = res.data;
                this.pieChartVolume();
                this.pieChartValue="bbl/Month"
                //console.log(' this.pieMonthData====', this.pieMonthData);
                //this.typeOfBarReports('days');
                //this.fetchtanks();
            }
            else {
                this.loading = false;
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message});
            }
        })
}
fetchYearPieChart() {
    console.log(' in fetchDayPieChart');
    this.loading = true;
    let role = this.userService.readSession().role;
    let companyId = this.userService.readSession()._id;
    var data = {
        role: role,
        companyId: companyId
    }
    this.userService.fetchYearPieChart(data)
        .then(res => {
            if (res.code == 200) {
                this.loading = false;
                this.totalTransitVolume = res.data;
                console.log('callled and volume',this.totalTransitVolume);
                this.pieChartVolume();
                this.pieChartValue="bbl/year"
                //console.log(' this.pieYearData====', this.pieYearData);
                //this.typeOfBarReports('days');
                //this.fetchtanks();
            }
            else {
                this.loading = false;
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: 'Error', detail: res.message});
            }
        })
}

}

