import React, {Component} from 'react';
import {interact} from 'interactjs';

class Page1 extends Component {

  componentDidMount() {
    this.enableDrag();
  }

  enableDrag() {

    interact(`.draggable`)
      .draggable({

        // enable inertial throwing
        inertia: true,

        // keep the element within the area of parent
        restrict: {
          //restriction: `parent`,
          endOnly: true,
          elementRect: {top: 0, left: 0, bottom: 1, right: 1}
        },

        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: e => this.dragMoveListener(e),

        // call this function on every dragend event
        onend: e => this.dragEndListener(e)
      });

    interact(`.dropzone`)

      .dropzone({

        // only accept elements matching this CSS selector
        accept: `.draggable`,

        // Require a % element overlap for a drop to be possible
        overlap: .25,

        ondrop: event => {

          const el = event.relatedTarget;
          const target = event.target;

          // juist gedropt -> functie triggeren die state goed zet
          console.log(`Dropped avatar ${el.getAttribute(`data-avatar`)} in position ${target.getAttribute(`id`)}`);

          const dropzones = document.querySelectorAll(`.dropzone`);
          for (let i = 0;i < dropzones.length;i ++) {

            //checken of de avatar al ergens gebruikt is, if so -> verwijderen uit de andere dropzone
            if (dropzones[i].src === el.src) {
              for (let i = 0;i < dropzones.length;i ++) {
                dropzones[i].src = `/assets/avatars/unknown.svg`;
              }
            }
          }
          target.src = el.src;
        },

        ondropactivate: event => {
          // toon visueel waar je kan droppen
          event.target.classList.add(`drop-active`);
        },

        ondropdeactivate: event => {
          // verwijder visuele ding van hierboven
          event.target.classList.remove(`drop-active`);
        },

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

  dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute(`data-x`)) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute(`data-y`)) || 0) + event.dy;

    // translate the element
    target.style.transform = `translate(${x}px, ${y}px)`;

    if (target.style.transition) target.style.removeProperty(`transition`);

    // update the posiion attributes
    target.setAttribute(`data-x`, x);
    target.setAttribute(`data-y`, y);
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

  render() {
    return (
      <div>
        <ul className='list-inline'>
          <li>
            <img src='/assets/avatars/bear.svg' data-avatar='bear' className='draggable' />
          </li>

          <li>
            <img src='/assets/avatars/pig.svg' data-avatar='pig' className='draggable' />
          </li>
        </ul>

        <ul className='list-inline'>
          <li>
            <img src='/assets/avatars/unknown.svg' data-avatar='' id='1' className='dropzone' />
          </li>
          <li>
            <img src='/assets/avatars/unknown.svg' data-avatar='' id='2' className='dropzone' />
          </li>
        </ul>
      </div>
    );
  }

}

Page1.propTypes = {};

export default Page1;
