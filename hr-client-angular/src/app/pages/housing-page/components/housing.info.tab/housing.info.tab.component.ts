import { Component, OnInit, Input } from '@angular/core';
import { HousingProfile } from '../../interfaces/housing.interfaces';

@Component({
  selector: 'app-housing-info-tab',
  templateUrl: './housing.info.tab.component.html',
  styleUrls: ['./housing.info.tab.component.css']
})
export class HousingInfoTabComponent implements OnInit {
  @Input() housingProfile: HousingProfile | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
