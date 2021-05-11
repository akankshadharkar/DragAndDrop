import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';
import move from 'ember-animated/motions/move';
import drag from '../utils/drag';
export default class DragDrop extends Component {
  allMascotCards = this.args.cards.toArray();

  get mascots() {
    return this.allMascotCards;
  };
  get sortedMascots() {
    return this.mascots.sortBy("sortPriority");
  };

  @action
  beginDragging(task, event) {
    let dragState;
    const self = this;

    function stopMouse() {
      recalc(self.sortedMascots);

      task.dragState = null;
      Ember.notifyPropertyChange(task, "dragState");
      window.removeEventListener("mouseup", stopMouse);
      window.removeEventListener("mousemove", updateMouse);
    }

    function updateMouse(event) {
      dragState.latestPointerX = event.x;
      dragState.latestPointerY = event.y;
      task.dragState = dragState;
      Ember.notifyPropertyChange(task, "dragState");
    }

    dragState = new DragState({
      initialPointerX: event.x,
      initialPointerY: event.y,
      latestPointerX: event.x,
      latestPointerY: event.y,
      column: task.state,
    });

    window.addEventListener("mouseup", stopMouse);
    window.addEventListener("mousemove", updateMouse);
    task.dragState = dragState;

    Ember.notifyPropertyChange(task, "dragState");
  };

  * transition(obj) {
    let { keptSprites } = obj;
    let activeSprite = keptSprites.find((sprite) => sprite.owner.value.dragState);
    console.log(activeSprite);
    let others = keptSprites.filter((sprite) => sprite !== activeSprite);

    if (activeSprite) {
      drag(activeSprite, {
        others,
        onCollision(otherSprite) {
          // console.log('collision');

          // same column
          let myModel = activeSprite.owner.value;
          let otherModel = otherSprite.owner.value;

          let myPriority = myModel.sortPriority;
          let theirPriority = otherModel.sortPriority;

          // if we are not neighbors make it wonky
          if (myPriority > theirPriority) {
            myModel.sortPriority = theirPriority - 0.5;
          } else {
            myModel.sortPriority = theirPriority + 0.5;
          }
          Ember.notifyPropertyChange(myModel, "sortPriority");
        }
      });
    }
    others.forEach(move);
  }
}
class DragState {
  @tracked initialPointerX;
  @tracked initialPointerY;
  @tracked latestPointerX;
  @tracked latestPointerY;
  @tracked column;
  constructor(obj) {
    this.initialPointerX = obj.initialPointerX;
    this.initialPointerY = obj.initialPointerY;
    this.latestPointerX = obj.latestPointerX;
    this.latestPointerY = obj.latestPointerY;
    this.column = obj.column;
  }
}

function recalc(columns) {
  let counter = 1;
  for (const task of columns) {
    task.sortPriority = counter++;
  }
}
