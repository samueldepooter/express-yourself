import React, {Component, PropTypes} from 'react';
import {Finish} from './';
import {interact} from 'interactjs';

class PickPlayers extends Component {

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

        ondrop: e => this.onDropHandler(e),

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

  onDropHandler(e) {
    const el = e.relatedTarget;
    const target = e.target;

    // juist gedropt -> functie triggeren die state goed zet
    console.log(`Dropped member ${el.getAttribute(`data-memberId`)} in position ${target.getAttribute(`data-dropzoneId`)}`);

    const dropzones = document.querySelectorAll(`.dropzone`);
    for (let i = 0;i < dropzones.length;i ++) {

      //checken of de avatar al ergens gebruikt is, if so -> verwijderen uit de andere dropzone
      if (dropzones[i].src === el.src) {
        for (let i = 0;i < dropzones.length;i ++) {
          dropzones[i].src = `/assets/avatars/unknown.svg`;
          dropzones[i].setAttribute(`data-memberId`, - 1);
        }
      }
    }

    target.setAttribute(`data-memberId`, el.getAttribute(`data-memberId`));
    target.src = el.src;

    //rendernext opnieuw checken, zien of alle dropzones al opgevuld zijn
    this.checkDropzones();
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

    // translate the element
    target.style.transform = `translate(${x}px, ${y}px)`;

    if (target.style.transition) target.style.removeProperty(`transition`);

    // update the posiion attributes
    target.setAttribute(`data-x`, x);
    target.setAttribute(`data-y`, y);
  }

  renderDropZones() {
    const {numberOfPlayers} = this.props;

    const dzs = [];

    for (let i = 0;i < numberOfPlayers;i ++) {
      dzs.push(i);
    }

    return dzs.map((dz, i) => {
      return (
        <li key={i}>
          <img src='/assets/avatars/unknown.svg' className='dropzone' data-memberId={- 1} data-dropzoneId={i} />
          <p>Player {i + 1}</p>
        </li>
      );
    });
  }

  checkDropzones() {

    const {id, step, onPlayersSubmit} = this.props;

    const dropzones = document.querySelectorAll(`.dropzone`);
    const playerIds = [];

    for (let i = 0;i < dropzones.length;i ++) {
      const contains = (dropzones[i].getAttribute(`data-memberId`) >= 0);
      if (contains) {
        playerIds.push(dropzones[i].getAttribute(`data-memberId`));
      }
    }

    if (playerIds.length !== dropzones.length) {
      console.log(`Er zijn nog lege dropzones`);
      return;
    }

    //alle dropzones hebben een user
    //transition naar volgende step
    const newStep = step + 1;
    console.log(`Dropzones complete -> go to step ${newStep}`);

    //weten wie er speelt, id van de activity
    onPlayersSubmit(id, step, playerIds);

  }

  render() {

    const {id, members, onFinish} = this.props;

    return (
      <section>
        <h3>Pick players</h3>

        <section>
          <h4>Family members</h4>

          <ul className='list-inline'>
            {members.map((member, i) => {
              return (
                <li key={i}>
                  <img src={`/assets/avatars/${member.avatar}.svg`} data-memberId={i} className='draggable' />
                  <p>{member.name}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h4>Dropzones</h4>

          <ul className='list-inline'>
            {this.renderDropZones()}
          </ul>
        </section>

        <Finish id={id} onFinish={onFinish} />
      </section>
    );
  }

}

PickPlayers.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  members: PropTypes.array,
  numberOfPlayers: PropTypes.number,
  onFinish: PropTypes.func,
  onPlayersSubmit: PropTypes.func
};

export default PickPlayers;
