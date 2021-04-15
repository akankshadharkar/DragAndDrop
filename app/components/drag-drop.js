import Component from '@glimmer/component';
import move from 'ember-animated/motions/move';
import { set, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { sortBy } from 'lodash';
import { action } from '@ember/object';
import drag, {
  makeTarget
} from '../utils/drag';


let ankConst = null;
export default class DragDrop extends Component {
  queueMe = {}

  constructor() {
    super(...arguments);
    console.log(this.args.cards);
    
    // this.queueMe = {
    //   obj1: null,
    //   obj2: null,
    //   swapMe: function() {
    //     setTimeout(function() {
    //       console.log(obj1);
    //       console.log(obj2);
    //     }, 0);
    //     // console.info("MYMODEL, OTHERMODEL", myModel, otherModel)
    //     // let myPriority = myModel.sortedPriorityValue;
    //     // set(myModel, 'sortPriority', otherModel.sortedPriorityValue);
    //     // set(otherModel, 'sortPriority', myPriority);
    //   }
    // }
  }

  get sortedMascots() {
    return sortBy(this.args.cards.toArray(), m => m.sortedPriorityValue);
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
    dragState.lastMovedTime = Date.now();
    ankConst = Date.now();
    set(mascot, 'dragState', dragState);
  }





  * transition(context) {
    const { keptSprites } = context;
    const activeSprite = keptSprites.find(sprite => sprite.owner.value.dragState);
    const others = keptSprites.filter(sprite => sprite !== activeSprite);

    if (others.length < keptSprites.length - 1) {
      console.log(others)
    }

    if (activeSprite) {

      drag(activeSprite, {
        others,
        onCollision(otherSprite) {
          let myModel = activeSprite.owner.value;
          let otherModel = otherSprite.owner.value;

          const timeNow = Date.now();
          if( timeNow - ankConst > 53){
            // console.info("MYMODEL, OTHERMODEL", myModel, otherModel)
            let myPriority = myModel.sortedPriorityValue;
            set(myModel, 'sortPriority', otherModel.sortedPriorityValue);
            set(otherModel, 'sortPriority', myPriority);
            ankConst = timeNow;
          }

        }
      });

    }

    others.forEach(move);
  }

};
