import React, {Component, PropTypes} from 'react';
import {Finish} from './';
import {interact} from 'interactjs';

class PickPlayers extends Component {

  state = {
    showAvatars: false
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

  checkCustomAvatars() {
    const {id} = this.props;
    if (id !== 1) return;

    const {showAvatars} = this.state;

    if (!showAvatars) return;

    const {members} = this.props;
    const membersWithAvatar = [];

    members.map(member => {
      if (member.customAvatar) membersWithAvatar.push(member);
    });

    return (
      <section className='customAvatarsOverview'>

        <div>
          <h4>Custom avatars</h4>

          <ul className='list-inline'>
            {membersWithAvatar.map((member, i) => {
              const {languages} = member;
              return (
                <li key={i}>
                  {this.renderCustomAvatar(member.avatar, member.customAvatar)}
                  <p>{member.name}</p>
                  <ul className='list-unstyled colorLanguagesList'>
                    {languages.map((language, i) => {
                      return (
                        <li key={i} className='language'>
                          <div className='languageColor' style={{backgroundColor: language.color}}></div>
                          {language.language}
                        </li>
                      );
                    })}
                  </ul>

                </li>
              );
            })}
          </ul>

          <button className='btn btn-danger' onClick={e => this.toggleShowAvatars(e, false)}>Close</button>
        </div>

      </section>
    );
  }

  renderCustomAvatar(animal, avatar) {
    console.log(`toon een ${animal}`);

    const orange = `#FB7936`;

    const legLeft = avatar.legLeft || orange;
    const legRight = avatar.legRight || orange;
    const armLeft = avatar.armLeft || orange;
    const armRight = avatar.armRight || orange;
    const feetLeft = avatar.feetLeft || orange;
    const feetRight = avatar.feetRight || orange;
    const pants = avatar.pants || `#FF5BED`;
    const body = avatar.body || orange;
    const headBack = avatar.head || `#58071E`;
    const headFront = avatar.head || orange;
    const earLeftOuter = avatar.earLeft || orange;
    const earLeftInner = avatar.earLeft || `#E55E23`;
    const earRightOuter = avatar.earRight || orange;
    const earRightInner = avatar.earRight || `#E55E23`;
    const mouthOuter = avatar.mouth || `#F4A04D`;
    const mouthInner = avatar.mouth || `#282828`;
    const nose = avatar.nose || `#58071E`;
    const eyeLeft1 = avatar.eyeLeft || `#E55E23`;
    const eyeLeft2 = avatar.eyeLeft || `#FFFFFF`;
    const eyeLeft3 = avatar.eyeLeft || `#282828`;
    const eyeLeft4 = avatar.eyeLeft || `#FFFFFF`;
    const eyeRight1 = avatar.eyeRight || `#E55E23`;
    const eyeRight2 = avatar.eyeRight || `#FFFFFF`;
    const eyeRight3 = avatar.eyeRight || `#282828`;
    const eyeRight4 = avatar.eyeRight || `#FFFFFF`;

    //check if lion, bear, ... to show correct avatar animal
    /*

    if(animal === 'lion') ...
    else if(animal === 'bear') ...

    */

    return (

      <svg x='0px' y='0px' width='200px' height='300px' viewBox='0 0 384 485' className='customOverviewAvatar'>

        <path className='legLeft' style={{fill: legLeft}} d='M159.8,477.1L159.8,477.1c-6.6,0-11.9-5.4-11.9-11.9v-58.2c0-6.6,5.4-11.9,11.9-11.9h0c6.6,0,11.9,5.4,11.9,11.9v58.2C171.7,471.7,166.3,477.1,159.8,477.1z' />
        <path className='legRight' style={{fill: legRight}} d='M212.3,477.1L212.3,477.1c-6.6,0-11.9-5.4-11.9-11.9v-58.2c0-6.6,5.4-11.9,11.9-11.9h0c6.6,0,11.9,5.4,11.9,11.9v58.2C224.3,471.7,218.9,477.1,212.3,477.1z' />

        <path className='pants' style={{fill: pants}} d='M133,316.3c6,25.8,27.5,44.8,53.2,44.8s47.2-19.1,53.2-44.8C187.5,348.5,133.1,316.4,133,316.3z' />

        <path className='body' style={{fill: body}} d='M227.2,262.2c2-5.5,3.1-11.4,3.1-17.7c0-26.4-19.8-47.8-44.1-47.8s-44.1,21.4-44.1,47.8c0,6.2,1.1,12.2,3.1,17.7c-8.6,10.5-13.9,24.3-13.9,39.5c0,5,0.6,9.9,1.7,14.6c0.2,0.1,54.5,32.2,106.4,0c1.1-4.7,1.7-9.6,1.7-14.6C241,286.5,235.8,272.7,227.2,262.2z' />

        <path className='armLeft' style={{fill: armLeft}} d='M98.3,210.8L98.3,210.8c-4.6-4.6-12.2-4.6-16.9,0L16,276.3c-1.5-2.6-4.2-4.3-7.4-4.3c-4.7,0-8.5,3.8-8.5,8.5c0,3.2,1.7,5.9,4.3,7.4l-0.9,0.9c-4.6,4.6-4.6,12.2,0,16.9h0c4.6,4.6,12.2,4.6,16.9,0l78-78C103,223,103,215.4,98.3,210.8z' />
        <path className='armRight' style={{fill: armRight}} d='M380.8,288.8l-4-4c3.1-1.3,5.2-4.3,5.2-7.8c0-4.7-3.8-8.5-8.5-8.5c-3.5,0-6.6,2.2-7.8,5.2l-63-63c-4.6-4.6-12.2-4.6-16.9,0h0c-4.6,4.6-4.6,12.2,0,16.9l78,78c4.6,4.6,12.2,4.6,16.9,0l0,0C385.4,301,385.4,293.4,380.8,288.8z' />

        <path className='feetLeft' style={{fill: feetLeft}} d='M159.7,461.5c-13.3,0-24.1,10.8-24.2,24.1h48.3C183.8,472.3,173,461.5,159.7,461.5z' />
        <path className='feetRight' style={{fill: feetRight}} d='M212.8,461.5c-13.3,0-24.1,10.8-24.2,24.1H237C236.9,472.3,226.1,461.5,212.8,461.5z' />

        <path className='bellybutton' style={{fill: `none`, stroke: `#E55E23`, strokeLinecap: `round`, strokeLinejoin: `round`}} d='M186.2,303.4c0,0-3.7,6.5,0,5.8c3.7-0.8,2.5-2.9,2.5-2.9' />

        <ellipse className='nipple' style={{fill: `#E55E23`}} cx='218.6' cy='252.1' rx='4.2' ry='2.1' />
        <ellipse className='nipple' style={{fill: `#E55E23`}} cx='157.6' cy='252.1' rx='4.2' ry='2.1' />

        <path className='head' style={{fill: headBack}} d='M254.8,64l11.8-10.2C253.9,22.3,222.9,0,186.7,0c-47.6,0-86.2,38.6-86.2,86.2c0,2.7,10.5,6.6,10.7,9.3c0.3,2.9-9.7,4.6-9.1,7.4c7.8,39.7,42.7,69.6,84.6,69.6c47.6,0,86.2-38.6,86.2-86.2c0-7.7-1-15.1-2.9-22.2H254.8z' />
        <path className='head' style={{fill: headFront}} d='M134.6,86.2c0-28.8,23.4-52.2,52.2-52.2c10.3,0,19.9,3,28,8.1c14.6,9.3,24.2,25.5,24.2,44.1c0,28.8-23.4,52.2-52.2,52.2S134.6,115,134.6,86.2z' />

        <circle className='ear' style={{fill: earLeftOuter}} cx='137.5' cy='56.3' r='11.1' />
        <circle className='ear' style={{fill: earLeftInner}} cx='137.5' cy='57' r='6.3' />

        <circle className='ear' style={{fill: earRightOuter}} cx='236' cy='56.3' r='11.1' />
        <circle className='ear' style={{fill: earRightInner}} cx='235.6' cy='57' r='6.3' />

        <path className='mouth' style={{fill: mouthOuter}} d='M200.5,124.7h-28.2c-4.9,0-8.8-4-8.8-8.8v-12.7c0-4.9,4-8.8,8.8-8.8h28.2c4.9,0,8.8,4,8.8,8.8v12.7C209.3,120.7,205.3,124.7,200.5,124.7z' />
        <path className='mouth' style={{fill: mouthInner}} d='M199.6,105.5v1.4v0.5c0,0.6-0.5,1.1-1.1,1.1h-0.8c-0.6,0-1.1-0.5-1.1-1.1v-0.5v-0.7c-0.6,0.1-1.2,0.2-1.8,0.3v1.7v0.5c0,0.6-0.5,1.1-1.1,1.1H193c-0.6,0-1.1-0.5-1.1-1.1v-0.5V107c-1.5,0.2-3,0.2-4.5,0.3v1.5v0.5c0,0.6-0.5,1.1-1.1,1.1h-0.8c-0.6,0-1.1-0.5-1.1-1.1v-0.5v-1.6c-1.4-0.1-2.7-0.2-3.9-0.3v1.4v0.5c0,0.6-0.5,1.1-1.1,1.1h-0.8c-0.6,0-1.1-0.5-1.1-1.1v-0.5v-1.8c-0.5-0.1-1.1-0.2-1.6-0.3v0.5v0.5c0,0.6-0.5,1.1-1.1,1.1h-0.8c-0.6,0-1.1-0.5-1.1-1.1v-0.5v-1.2c-1-0.3-1.9-0.6-2.7-0.8c-1.3-0.4-2.5,0.8-2,2.1c0.9,2.7,3,6.5,7.4,9.1c2.1-1.7,5.9-2.8,10.4-2.8c4.6,0,8.7,1.2,10.6,3c4.8-2.9,7-7.7,7.9-10.4c0.3-0.8-0.5-1.6-1.4-1.3C202.2,104.7,200.9,105.2,199.6,105.5z' />

        <path className='tongue' style={{fill: `#FF6C6C`}} d='M175.9,115.8c2.5,1.5,5.8,2.5,10,2.7c4.7,0.2,8.3-0.9,11-2.5c-2-1.8-6-3-10.6-3C181.9,113,178,114.1,175.9,115.8z' />

        <g className='teeth'>
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

        <circle className='cheeckLeft cheeck' style={{fill: `#E55E23`}} cx='158.8' cy='95.7' r='7' />
        <circle className='cheeckRight cheeck' style={{fill: `#E55E23`}} cx='214.9' cy='95.9' r='7' />

        <path className='nose' style={{fill: nose}} d='M196.7,92.9c0,3.9-5,10-11.1,10s-11.1-6.1-11.1-10s5-7,11.1-7S196.7,89,196.7,92.9z' />

        <circle className='eye' style={{fill: eyeLeft1}} cx='172.1' cy='76.4' r='11.3' />
        <circle className='eye' style={{fill: eyeLeft2}} cx='172.1' cy='76.4' r='8.4' />
        <circle className='eye' style={{fill: eyeLeft3}} cx='171.9' cy='76.8' r='3' />
        <circle className='eye' style={{fill: eyeLeft4}} cx='173.6' cy='75' r='1.7' />

        <circle className='eye' style={{fill: eyeRight1}} cx='199.1' cy='76.4' r='11.3' />
        <circle className='eye' style={{fill: eyeRight2}} cx='199.1' cy='76.4' r='8.4' />
        <circle className='eye' style={{fill: eyeRight3}} cx='198.9' cy='76.8' r='3' />
        <circle className='eye' style={{fill: eyeRight4}} cx='200.7' cy='75' r='1.7' />

        <path className='brawLeft braw' style={{fill: `#58071E`}} d='M179.1,65.1h-18.4c-1.4,0-2.5-1.1-2.5-2.5V59c0-1.4,1.1-2.5,2.5-2.5h18.4c1.4,0,2.5,1.1,2.5,2.5v3.5C181.6,64,180.5,65.1,179.1,65.1z' />
        <path className='brawRight braw' style={{fill: `#58071E`}} d='M210.5,64.8h-18.4c-1.4,0-2.5-1.1-2.5-2.5v-3.5c0-1.4,1.1-2.5,2.5-2.5h18.4c1.4,0,2.5,1.1,2.5,2.5v3.5C213,63.6,211.9,64.8,210.5,64.8z' />

      </svg>
    );
  }

  showAvatarsBtn() {
    const {id} = this.props;
    if (id !== 1) return;

    //check if there are any custom avatars yet
    const {members} = this.props;
    const avatars = [];

    members.map(member => {
      if (!member.customAvatar) avatars.push(false);
      else avatars.push(true);
    });

    //if there is a custom avatar -> show button
    if (avatars.includes(true)) {
      return (
        <button className='btn btn-default' onClick={e => this.toggleShowAvatars(e, true)}>Show avatars</button>
      );
    }

    return;
  }

  toggleShowAvatars(e, state) {
    e.preventDefault();
    this.setState({
      showAvatars: state
    });
  }

  checkDone(activityId, member) {
    const img = `https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-128.png`;
    if (activityId === 1) {
      if (!member.customAvatar) return;
      return <img src={img} className='checked' />;
    }

    return;
  }

  render() {

    const {id, members, onFinish} = this.props;

    return (
      <section>

        {this.checkCustomAvatars()}

        <h3>Pick players</h3>

        <section>
          <h4>Family members</h4>

          <ul className='list-inline'>
            {members.map((member, i) => {
              return (
                <li key={i}>
                  <img src={`/assets/avatars/${member.avatar}.svg`} data-memberId={i} className='draggable' />
                  <p>{this.checkDone(id, member)} {member.name}</p>
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

        {this.showAvatarsBtn()}

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
