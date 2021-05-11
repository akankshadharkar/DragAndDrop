import Component from '@glimmer/component';
import move from 'ember-animated/motions/move';
import { set, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { sortBy } from 'lodash';
import { A } from '@ember/array';
import { action } from '@ember/object';
import drag, {
  makeTarget
} from '../utils/drag';

export default class DragDrop extends Component {
  @tracked myCardsArr = A();

  constructor() {
    super(...arguments);
    this.myCardsArr = A(this.args.cards.toArray());
  }
  get sortedMascots() {
    const arr = this.myCardsArr;
    console.info(arr, '===================');
    // return sortBy(this.args.cards.toArray(), m => m.sortedPriorityValue);
    return this.myCardsArr;
  }


  myGack() {
    this.myCardsArr = A(this.args.cards.toArray());
  }

  @action
  activateKeyboardNav() {
    document.querySelector('.mascots .mascot-card').focus();
  }

  handleKey(event) {
    let activeMascot = this.cards.find(mascot => mascot.dragState);

    if (activeMascot) {
      let xStep = 0;
      let yStep = 0;
      if (xStep || yStep) {
        activeMascot.dragState.xStep += xStep;
        activeMascot.dragState.yStep += yStep;
        event.stopPropagation();
        return false;
      }
    } else {
      let elements = [...document.querySelectorAll('.mascots .mascot-card')].filter(element => element !== event.target);
      let targets = [...elements].map(element => makeTarget(element.getBoundingClientRect(), element));
      let currentTarget = makeTarget(event.target.getBoundingClientRect(), event.target);
      let nextTarget;

      if (nextTarget) {
        nextTarget.payload.focus();
        event.stopPropagation();
        return false;
      }
    }
  }

  @action
  dragStart(mascot, event) {
    const mascotCardElement = event.target.closest(".mascot-card");

    console.info(mascot.id);
    let dragState;

    function stopMouse() {
      set(mascot, 'dragState', null);
      window.removeEventListener('mouseup', stopMouse);
      window.removeEventListener('mousemove', updateMouse);
    }

    function updateMouse(event) {
      dragState.latestPointerX = event.x;
      dragState.latestPointerY = event.y;
    }

    dragState = {
      initialPointerX: event.x,
      initialPointerY: event.y,
      latestPointerX: event.x,
      latestPointerY: event.y
    };

    set(mascot, 'akuX', dragState.latestPointerX);
    set(mascot, 'akuY', dragState.latestPointerY);

    window.addEventListener('mouseup', stopMouse);
    window.addEventListener('mousemove', updateMouse);
    set(mascot, 'dragState', dragState); //Sets current state on click, can be done in mouse-move too
    set(mascot, 'title', Math.round(Math.random()*100));
    this.myGack();
  }

  * transitionAku(context) {
    const { keptSprites } = context;
    const activeSprite = keptSprites.find(sprite => sprite.owner.value.dragState);
    // const others = keptSprites.filter(sprite => sprite !== activeSprite);

    if (activeSprite) {
      console.log(activeSprite.owner.value.title);
      console.log(activeSprite.owner.value.dragState);
      // const {latestPointerX: x , latestPointerY: y} = activeSprite.owner.value.dragState;
      const {akuX: x , akuY: y} = activeSprite.owner.value;

      // activeSprite.translate(
      //   x+100,
      //   y+100
      // );

      activeSprite.finalBounds.x = x;
      debugger;
      activeSprite.finalBounds.y = y; 

      activeSprite.applyStyles({ 'border': '10px solid red' });
      move(activeSprite);
    }

    // others.forEach(move);
  }

};
