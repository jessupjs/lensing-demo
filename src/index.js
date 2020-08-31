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

// Add open event
viewer.addOnceHandler('open', proceed);

function proceed(e) {

    // Loading data colors
    const data_colors = [];
    csv.forEach((c, i) => {
        data_colors.push({
            index: i,
            name: c[0] + '_' + c[1] + '_' + c[2],
            r: +c[0],
            g: +c[1],
            b: +c[2]
        })
    });
    const data_config = {
        type: 'color'
    }

    // Config dataLoad1
    const dataLoad1 = {
        data: data_colors,
        config: {
            type: 'color-index',
            filter: 'fil_data_rgb'
        }
    }

    // Compile dataLoad
    const dataLoad = [dataLoad1];

    // Loading data pos (emulation of csv import)
    /* @fixme
      data = [ [entry], ...] - CORRECT
      data - [ [[x, y], ...], ...] - INCORRECT
     */
    /*
    const data_pos = [];
    const dims = viewer.source.dimensions;
    console.log(dims)
    for (let r = 0; r < dims.y; r++) {
        const current = [];
        data_pos.push(current)
        for (let c = 0; c < dims.x; c++) {
            // [id, x, y]
            current.push([`${c}_${r}`, c, r]);
        }
    }
    console.log(data_pos);
    */

    // Instantiate Lensing
    viewer.lensing = l.construct(osd, viewer, viewer_config, dataLoad);

}