import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  
  constructor(private webReqService: WebRequestService) { }

  addVehicle(name: string){
    return this.webReqService.post('Vehicles', { name });
  }

  getVehicles(){
    return this.webReqService.get('Vehicles');
  }

  receiveVehicleData(vehicleId){
    return this.webReqService.getData(`VehicleData/new/${vehicleId}`);
  }

  getVehicleData(vehicleId){
    return this.webReqService.get(`VehicleData/Vehicle/${vehicleId}`);
  }
}
