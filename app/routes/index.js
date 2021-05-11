import Route from '@ember/routing/route';
import { sortBy } from 'lodash';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  model() {
    const mascots = {
      "data": [
        {
          "type": "mascots",
          "id": 0,
          "imageUrl": "../images/vainglory/baron.png",
          "title" : "Akanksha"
        },
        {
          "type": "mascots",
          "id": 1,
          "imageUrl": "../images/vainglory/krul.png",
          "title" : "crushed"
        },
        {
          "type": "mascots",
          "id": 2,
          "imageUrl": "../images/vainglory/gwen.png",
          "title" : "it"
        },
        {
          "type": "mascots",
          "id": 3,
          "imageUrl": "../images/vainglory/celeste.png",
          "title" : "!!!!"
        },
        {
          "type": "mascots",
          "id": 4,
          "imageUrl": "../images/vainglory/loreli.png",
          "title" : ":)"
        },
        {
          "type": "mascots",
          "id": 5,
          "imageUrl": "../images/vainglory/celeste1.png",
          "title" : ":D"
        },
        {
          "type": "mascots",
          "id": 6,
          "imageUrl": "../images/vainglory/catherine.png",
          "title" : "crushed"
        },
        {
          "type": "mascots",
          "id": 7,
          "imageUrl": "../images/vainglory/skye.png",
          "title" : "it"
        },
        {
          "type": "mascots",
          "id": 8,
          "imageUrl": "../images/vainglory/skye1.png",
          "title" : "!!!!"
        },
        {
          "type": "mascots",
          "id": 9,
          "imageUrl": "../images/vainglory/lyra.png",
          "title" : ":)"
        },
        {
          "type": "mascots",
          "id": 10,
          "imageUrl": "../images/vainglory/taka.png",
          "title" : ":D"
        },
        {
          "type": "mascots",
          "id": 11,
          "imageUrl": "../images/vainglory/varya.png",
          "title" : "crushed"
        },
        {
          "type": "mascots",
          "id": 12,
          "imageUrl": "../images/vainglory/celeste2.png",
          "title" : "it"
        },
        {
          "type": "mascots",
          "id": 13,
          "imageUrl": "../images/vainglory/samual.png",
          "title" : "!!!!"
        },
        {
          "type": "mascots",
          "id": 14,
          "imageUrl": "../images/vainglory/kinetic.png",
          "title" : ":)"
        },
        {
          "type": "mascots",
          "id": 15,
          "imageUrl": "../images/vainglory/gwen.png",
          "title" : ":D"
        }
      ]
    };

    mascots.data.forEach((ms, i) => {
      this.store.createRecord('mascot', {
        "type": "mascots",
        "id": i,
        "title": ms.title,
        "imageUrl": ms.imageUrl
      });
    });


    const finalData = this.store.peekAll('mascot');
    return finalData;
    // let response = await fetch('/api/mascots.json');
    // let { data } = await response.json();

    // return data;
  }
}
