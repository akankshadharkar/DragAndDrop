import Component from '@glimmer/component';
import move from 'ember-animated/motions/move';
import { set, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { sortBy } from 'lodash';
import { action } from '@ember/object';
import drag, {
  makeTarget
} from '../utils/drag';

export default class DragDrop extends Component {

  // constructor() {
  //   super(...arguments);
  //   console.log(this.args.cards);
  // }

  get sortedMascots() {
    return sortBy(this.args.cards.toArray(), m => m.sortedPriorityValue);
  }  

  @action
  activateKeyboardNav() {
    document.querySelector('.mascots .mascot-card').focus();
  }

  handleKey(event) {
    let activeMascot = this.cards.find(mascot => mascot.akankshaState);

    if (activeMascot) {
      let xStep = 0;
      let yStep = 0;
      if (xStep || yStep) {
        activeMascot.akankshaState.xStep += xStep;
        activeMascot.akankshaState.yStep += yStep;
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
  beginDragging(mascot, event) {
    let akankshaState;

    function stopMouse() {
      Ember.set(mascot, 'akankshaState', null);
      window.removeEventListener('mouseup', stopMouse);
      window.removeEventListener('mousemove', updateMouse);
    }

    function updateMouse(event) {
      akankshaState.latestPointerX = event.x;
      akankshaState.latestPointerY = event.y;
    }

    if (event instanceof KeyboardEvent) {
      // This is a keyboard-controlled "drag" instead of a real mouse
      // drag.
      akankshaState = {
        usingKeyboard: true,
        xStep: 0,
        yStep: 0,
      };
    } else {
      akankshaState = {
        usingKeyboard: false,
        initialPointerX: event.x,
        initialPointerY: event.y,
        latestPointerX: event.x,
        latestPointerY: event.y
      };
      window.addEventListener('mouseup', stopMouse);
      window.addEventListener('mousemove', updateMouse);
    }
    Ember.set(mascot, 'akankshaState', akankshaState);
  }

  * transition(context) {
    const {keptSprites} = context;
    const activeSprite = keptSprites.find(sprite => sprite.owner.value.akankshaState);
    const others = keptSprites.filter(sprite => sprite !== activeSprite);

    if (activeSprite) {
      
      drag(activeSprite, {
        others,
        onCollision(otherSprite) {
          debugger;
          let myModel = activeSprite.owner.value;
          let otherModel = otherSprite.owner.value;
          let myPriority = myModel.sortedPriorityValue;
          set(myModel, 'sortPriority', otherModel.sortedPriorityValue);
          set(otherModel, 'sortPriority', myPriority);
        }
      });

    }

    others.forEach(move);
  }

};
