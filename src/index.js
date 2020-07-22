import './index.css';
import * as osd from 'openseadragon';
import * as l from 'lensing';
import csv from './PIA23533_index32.csv';
import logo from './lensing_icon-black.svg';

// Add image <img src="./assets/lensing_icon-black.svg" alt="Lensing">
const img_logo = document.createElement('img')
img_logo.setAttribute('src', logo);
img_logo.setAttribute('alt', 'Lensing')
const header = document.getElementById('header')
header.append(img_logo);

// Image
const target = 'viewer'
const image = 'PIA23533_index32.dzi'

// Config
const viewer_config = {
    id: target,
    prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
    tileSources: `./assets/${image}`,
    homeFillsViewer: true,
    visibilityRatio: 1.0
}

// Instantiate viewer
const viewer = osd(viewer_config);

// Loading data colors
const data = [];
csv.forEach(c => {
    data.push({
        name: c[0] + '_' + c[1] + '_' + c[2],
        r: c[0],
        g: c[1],
        b: c[2]
    })
});
const data_config = {
    type: 'color'
}

// Instantiate Lensing
viewer.lensing = l.construct(osd, viewer, viewer_config, data, data_config);