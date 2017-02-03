import React, {Component, PropTypes} from 'react';
import {Playing, ConfirmCustomAvatar} from '../.';
import {interact} from 'interactjs';

class CustomiseAvatar extends Component {

  state = {
    avatar: {
      head: ``,
      earLeft: ``,
      earRight: ``,
      nose: ``,
      mouth: ``,
      eyeLeft: ``,
      eyeRight: ``,
      body: ``,
      armLeft: ``,
      armRight: ``,
      pants: ``,
      legLeft: ``,
      legRight: ``,
      feetLeft: ``,
      feetRight: ``
    }
  }

  componentDidMount() {
    this.enableDrag();
  }

  enableDrag() {
    interact(`.draggable`)
      .draggable({
        inertia: true,
        restrict: {
          endOnly: true,
          elementRect: {top: 0, left: 0, bottom: 1, right: 1}
        },
        autoScroll: true,
        onmove: e => {
          this.dragMoveListener(e);
          console.log(`move`);
        },
        onend: e => this.dragEndListener(e)
      });

    interact(`.dropzone`)
      .dropzone({
        accept: `.draggable`,
        overlap: .25,
        ondrop: e => this.onDropHandler(e),
        ondropactivate: event => {
          event.target.classList.add(`drop-active`);
        },
        ondropdeactivate: event => event.target.classList.remove(`drop-active`),
        ondragenter: event => {
          const draggableElement = event.relatedTarget;
          const dropzoneElement = event.target;

          // toon visueel dat, als je loslaat, het element correct gedropt zal worden
          // (kan bij zowel element dat je vast hebt als waarin je gaat droppen)
          dropzoneElement.classList.add(`drop-target`);
          draggableElement.classList.add(`can-drop`);
        },
        ondragleave: event => {
          // verwijder visuele ding van hierboven
          event.target.classList.remove(`drop-target`);
          event.relatedTarget.classList.remove(`can-drop`);
        }
      });
  }

  onDropHandler(e) {
    const el = e.relatedTarget;
    const target = e.target;

    target.style.fill = el.getAttribute(`data-selectedColor`);

    const hiddenEl = document.querySelector(`.${target.classList[0]}`);
    hiddenEl.style.fill = el.getAttribute(`data-selectedColor`);

    for (let i = 0;i < hiddenEl.childNodes.length;i ++) {
      hiddenEl.childNodes[i].style.fill = el.getAttribute(`data-selectedColor`);
    }

    //console.log(target.classList[0], el.getAttribute(`data-selectedColor`));
    //console.log(`dropped -> set in state`);

    const {avatar} = this.state;
    for (const key in avatar) {
      if (key === target.classList[0]) {
        avatar[key] = el.getAttribute(`data-selectedColor`);
      }
    }

    this.setState({avatar});

  }

  dragEndListener(e) {
    this.revertBack(e);
  }

  revertBack(event) {
    const target = event.target;
    target.style.transform = `translate(0px, 0px)`;
    target.style.transition = `transform .5s`;

    target.setAttribute(`data-x`, 0);
    target.setAttribute(`data-y`, 0);
  }

  dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute(`data-x`)) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute(`data-y`)) || 0) + event.dy;

    //console.log(x, y);

    // translate the element
    target.style.transform = `translate(${x}px, ${y}px)`;

    if (target.style.transition) target.style.removeProperty(`transition`);

    // update the position attributes
    target.setAttribute(`data-x`, x);
    target.setAttribute(`data-y`, y);
  }

  avatar(type) {

    const avatar = type ? `interactable` : `nonInteractable`;

    //check op wat voor avatar het is, nu effe standaard met de leeuw

    return (
      <svg x='0px' y='0px' width='384px' height='485px' viewBox='0 0 384 485' className={`customAvatar ${avatar}`}>

        <path className='legLeft dropzone' style={{fill: `#FB7936`}} d='M159.8,477.1L159.8,477.1c-6.6,0-11.9-5.4-11.9-11.9v-58.2c0-6.6,5.4-11.9,11.9-11.9h0c6.6,0,11.9,5.4,11.9,11.9v58.2C171.7,471.7,166.3,477.1,159.8,477.1z' />
        <path className='legRight dropzone' style={{fill: `#FB7936`}} d='M212.3,477.1L212.3,477.1c-6.6,0-11.9-5.4-11.9-11.9v-58.2c0-6.6,5.4-11.9,11.9-11.9h0c6.6,0,11.9,5.4,11.9,11.9v58.2C224.3,471.7,218.9,477.1,212.3,477.1z' />

        <path className='pants dropzone' style={{fill: `#FF5BED`}} d='M133,316.3c6,25.8,27.5,44.8,53.2,44.8s47.2-19.1,53.2-44.8C187.5,348.5,133.1,316.4,133,316.3z' />

        <path className='body dropzone' style={{fill: `#FB7936`}} d='M227.2,262.2c2-5.5,3.1-11.4,3.1-17.7c0-26.4-19.8-47.8-44.1-47.8s-44.1,21.4-44.1,47.8c0,6.2,1.1,12.2,3.1,17.7c-8.6,10.5-13.9,24.3-13.9,39.5c0,5,0.6,9.9,1.7,14.6c0.2,0.1,54.5,32.2,106.4,0c1.1-4.7,1.7-9.6,1.7-14.6C241,286.5,235.8,272.7,227.2,262.2z' />

        <path className='armLeft dropzone' style={{fill: `#FB7936`}} d='M98.3,210.8L98.3,210.8c-4.6-4.6-12.2-4.6-16.9,0L16,276.3c-1.5-2.6-4.2-4.3-7.4-4.3c-4.7,0-8.5,3.8-8.5,8.5c0,3.2,1.7,5.9,4.3,7.4l-0.9,0.9c-4.6,4.6-4.6,12.2,0,16.9h0c4.6,4.6,12.2,4.6,16.9,0l78-78C103,223,103,215.4,98.3,210.8z' />
        <path className='armRight dropzone' style={{fill: `#FB7936`}} d='M380.8,288.8l-4-4c3.1-1.3,5.2-4.3,5.2-7.8c0-4.7-3.8-8.5-8.5-8.5c-3.5,0-6.6,2.2-7.8,5.2l-63-63c-4.6-4.6-12.2-4.6-16.9,0h0c-4.6,4.6-4.6,12.2,0,16.9l78,78c4.6,4.6,12.2,4.6,16.9,0l0,0C385.4,301,385.4,293.4,380.8,288.8z' />

        <path className='feetLeft dropzone' style={{fill: `#FB7936`}} d='M159.7,461.5c-13.3,0-24.1,10.8-24.2,24.1h48.3C183.8,472.3,173,461.5,159.7,461.5z' />
        <path className='feetRight dropzone' style={{fill: `#FB7936`}} d='M212.8,461.5c-13.3,0-24.1,10.8-24.2,24.1H237C236.9,472.3,226.1,461.5,212.8,461.5z' />

        <path className='bellybutton dropzone' style={{fill: `none`, stroke: `#E55E23`, strokeLinecap: `round`, strokeLinejoin: `round`}} d='M186.2,303.4c0,0-3.7,6.5,0,5.8c3.7-0.8,2.5-2.9,2.5-2.9' />

        <ellipse className='nipple dropzone' style={{fill: `#E55E23`}} cx='218.6' cy='252.1' rx='4.2' ry='2.1' />
        <ellipse className='nipple dropzone' style={{fill: `#E55E23`}} cx='157.6' cy='252.1' rx='4.2' ry='2.1' />

        <g className='head dropzone'>
          <path style={{fill: `#58071E`}} d='M254.8,64l11.8-10.2C253.9,22.3,222.9,0,186.7,0c-47.6,0-86.2,38.6-86.2,86.2c0,2.7,10.5,6.6,10.7,9.3c0.3,2.9-9.7,4.6-9.1,7.4c7.8,39.7,42.7,69.6,84.6,69.6c47.6,0,86.2-38.6,86.2-86.2c0-7.7-1-15.1-2.9-22.2H254.8z' />
          <path style={{fill: `#FB7936`}} d='M134.6,86.2c0-28.8,23.4-52.2,52.2-52.2c10.3,0,19.9,3,28,8.1c14.6,9.3,24.2,25.5,24.2,44.1c0,28.8-23.4,52.2-52.2,52.2S134.6,115,134.6,86.2z' />
        </g>

        <g className='earLeft ear dropzone'>
          <circle style={{fill: `#FB7936`}} cx='137.5' cy='56.3' r='11.1' />
          <circle style={{fill: `#E55E23`}} cx='137.5' cy='57' r='6.3' />
        </g>

        <g className='earRight ear dropzone'>
          <circle style={{fill: `#FB7936`}} cx='236' cy='56.3' r='11.1' />
          <circle style={{fill: `#E55E23`}} cx='235.6' cy='57' r='6.3' />
        </g>

        <g className='mouth dropzone'>
          <path style={{fill: `#F4A04D`}} d='M200.5,124.7h-28.2c-4.9,0-8.8-4-8.8-8.8v-12.7c0-4.9,4-8.8,8.8-8.8h28.2c4.9,0,8.8,4,8.8,8.8v12.7C209.3,120.7,205.3,124.7,200.5,124.7z' />
          <path style={{fill: `#282828`}} d='M199.6,105.5v1.4v0.5c0,0.6-0.5,1.1-1.1,1.1h-0.8c-0.6,0-1.1-0.5-1.1-1.1v-0.5v-0.7c-0.6,0.1-1.2,0.2-1.8,0.3v1.7v0.5c0,0.6-0.5,1.1-1.1,1.1H193c-0.6,0-1.1-0.5-1.1-1.1v-0.5V107c-1.5,0.2-3,0.2-4.5,0.3v1.5v0.5c0,0.6-0.5,1.1-1.1,1.1h-0.8c-0.6,0-1.1-0.5-1.1-1.1v-0.5v-1.6c-1.4-0.1-2.7-0.2-3.9-0.3v1.4v0.5c0,0.6-0.5,1.1-1.1,1.1h-0.8c-0.6,0-1.1-0.5-1.1-1.1v-0.5v-1.8c-0.5-0.1-1.1-0.2-1.6-0.3v0.5v0.5c0,0.6-0.5,1.1-1.1,1.1h-0.8c-0.6,0-1.1-0.5-1.1-1.1v-0.5v-1.2c-1-0.3-1.9-0.6-2.7-0.8c-1.3-0.4-2.5,0.8-2,2.1c0.9,2.7,3,6.5,7.4,9.1c2.1-1.7,5.9-2.8,10.4-2.8c4.6,0,8.7,1.2,10.6,3c4.8-2.9,7-7.7,7.9-10.4c0.3-0.8-0.5-1.6-1.4-1.3C202.2,104.7,200.9,105.2,199.6,105.5z' />
        </g>

        <path className='tongue dropzone' style={{fill: `#FF6C6C`}} d='M175.9,115.8c2.5,1.5,5.8,2.5,10,2.7c4.7,0.2,8.3-0.9,11-2.5c-2-1.8-6-3-10.6-3C181.9,113,178,114.1,175.9,115.8z' />

        <g className='teeth dropzone'>
          <path style={{fill: `#E2E2E2`}} d='M175.2,107.7h-0.8c-0.6,0-1.1-0.5-1.1-1.1v0.5c0,0.6,0.5,1.1,1.1,1.1h0.8c0.6,0,1.1-0.5,1.1-1.1v-0.5C176.2,107.2,175.8,107.7,175.2,107.7z' />
          <path style={{fill: `#FFFFFF`}} d='M174.4,107.7h0.8c0.6,0,1.1-0.5,1.1-1.1v-0.5c-1-0.2-2-0.5-2.9-0.7v1.2C173.3,107.2,173.8,107.7,174.4,107.7z' />
          <path style={{fill: `#E2E2E2`}} d='M179.6,109.3h-0.8c-0.6,0-1.1-0.5-1.1-1.1v0.5c0,0.6,0.5,1.1,1.1,1.1h0.8c0.6,0,1.1-0.5,1.1-1.1v-0.5C180.7,108.8,180.2,109.3,179.6,109.3z' />
          <path style={{fill: `#FFFFFF`}} d='M178.9,109.3h0.8c0.6,0,1.1-0.5,1.1-1.1v-1.4c-1-0.1-2-0.3-2.9-0.4v1.8C177.8,108.8,178.3,109.3,178.9,109.3z' />
          <path style={{fill: `#E2E2E2`}} d='M186.5,109.8h-0.8c-0.6,0-1.1-0.5-1.1-1.1v0.5c0,0.6,0.5,1.1,1.1,1.1h0.8c0.6,0,1.1-0.5,1.1-1.1v-0.5C187.5,109.3,187,109.8,186.5,109.8z' />
          <path style={{fill: `#FFFFFF`}} d='M185.7,109.8h0.8c0.6,0,1.1-0.5,1.1-1.1v-1.5c-1,0-2,0-2.9,0v1.6C184.6,109.3,185.1,109.8,185.7,109.8z' />
          <path style={{fill: `#E2E2E2`}} d='M193.8,109.3H193c-0.6,0-1.1-0.5-1.1-1.1v0.5c0,0.6,0.5,1.1,1.1,1.1h0.8c0.6,0,1.1-0.5,1.1-1.1v-0.5C194.9,108.8,194.4,109.3,193.8,109.3z' />
          <path style={{fill: `#FFFFFF`}} d='M193,109.3h0.8c0.6,0,1.1-0.5,1.1-1.1v-1.7c-1,0.2-1.9,0.3-2.9,0.4v1.3C192,108.8,192.5,109.3,193,109.3z' />
          <path style={{fill: `#E2E2E2`}} d='M198.5,108h-0.8c-0.6,0-1.1-0.5-1.1-1.1v0.5c0,0.6,0.5,1.1,1.1,1.1h0.8c0.6,0,1.1-0.5,1.1-1.1v-0.5C199.6,107.5,199.1,108,198.5,108z' />
          <path style={{fill: `#FFFFFF`}} d='M197.8,108h0.8c0.6,0,1.1-0.5,1.1-1.1v-1.4c-1,0.3-1.9,0.5-2.9,0.7v0.7C196.7,107.5,197.2,108,197.8,108z' />
        </g>

        <circle className='cheeckLeft cheeck dropzone' style={{fill: `#E55E23`}} cx='158.8' cy='95.7' r='7' />
        <circle className='cheeckRight cheeck dropzone' style={{fill: `#E55E23`}} cx='214.9' cy='95.9' r='7' />

        <path className='nose dropzone' style={{fill: `#58071E`}} d='M196.7,92.9c0,3.9-5,10-11.1,10s-11.1-6.1-11.1-10s5-7,11.1-7S196.7,89,196.7,92.9z' />

        <g className='eyeLeft eye dropzone'>
          <circle style={{fill: `#E55E23`}} cx='172.1' cy='76.4' r='11.3' />
          <circle style={{fill: `#FFFFFF`}} cx='172.1' cy='76.4' r='8.4' />
          <circle style={{fill: `#282828`}} cx='171.9' cy='76.8' r='3' />
          <circle style={{fill: `#FFFFFF`}} cx='173.6' cy='75' r='1.7' />
        </g>

        <g className='eyeRight eye dropzone'>
          <circle style={{fill: `#E55E23`}} cx='199.1' cy='76.4' r='11.3' />
          <circle style={{fill: `#FFFFFF`}} cx='199.1' cy='76.4' r='8.4' />
          <circle style={{fill: `#282828`}} cx='198.9' cy='76.8' r='3' />
          <circle style={{fill: `#FFFFFF`}} cx='200.7' cy='75' r='1.7' />
        </g>

        <path className='brawLeft braw dropzone' style={{fill: `#58071E`}} d='M179.1,65.1h-18.4c-1.4,0-2.5-1.1-2.5-2.5V59c0-1.4,1.1-2.5,2.5-2.5h18.4c1.4,0,2.5,1.1,2.5,2.5v3.5C181.6,64,180.5,65.1,179.1,65.1z' />
        <path className='brawRight braw dropzone' style={{fill: `#58071E`}} d='M210.5,64.8h-18.4c-1.4,0-2.5-1.1-2.5-2.5v-3.5c0-1.4,1.1-2.5,2.5-2.5h18.4c1.4,0,2.5,1.1,2.5,2.5v3.5C213,63.6,211.9,64.8,210.5,64.8z' />

      </svg>

    );
  }

  renderAvatar(avatar) {

    //old

    if (avatar === `lion`) {
      return (
        <g>

          <path className='legLeft dropzone' style={{fill: `#FB7936`}} d='M92.4,199.1h9c3.8,0,7,3.1,7,7v115c0,3.8-3.1,7-7,7h-9c-3.8,0-7-3.1-7-7V206C85.4,202.2,88.5,199.1,92.4,199.1z' />
          <path className='legRight dropzone' style={{fill: `#FB7936`}} d='M141.9,199.1h9c3.8,0,7,3.1,7,7v115c0,3.8-3.1,7-7,7h-9c-3.8,0-7-3.1-7-7V206C135,202.2,138.1,199.1,141.9,199.1z' />

          <path className='feetLeft dropzone' style={{fill: `#FB7936`}} d='M95.9,316.9c-12.8,0-23.2,10.3-23.2,23.1h46.4C119,327.3,108.6,316.9,95.9,316.9z' />
          <path className='feetRight dropzone' style={{fill: `#FB7936`}} d='M146.9,316.9c-12.8,0-23.2,10.3-23.2,23.1h46.5C170.1,327.2,159.7,316.9,146.9,316.9z' />

          <g className='body'>
            <path className='dropzone' style={{fill: `#FB7936`}} d='M160.7,183c2-5.4,3-11.2,3-17c0-25.4-19-45.9-42.4-45.9S78.9,140.7,78.9,166c0,5.8,1,11.6,3,17c-8.7,10.7-13.4,24.1-13.3,37.9c0,4.7,0.5,9.4,1.6,14c0.2,0.1,52.4,31,102.2,0c1.1-4.6,1.6-9.3,1.6-14C174.1,207.2,169.4,193.8,160.7,183z' />
            <ellipse className='dropzone' style={{fill: `#E55E23`}} cx='152.5' cy='173.3' rx='4.1' ry='2' />
            <ellipse className='dropzone' style={{fill: `#E55E23`}} cx='93.8' cy='173.3' rx='4.1' ry='2' />
            <path className='dropzone' style={{fill: `none`, stroke: `#E55E23`, strokeLinecap: `round`, strokeLinejoin: `round`}} d='M121.3,222.6c0,0-3.5,6.3,0,5.6s2.4-2.8,2.4-2.8' />

            <path className='pants dropzone' style={{fill: `#1CFCF4`}} d='M70.2,235c5.8,24.8,26.5,43,51.1,43s45.3-18.3,51.1-43.1C122.6,265.9,70.3,235,70.2,235z' />
          </g>

          <path className='armLeft dropzone' style={{fill: `#FB7936`}} d='M94.5,133.6L94.5,133.6c-4.5-4.5-11.7-4.5-16.2,0l-63,63c-2.2-3.9-7.2-5.3-11.1-3.1s-5.3,7.2-3.1,11.1c0.7,1.3,1.8,2.4,3.1,3.1l-0.9,0.9c-4.5,4.5-4.5,11.7,0,16.2l0,0c4.5,4.5,11.7,4.5,16.2,0l75-75C99,145.3,99,138.1,94.5,133.6z' />
          <path className='armRight dropzone' style={{fill: `#FB7936`}} d='M241.1,208.6l-3.8-3.8c4.2-1.7,6.1-6.5,4.4-10.6c-1.7-4.2-6.5-6.1-10.6-4.4c-2,0.8-3.6,2.4-4.4,4.4l-60.5-60.5c-4.5-4.5-11.7-4.5-16.2,0l0,0c-4.5,4.5-4.5,11.7,0,16.2l75,75c4.5,4.5,11.7,4.5,16.2,0l0,0C245.6,220.3,245.6,213,241.1,208.6z' />

          <g className='head dropzone'>

            <path className='headBg1' style={{fill: `#58071E`}} d='M187.3,61.6l11.4-9.8C181.5,9.4,133.2-11.1,90.8,6.1C59.5,18.7,39,49.1,39,82.9c0,2.6,10.1,6.3,10.3,8.9c0.3,2.8-9.3,4.4-8.8,7.1c8.9,44.9,52.5,74.1,97.4,65.3s74.1-52.5,65.3-97.4c-0.3-1.8-0.8-3.5-1.2-5.3H187.3z' />
            <path className='headBg2' style={{fill: `#FB7936`}} d='M71.7,82.9c0-27.7,22.4-50.2,50.1-50.2S172,55.2,172,82.9c0,27.7-22.4,50.2-50.1,50.2c0,0,0,0,0,0C94.2,133,71.7,110.6,71.7,82.9z' />

            <g className='eyeLeft'>
              <circle style={{fill: `#E55E23`}} cx='107.8' cy='73.5' r='10.8' />
              <circle style={{fill: `#FFFFFF`}} cx='107.8' cy='73.5' r='8.1' />
              <circle style={{fill: `#282828`}} cx='107.6' cy='73.8' r='2.9' />
              <circle style={{fill: `#FFFFFF`}} cx='109.2' cy='72.2' r='1.7' />
            </g>

            <g className='eyeRight'>
              <circle style={{fill: `#E55E23`}} cx='133.8' cy='73.5' r='10.9' />
              <circle style={{fill: `#FFFFFF`}} cx='133.8' cy='73.5' r='8.1' />
              <circle style={{fill: `#282828`}} cx='133.5' cy='73.8' r='2.9' />
              <circle style={{fill: `#FFFFFF`}} cx='135.2' cy='72.2' r='1.7' />
            </g>

            <path className='brawLeft' style={{fill: `#58071E`}} d='M96.9,61.2h17.4c1.4,0,2.5,1.1,2.5,2.5v3.2c0,1.4-1.1,2.5-2.5,2.5H96.9c-1.4,0-2.5-1.1-2.5-2.5v-3.2C94.5,62.3,95.6,61.2,96.9,61.2z' />
            <path className='brawRight' style={{fill: `#58071E`}} d='M127.2,54.1h17.5c1.4,0,2.5,1.1,2.5,2.5v3.2c0,1.4-1.1,2.5-2.5,2.5h-17.5c-1.4,0-2.5-1.1-2.5-2.5v-3.2C124.7,55.2,125.8,54.1,127.2,54.1z' />

            <g className='earLeft'>
              <circle style={{fill: `#FB7936`}} cx='74.5' cy='54.1' r='10.7' />
              <circle style={{fill: `#E55E23`}} cx='74.5' cy='54.8' r='6.1' />
            </g>
            <g className='earRight'>
              <circle style={{fill: `#FB7936`}} cx='169.1' cy='54.1' r='10.7' />
              <circle style={{fill: `#E55E23`}} cx='168.8' cy='54.8' r='6.1' />
            </g>

            <g className='mouth dropzone'>
              <path style={{fill: `#F4A04D`}} d='M108.3,90.7h26.4c4.9,0,8.9,4,8.9,8.8v11.5c0,4.9-4,8.8-8.9,8.8h-26.4c-4.9,0-8.8-4-8.8-8.8V99.6C99.4,94.7,103.4,90.7,108.3,90.7z' />

              <path style={{fill: `#282828`}} d='M134.2,101.4v1.9c0,0.6-0.4,1-1,1h-0.8c-0.6,0-1-0.4-1-1v-1.2c-0.6,0.1-1.2,0.2-1.8,0.3v2.1c0,0.6-0.4,1-1,1h-0.8c-0.6,0-1-0.4-1-1v-1.7c-1.5,0.2-2.9,0.2-4.3,0.3v2c0,0.6-0.4,1-1,1h-0.8c-0.6,0-1-0.4-1-1v-2c-1.3-0.1-2.6-0.2-3.8-0.3v1.8c0,0.6-0.4,1-1,1h-0.8c-0.6,0-1-0.4-1-1v-2.2l-1.5-0.3v1c0,0.6-0.4,1-1,1H110c-0.6,0-1-0.4-1-1v-1.7c-1-0.3-1.9-0.6-2.6-0.8c-0.8-0.3-1.7,0.1-2,0.9c-0.1,0.4-0.1,0.7,0,1.1c1.2,3.7,3.7,6.8,7.1,8.7c2-1.6,5.7-2.7,10-2.7c4.4,0,8.3,1.2,10.2,2.9c3.6-2.3,6.3-5.9,7.6-10c0.2-0.5-0.1-1.1-0.6-1.3c-0.2-0.1-0.5-0.1-0.7,0C136.7,100.7,135.4,101.1,134.2,101.4z' />

              <g className='teeth'>
                <path style={{fill: `#FFFFFF`}} d='M110,104.1h0.8c0.6,0,1-0.6,1-1.2v-0.6c-1-0.3-1.9-0.5-2.8-0.8v1.5C108.9,103.5,109.4,104.1,110,104.1C110,104.1,110,104.1,110,104.1z' />
                <path style={{fill: `#E2E2E2`}} d='M115,105h-0.8c-0.6,0-1-0.4-1-1v0.5c0,0.6,0.4,1,1,1h0.8c0.6,0,1-0.4,1-1V104C116,104.6,115.6,105,115,105z' />
                <path style={{fill: `#FFFFFF`}} d='M114.3,105.6h0.8c0.6,0,1-0.5,1-1.2v-1.6c-1-0.1-1.9-0.3-2.8-0.5v2.1C113.2,105,113.7,105.6,114.3,105.6C114.2,105.6,114.2,105.6,114.3,105.6z' />
                <path style={{fill: `#FFFFFF`}} d='M120.8,106.1h0.8c0.6,0,1-0.5,1-1.2v-1.8c-0.9,0-1.9,0-2.8,0v1.8C119.8,105.6,120.3,106.1,120.8,106.1z' />
                <path style={{fill: `#FFFFFF`}} d='M127.9,105.6h0.8c0.6,0,1-0.5,1-1.2v-1.9c-0.9,0.2-1.9,0.3-2.8,0.5v1.5C126.9,105,127.3,105.6,127.9,105.6C127.9,105.6,127.9,105.6,127.9,105.6z' />
                <path style={{fill: `#FFFFFF`}} d='M132.4,104.3h0.7c0.6,0,1-0.5,1-1.2v-1.6c-0.9,0.3-1.9,0.6-2.8,0.8v0.8C131.4,103.8,131.8,104.3,132.4,104.3C132.4,104.3,132.4,104.3,132.4,104.3z' />
              </g>

              <path className='tongue' style={{fill: `#FF6C6C`}} d='M111.5,111.3c2.9,1.6,6.2,2.5,9.6,2.6c3.7,0.3,7.4-0.6,10.6-2.4c-1.9-1.7-5.8-2.9-10.2-2.9C117.2,108.6,113.4,109.7,111.5,111.3z' />
            </g>

            <circle className='cheeckLeft' style={{fill: `#E55E23`}} cx='95' cy='92' r='6.8' />
            <circle className='cheeckRight' style={{fill: `#E55E23`}} cx='148.9' cy='92.2' r='6.8' />

            <path className='nose dropzone' style={{fill: `#58071E`}} d='M131.4,89.3c0,3.7-4.8,9.6-10.7,9.6s-10.7-5.9-10.7-9.6s4.8-6.8,10.7-6.8S131.4,85.6,131.4,89.3z' />

          </g>

        </g>
      );
    } else {
      return <div>Avatar not found</div>;
    }
  }

  render() {
    const {avatar} = this.state;
    const {id, player, onCustomAvatarUpdate} = this.props;
    const {languages} = player;

    return (
      <section>
        <h3>Color your avatar</h3>

        <ul className='list-unstyled colorLanguagesList'>
          {languages.map((language, i) => {
            return (
              <li key={i} className='language' data-languageName={language.language}>
                <div className='languageColor draggable' data-selectedColor={language.color} style={{backgroundColor: language.color}}></div>
                {language.language}
              </li>
            );
          })}
        </ul>

        {/* <svg x='0' y='0' width='50rem' height='50rem' viewBox='0 -150 250 500' className='customAvatar'>
          {this.renderAvatar(player.avatar)}
        </svg> */}

        <div className='avatars'>
          {this.avatar(false)}
          {this.avatar(true)}
        </div>

        <ConfirmCustomAvatar
          id={id}
          avatar={avatar}
          onCustomAvatarUpdate={onCustomAvatarUpdate}
        />

        <Playing player={player} />
      </section>
    );
  }

}

CustomiseAvatar.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  player: PropTypes.object,
  onCustomAvatarUpdate: PropTypes.func
};

export default CustomiseAvatar;
