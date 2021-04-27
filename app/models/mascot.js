import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';
export default class MascotModel extends Model {
  @attr type;
  @attr imageUrl;

  @computed('sortPriority', 'id')
  get sortedPriorityValue() {
    if (this.sortPriority != undefined || this.sortPriority != null ) {
      return this.sortPriority;
    } else {
      return parseInt(this.id, 10);
    }
  }
}
