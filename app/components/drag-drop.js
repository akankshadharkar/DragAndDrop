import Component from '@glimmer/component';
import move from 'ember-animated/motions/move';
import { set, computed } from '@ember/object';
import { run, scheduleOnce } from '@ember/runloop';
import { sortBy } from 'lodash';
import { action } from '@ember/object';
import drag, {
  makeTarget
} from '../utils/drag';

import { next } from '@ember/runloop';

export default class DragDrop extends Component {

  get sortedMascots() {
    const cardsArr = this.args.cards.toArray();
    const sortedCardsArr = sortBy(cardsArr, m => m.sortedPriorityValue);

    console.log(sortedCardsArr.map(m => m.id))
    return sortedCardsArr;
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
    let dragState;

    function stopMouse() {
      Ember.set(mascot, 'dragState', null);
      window.removeEventListener('mouseup', stopMouse);
      window.removeEventListener('mousemove', updateMouse);
    }

    function updateMouse(event) {
      dragState.latestPointerX = event.x;
      dragState.latestPointerY = event.y;
    }

    if (event instanceof KeyboardEvent) {
      // This is a keyboard-controlled "drag" instead of a real mouse
      // drag.
      dragState = {
        usingKeyboard: true,
        xStep: 0,
        yStep: 0,
      };
    } else {
      dragState = {
        usingKeyboard: false,
        initialPointerX: event.x,
        initialPointerY: event.y,
        latestPointerX: event.x,
        latestPointerY: event.y
      };
      window.addEventListener('mouseup', stopMouse);
      window.addEventListener('mousemove', updateMouse);
    }
    Ember.set(mascot, 'dragState', dragState);
  }

  * transition(context) {
    const {keptSprites} = context;
    const activeSprite = keptSprites.find(sprite => sprite.owner.value.dragState);
    const others = keptSprites.filter(sprite => sprite !== activeSprite);

    console.log('active', activeSprite)


    if (activeSprite) {
      drag(activeSprite, {
        others,
        onDivsCollided: (otherSprite) => {
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

  // random() {
  //   set(myModel, 'sortPriority', otherModel.sortedPriorityValue);
  //   set(otherModel, 'sortPriority', myPriority);
  // }

};
