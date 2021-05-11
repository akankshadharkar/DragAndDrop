import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';
export default class MascotModel extends Model {
  @attr type;
  @attr imageUrl;
}
