import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    text: string = 'Магазин Цветочный';
    lat: number = 50.014619;
    lng: number = 36.243711;
    zoom: number = 17;
    icon = {
        url: './/assets/images/glmarker.png',
        scaledSize: {
            width: 50,
            height: 50
        }
    };
    // myLatLng = {lat: this.lat, lng: this.lng};
    // marker = new google.maps.Marker({
    //     position: this.myLatLng,
    //     title: 'Магазин Цветочный',
    //     disableDefaultUI: true,
    // });
    styles = [
        {
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#f5f5f5'
                }
            ]
        },
        {
            'elementType': 'labels.icon',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#616161'
                }
            ]
        },
        {
            'elementType': 'labels.text.stroke',
            'stylers': [
                {
                    'color': '#f5f5f5'
                }
            ]
        },
        {
            'featureType': 'administrative.land_parcel',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#bdbdbd'
                }
            ]
        },
        {
            'featureType': 'poi',
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#eeeeee'
                }
            ]
        },
        {
            'featureType': 'poi',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#757575'
                }
            ]
        },
        {
            'featureType': 'poi.park',
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#e5e5e5'
                }
            ]
        },
        {
            'featureType': 'poi.park',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#9e9e9e'
                }
            ]
        },
        {
            'featureType': 'road',
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#ffffff'
                }
            ]
        },
        {
            'featureType': 'road.arterial',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#757575'
                }
            ]
        },
        {
            'featureType': 'road.highway',
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#dadada'
                }
            ]
        },
        {
            'featureType': 'road.highway',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#616161'
                }
            ]
        },
        {
            'featureType': 'road.local',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#9e9e9e'
                }
            ]
        },
        {
            'featureType': 'transit.line',
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#e5e5e5'
                }
            ]
        },
        {
            'featureType': 'transit.station',
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#eeeeee'
                }
            ]
        },
        {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#c9c9c9'
                }
            ]
        },
        {
            'featureType': 'water',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#9e9e9e'
                }
            ]
        }
    ];
  constructor() { }

  ngOnInit() {
  }

}
