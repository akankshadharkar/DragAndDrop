import Route from '@ember/routing/route';
import { sortBy } from 'lodash';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  model() {

    // const mascots = {
    //   "data": [
    //     {
    //       "type": "mascots",
    //       "id": 0,
    //       "imageUrl": "../images/mascots/construction-dad5711c.png",
    //       "title" : "Akanksha"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 1,
    //       "imageUrl": "../images/mascots/fishy-0a6d12d8.png",
    //       "title" : "crushed"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 2,
    //       "imageUrl": "../images/mascots/skylight-both-909158f5.png",
    //       "title" : "it"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 3,
    //       "imageUrl": "../images/mascots/sandiego-zoey-b7637d09.png",
    //       "title" : "!!!!"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 4,
    //       "imageUrl": "../images/mascots/st-petersburg-tomster-380922da.png",
    //       "title" : ":)"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 5,
    //       "imageUrl": "../images/mascots/amsterdam-80294881.png",
    //       "title" : ":D"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 6,
    //       "imageUrl": "../images/mascots/atlanta-zoey-38822a67.png",
    //       "title" : "crushed"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 7,
    //       "imageUrl": "../images/mascots/austin-zoey-04b8289e.png",
    //       "title" : "it"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 8,
    //       "imageUrl": "../images/mascots/cancer-tomster-7a38b627.png",
    //       "title" : "!!!!"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 9,
    //       "imageUrl": "../images/mascots/dallas-07d863bf.png",
    //       "title" : ":)"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 10,
    //       "imageUrl": "../images/mascots/portland-afe81a16.png",
    //       "title" : ":D"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 11,
    //       "imageUrl": "../images/mascots/jacksonville-d24d5293.png",
    //       "title" : "crushed"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 12,
    //       "imageUrl": "../images/mascots/munich-zoey-13fcfb64.png",
    //       "title" : "it"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 13,
    //       "imageUrl": "../images/mascots/simplabs-both-2a523505.png",
    //       "title" : "!!!!"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 14,
    //       "imageUrl": "../images/mascots/nyc-a338e1f8.png",
    //       "title" : ":)"
    //     },
    //     {
    //       "type": "mascots",
    //       "id": 15,
    //       "imageUrl": "../images/mascots/seattle-b54549d8.png",
    //       "title" : ":D"
    //     }
    //   ]
    // };

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
