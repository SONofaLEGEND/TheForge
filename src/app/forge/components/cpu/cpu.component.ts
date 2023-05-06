import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CpuInterface } from '../../interfaces/cpu.interface';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent implements OnInit {
  brand: string = null;
  cores: number = null;
  clock: string = null;
  cpu: string = null;
  coreCounts:number[] = [];
  clocks:string[] = [];
  cpus:string[] = [];
  cpuInfo:string;
  showSelected:boolean = false;
  Details:CpuInterface;
  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    
  }

  fetchCores(){
    this.http.get<number[]>(`http://127.0.0.1:5000/core_counts?brand=${this.brand}`)
    .subscribe(response => {
      this.coreCounts = response;
    });
  }
  fetchClock(){
    this.http.get<string[]>(`http://127.0.0.1:5000/core_clock?brand=${this.brand}&cores=${this.cores}`)
    .subscribe(response => {
      this.clocks = response;
    });
  }
  fetchCpu(){
    this.http.get<string[]>(`http://127.0.0.1:5000/cpu?brand=${this.brand}&cores=${this.cores}&clock=${this.clock}`)
    .subscribe(response => {
      this.cpus = response;
    });
  }

  cpuDetails(){
    this.http.get<CpuInterface>(`http://127.0.0.1:5000/processor?name=${this.cpu}`).subscribe((data: CpuInterface) => {
      this.Details = data;
      
    });
  }

  selectCpu(){
    if(this.cpu)
    {
      this.router.navigate(['/gpu']);
    }
    else
    {console.log('error');}
  }

}
