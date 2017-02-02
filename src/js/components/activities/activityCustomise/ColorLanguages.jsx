import React, {Component, PropTypes} from 'react';
import {Next} from '../.';
import {activitiesData} from '../../../globals';
import {interact} from 'interactjs';

let colors = [];

class ColorLanguages extends Component {

  state = {
    showNext: false
  }

  componentWillMount() {
    this.setColors();
    this.checkLanguageColors();
  }

  componentDidMount() {
    this.enableDrag();
    this.checkSelectedLanguageColors();
    this.checkRenderNext();
  }

  checkSelectedLanguageColors() {
    const languageColors = document.querySelectorAll(`.languageColor`);
    const dropzones = document.querySelectorAll(`.dropzone`);

    for (let i = 0;i < languageColors.length;i ++) {
      for (let j = 0;j < dropzones.length;j ++) {
        if (languageColors[i].getAttribute(`data-selectedColor`) === dropzones[j].getAttribute(`data-color`)) {
          dropzones[j].classList.add(`inactive`);
          dropzones[j].classList.remove(`dropzone`);
        }
      }
    }
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
        onmove: e => this.dragMoveListener(e),
        onend: e => this.dragEndListener(e)
      });

    interact(`.dropzone`)
      .dropzone({
        accept: `.draggable`,
        overlap: .5,
        ondrop: e => this.onDropHandler(e),
        ondropactivate: event => event.target.classList.add(`drop-active`),
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

    const {onLanguageColorUpdate} = this.props;
    const language = el.getAttribute(`data-languageName`);
    const color = target.getAttribute(`data-color`);

    const selected = el.childNodes[0].getAttribute(`data-selectedColor`);
    if (selected) {
      const colors = document.querySelectorAll(`.possibleColor`);
      for (let i = 0;i < colors.length;i ++) {
        if (selected === colors[i].getAttribute(`data-color`)) {
          colors[i].classList.add(`dropzone`);
          colors[i].classList.remove(`inactive`);
        }
      }
    }

    // juist gedropt -> functie triggeren die state goed zet
    console.log(`Dropped language ${language} in color ${color}`);

    target.classList.remove(`dropzone`);
    target.classList.add(`inactive`);

    onLanguageColorUpdate(language, color);

    this.checkRenderNext();
  }

  checkRenderNext() {
    const languageColors = document.querySelectorAll(`.languageColor`);
    let render = true;

    for (let i = 0;i < languageColors.length;i ++) {
      if (!languageColors[i].getAttribute(`data-selectedColor`)) render = false;
    }

    this.setState({showNext: render});
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

  renderNext() {
    const {showNext} = this.state;
    const {id, step, onActivityStepUpdate} = this.props;

    if (!showNext) return;

    return (
      <Next
        id={id}
        step={step}
        text='Customise avatar'
        onActivityStepUpdate={onActivityStepUpdate}
      />
    );
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
                <div className='languageColor' data-selectedColor={language.color} style={{backgroundColor: language.color}}></div>
                {language.language}
              </li>
            );
          }))}
        </ul>

        <ul className='list-inline'>
          {colors.map((color, i) => <li key={i} className='possibleColor dropzone' style={{backgroundColor: color}} data-color={color}><span className='hide'>{color}</span></li>)}
        </ul>

        {this.renderNext()}

        <div>
          <img src={`/assets/avatars/${avatar}.svg`} />
          <p>{name} is playing...</p>
        </div>
      </section>
    );
  }

}

ColorLanguages.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  players: PropTypes.array,
  onLanguagesUpdate: PropTypes.func,
  activityName: PropTypes.string,
  onLanguageColorUpdate: PropTypes.func,
  onActivityStepUpdate: PropTypes.func
};

export default ColorLanguages;
