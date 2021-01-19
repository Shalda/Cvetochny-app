import {Component, OnInit} from '@angular/core';
import {MetrikaService} from '../../common/services/metrika.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    markerUrl = './/assets/images/glmarker.png';
    text = 'Магазин Цветочный';
    lat = 50.0151007;
    lng = 36.2438004;
    zoom = 17;
    icon = {
        url: './/assets/images/glmarker.png',
        scaledSize: {
            width: 50,
            height: 50
        }
    };

    styles = [
        {
            'stylers': [
                {
                    'visibility': 'on'
                },
                {
                    'saturation': -100
                },
                {
                    'gamma': 0.54
                }
            ]
        },
        {
            'featureType': 'road',
            'elementType': 'labels.icon',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'water',
            'stylers': [
                {
                    'color': '#4d4946'
                }
            ]
        },
        {
            'featureType': 'poi',
            'elementType': 'labels.icon',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'poi',
            'elementType': 'labels.text',
            'stylers': [
                {
                    'visibility': 'simplified'
                }
            ]
        },
        {
            'featureType': 'road',
            'elementType': 'geometry.fill',
            'stylers': [
                {
                    'color': '#ffffff'
                }
            ]
        },
        {
            'featureType': 'road.local',
            'elementType': 'labels.text',
            'stylers': [
                {
                    'visibility': 'simplified'
                }
            ]
        },
        {
            'featureType': 'water',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#ffffff'
                }
            ]
        },
        {
            'featureType': 'transit.line',
            'elementType': 'geometry',
            'stylers': [
                {
                    'gamma': 0.48
                }
            ]
        },
        {
            'featureType': 'transit.station',
            'elementType': 'labels.icon',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'road',
            'elementType': 'geometry.stroke',
            'stylers': [
                {
                    'gamma': 7.18
                }
            ]
        }
    ];

    constructor(private metrikaService: MetrikaService) {
    }
    public metrika(value) {
        this.metrikaService.metrika(value);
    }

    ngOnInit() {
    }

}
