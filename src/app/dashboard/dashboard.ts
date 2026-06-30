import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck } from 'rxjs/operators';

import { VehicleService, Vehicle, VehicleData } from '../services/vehicle.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit, OnDestroy {
  menuAberto = false;
  dashboardVazio = true;

  vehicles: Vehicle[] = [];
  vehiclesOriginal: Vehicle[] = [];

  selectedVehicle: Vehicle | null = null;

  selectedVehicleName = '';

  vinSelecionado = '';

  vehicleData: VehicleData | null = null;

  private vinSearchSubject = new Subject<string>();

  private searchSubscription!: Subscription;

  constructor(
    private vehicleService: VehicleService,

    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadVehicles();

    this.setupVinSearch();
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  irParaHome() {
    this.router.navigate(['/home']);

    this.menuAberto = false;
  }

  irParaDashboard() {
    this.router.navigate(['/dashboard']);

    this.menuAberto = false;
  }

  logout() {
    localStorage.clear();

    this.router.navigate(['/login']);
  }

  loadVehicles() {
    this.vehicleService

      .getVehicles()

      .pipe(
        pluck('vehicles'),

        map((vehicles) => vehicles),
      )

      .subscribe((data) => {
        this.vehicles = data;

        this.vehiclesOriginal = data;

        if (data.length > 0) {
          this.setVehicleByName(data[0].vehicle);
        }
      });
  }

  onVehicleChange() {
    if (!this.selectedVehicleName) return;

    this.setVehicleByName(this.selectedVehicleName);
  }

  setVehicleByName(vehicleName: string) {
    const found = this.vehicles.find((v) => v.vehicle === vehicleName);

    if (!found) return;

    this.selectedVehicle = found;

    this.selectedVehicleName = found.vehicle;

    this.vinSelecionado = this.getVin(found.vehicle);

    this.dashboardVazio = false;

    this.loadVehicleData();
  }

  onVinSearch() {
    this.vinSearchSubject.next(this.vinSelecionado);
  }

  setupVinSearch() {
    this.searchSubscription = this.vinSearchSubject

      .pipe(
        debounceTime(100),

        distinctUntilChanged(),

        filter((vin) => !!vin && vin.trim().length > 0),
      )

      .subscribe((vin: string) => {
        this.fetchVehicleDataByVin(vin);
      });
  }

  fetchVehicleDataByVin(vin: string) {
    this.vehicleService

      .getVehicleData(vin)

      .subscribe({
        next: (data) => {
          this.vehicleData = data;

          this.dashboardVazio = false;

          const found = this.vehicles.find((v) => this.getVin(v.vehicle) === vin);

          if (found) {
            this.selectedVehicle = found;

            this.selectedVehicleName = found.vehicle;
          }
        },

        error: () => {
          this.vehicleData = null;
        },
      });
  }

  loadVehicleData() {
    if (!this.vinSelecionado) return;

    this.vehicleService

      .getVehicleData(this.vinSelecionado)

      .subscribe((data) => {
        this.vehicleData = data;
      });
  }

  getVin(vehicle: string): string {
    const vins: Record<string, string> = {
      Ranger: '2FRHDUYS2Y63NHD22454',

      Mustang: '2RFAASDY54E4HDU34874',

      Territory: '2FRHDUYS2Y63NHD22455',

      'Bronco Sport': '2RFAASDY54E4HDU34875',
    };

    return vins[vehicle];
  }
}