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
          "sortPriority": 0,
          "imageUrl": "../images/vainglory/baron.png",
          "title" : "Akanksha"
        },
        {
          "type": "mascots",
          "sortPriority": 1,
          "imageUrl": "../images/vainglory/krul.png",
          "title" : "crushed"
        },
        {
          "type": "mascots",
          "sortPriority": 2,
          "imageUrl": "../images/vainglory/gwen.png",
          "title" : "it"
        },
        {
          "type": "mascots",
          "sortPriority": 3,
          "imageUrl": "../images/vainglory/celeste.png",
          "title" : "!!!!"
        },
        {
          "type": "mascots",
          "sortPriority": 4,
          "imageUrl": "../images/vainglory/loreli.png",
          "title" : ":)"
        },
        {
          "type": "mascots",
          "sortPriority": 5,
          "imageUrl": "../images/vainglory/celeste1.png",
          "title" : ":D"
        },
        {
          "type": "mascots",
          "sortPriority": 6,
          "imageUrl": "../images/vainglory/catherine.png",
          "title" : "crushed"
        },
        {
          "type": "mascots",
          "sortPriority": 7,
          "imageUrl": "../images/vainglory/skye.png",
          "title" : "it"
        },
        {
          "type": "mascots",
          "sortPriority": 8,
          "imageUrl": "../images/vainglory/skye1.png",
          "title" : "!!!!"
        },
        {
          "type": "mascots",
          "sortPriority": 9,
          "imageUrl": "../images/vainglory/lyra.png",
          "title" : ":)"
        },
        {
          "type": "mascots",
          "sortPriority": 10,
          "imageUrl": "../images/vainglory/taka.png",
          "title" : ":D"
        },
        {
          "type": "mascots",
          "sortPriority": 11,
          "imageUrl": "../images/vainglory/varya.png",
          "title" : "crushed"
        },
        {
          "type": "mascots",
          "sortPriority": 12,
          "imageUrl": "../images/vainglory/celeste2.png",
          "title" : "it"
        },
        {
          "type": "mascots",
          "sortPriority": 13,
          "imageUrl": "../images/vainglory/samual.png",
          "title" : "!!!!"
        },
        {
          "type": "mascots",
          "sortPriority": 14,
          "imageUrl": "../images/vainglory/kinetic.png",
          "title" : ":)"
        },
        {
          "type": "mascots",
          "sortPriority": 15,
          "imageUrl": "../images/vainglory/gwen.png",
          "title" : ":D"
        }
      ]
    };

    mascots.data.forEach((ms, i) => {
      this.store.createRecord('mascot', {
        "type": "mascots",
        "sortPriority": i,
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
