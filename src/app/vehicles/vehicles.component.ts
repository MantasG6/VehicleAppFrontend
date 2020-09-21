import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../vehicles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../models/vehicle.model';
import { VehicleData } from '../models/vehicleData.model';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  vehicles: Vehicle[];
  vehicleData: VehicleData[];
  public show: boolean = false;
  public buttonName: any = '+ New Vehicle';

  constructor(private vehiclesService: VehiclesService, 
    private route: ActivatedRoute, 
    private router: Router,
    private webRequestService: WebRequestService){
  }

  vehicleId: number;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.vehicleId = params.vehicleId;
        this.getVehicleData();
    })
    this.webRequestService.refreshNeeded$
    .subscribe(() => {
      this.getAllVehicles();
      this.getVehicleData();
    });
    this.getAllVehicles();
    this.getVehicleData();
  }

  // gets all existing in database vehicleData
  getVehicleData(){
    this.vehiclesService.getVehicleData(this.vehicleId).subscribe((vehicleData: VehicleData[]) => {
      this.vehicleData = vehicleData;
    })
  }

  // gets all exinsting in database vehicles
  getAllVehicles(){
    this.vehiclesService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
    })
  }

  // adds new vehicle
  addVehicle(name: string){
    this.vehiclesService.addVehicle(name).subscribe((response: Vehicle)=>{
      this.router.navigate(['/', response.id]);
    })
    this.toggle();
  }

  // receives new VehicleData from system
  receiveData(){
    this.vehiclesService.receiveVehicleData(this.vehicleId).subscribe((newData: VehicleData) => {
    });
  }

  // toggles Add new Vehicle bar
  toggle(){
    this.show = !this.show;
    if(this.show)
      this.buttonName = "Cancel";
    else
      this.buttonName = "+ New Vehicle";
  }

}
