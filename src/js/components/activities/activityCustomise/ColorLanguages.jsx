import React, {Component, PropTypes} from 'react';
import {activitiesData} from '../../../globals';
import {interact} from 'interactjs';

let colors = [];

class ColorLanguages extends Component {

  componentWillMount() {
    this.setColors();
    this.checkLanguageColors();
  }

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
        overlap: .5,

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

    const {onLanguageColorUpdate} = this.props;
    const language = el.getAttribute(`data-languageName`);
    const color = target.getAttribute(`data-color`);

    // juist gedropt -> functie triggeren die state goed zet
    console.log(`Dropped language ${language} in color ${color}`);

    onLanguageColorUpdate(language, color);
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

  setColors() {
    const {activityName} = this.props;

    const activity = activitiesData.find(a => {
      if (a.name === activityName) return a;
    });

    colors = activity.colors;
  }

  checkLanguageColors() {
    const {players, onLanguagesUpdate} = this.props;
    const player = players[0];
    const {languages} = player;

    if (!languages[0].language) {
      const converted = [];

      languages.map(language => {
        const convertedLanguage = {
          language: language,
          color: ``
        };
        converted.push(convertedLanguage);
      });

      onLanguagesUpdate(converted);
    }
  }

  render() {

    const {players} = this.props;

    //only need 1 player in this game so will always be index 0
    const player = players[0];
    const {name, languages, avatar} = player;

    return (
      <section>
        <h3>Color your languages</h3>

        <ul className='list-unstyled colorLanguagesList'>
          {languages.map(((language, i) => {
            return (
              <li key={i} className='language draggable' data-languageName={language.language}>
                <div className='languageColor' style={{backgroundColor: language.color}}></div>
                {language.language}
              </li>
            );
          }))}
        </ul>

        <ul className='list-inline'>
          {colors.map((color, i) => <li key={i} className='possibleColor dropzone' style={{backgroundColor: color}} data-color={color}><span className='hide'>{color}</span></li>)}
        </ul>

        <div>
          <img src={`/assets/avatars/${avatar}.svg`} />
          <p>{name} is playing...</p>
        </div>
      </section>
    );
  }

}

ColorLanguages.propTypes = {
  players: PropTypes.array,
  onLanguagesUpdate: PropTypes.func,
  activityName: PropTypes.string,
  onLanguageColorUpdate: PropTypes.func
};

export default ColorLanguages;
