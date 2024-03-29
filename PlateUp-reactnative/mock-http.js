import { createServer } from 'miragejs';
import { Image } from 'react-native';
import { loremIpsum } from 'lorem-ipsum';
import env from './env';
import recipe1Img from './assets/imgs/mock-data/mock-recipe-1.png';
import recipe2Img from './assets/imgs/mock-data/mock-recipe-2.png';
import recipe3Img from './assets/imgs/mock-data/mock-recipe-3.png';
import recipe4Img from './assets/imgs/mock-data/mock-recipe-4.png';

import eggsImg from './assets/imgs/mock-data/brown-eggs.jpg';
import vanillaImg from './assets/imgs/mock-data/vanilla.jpg';
import almondMilkImg from './assets/imgs/mock-data/almond-milk.jpg';

import freezerImg from './assets/imgs/mock-data/freezer.jpg';
import bowlImg from './assets/imgs/mock-data/bowl.jpg';
import mixerImg from './assets/imgs/mock-data/mixer.jpg';

export default function mockHTTP() {
  if (window.server) {
    window.server.shutdown();
  }

  window.server = createServer({
    routes() {
      this.urlPrefix = env.SERVER_URL;

      this.post('/login', () => ({
        email: 'test28',
        id: '18606548-10c8-11eb-8a7f-0242ac110002',
        inventory_id: '18606b6a-10c8-11eb-8a7f-0242ac110002',
        name: 'test28',
        password: 'pbkdf2:sha256:150000$tuG3cesQ$f8ec98a66e6d6bf4910de9f5ba2482facd0ae6debf4d4f3e4e09fc09a42dfcc7',
        settings_id: '18606962-10c8-11eb-8a7f-0242ac110002',
        shopping_id: '18606ab6-10c8-11eb-8a7f-0242ac110002'
      }));

      this.delete('/login', () => ('Logout successful. User 18606548-10c8-11eb-8a7f-0242ac110002'));

      this.post('/user', () => ({
        email: 'test28',
        id: '18606548-10c8-11eb-8a7f-0242ac110002',
        inventory_id: '18606b6a-10c8-11eb-8a7f-0242ac110002',
        name: 'test28',
        password: 'pbkdf2:sha256:150000$tuG3cesQ$f8ec98a66e6d6bf4910de9f5ba2482facd0ae6debf4d4f3e4e09fc09a42dfcc7',
        settings_id: '18606962-10c8-11eb-8a7f-0242ac110002',
        shopping_id: '18606ab6-10c8-11eb-8a7f-0242ac110002'
      }));

      this.get('/recipe/1', () => ({
        recipe_instruction: [
          {
            step_instruction: loremIpsum({ count: 1, units: 'sentences' }),
            time: 7,
            ingredients: [
              { name: 'eggs', img: Image.resolveAssetSource(eggsImg).uri },
            ],
            equipment: [
              { name: 'bowl', img: Image.resolveAssetSource(bowlImg).uri }
            ]
          },
          {
            step_instruction: loremIpsum({ count: 2, units: 'sentences' }),
            time: 10,
            ingredients: [
              { name: 'vanilla', img: Image.resolveAssetSource(vanillaImg).uri },
              { name: 'almond milk', img: Image.resolveAssetSource(almondMilkImg).uri }
            ],
            equipment: [
              { name: 'bowl', img: Image.resolveAssetSource(bowlImg).uri }
            ]
          },
          {
            step_instruction: loremIpsum({ count: 3, units: 'sentences' }),
            time: 8,
            ingredients: [
              { name: 'almond milk', img: Image.resolveAssetSource(almondMilkImg).uri }
            ],
            equipment: [
              { name: 'mixer', img: Image.resolveAssetSource(mixerImg).uri }
            ]
          },
          {
            step_instruction: loremIpsum({ count: 2, units: 'sentences' }),
            time: 5,
            ingredients: [],
            equipment: [
              { name: 'freezer', img: Image.resolveAssetSource(freezerImg).uri }
            ]
          }
        ],
        recipe_preview: {
          id: '1',
          ingredients: '{"broccoli": "150.0 g", "chocolate ice cream sauce": "300.0 g", "elbow pasta": "250.0 g", "ham": "3.0 slices", "mushrooms": "3.0 ", "olive oil": "2.0 tablespoons", "parmesan cheese": "1.0 oz", "shrimps": "10.0 medium", "water": "1.0 cup", "broccoli2": "150.0 g", "chocolate ice cream sauce2": "300.0 g", "elbow pasta2": "250.0 g", "ham2": "3.0 slices", "mushrooms2": "3.0 ", "olive oil2": "2.0 tablespoons", "parmesan cheese2": "1.0 oz", "shrimps2": "10.0 medium", "water2": "1.0 cup"}',
          name: 'Taro Ice Cream',
          preview_media_url: Image.resolveAssetSource(recipe1Img).uri,
          preview_text: 'Make taro flavoured ice-cream at home! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum lorem nec dui pretium sagittis. Ut neque nisi, vestibulum pellentesque magna quis, feugiat pharetra sapien. Phasellus suscipit facilisis sollicitudin. Proin ultrices iaculis viverra. Nam tempus facilisis dui eu blandit. Vestibulum pulvinar ligula ut feugiat commodo. Aliquam blandit porta laoreet. Phasellus non consequat nunc. Pellentesque quis suscipit leo. Sed ultricies bibendum auctor. Nam convallis diam egestas felis imperdiet, nec vulputate augue pellentesque.',
          time_h: 5,
          time_min: 50,
          cost: 654.52
        }
      }));

      this.get('/recipe', () => ({
        recipes: [
          {
            id: '1',
            ingredients: '{"broccoli": "150.0 g", "chocolate ice cream sauce": "300.0 g", "elbow pasta": "250.0 g", "ham": "3.0 slices", "mushrooms": "3.0 ", "olive oil": "2.0 tablespoons", "parmesan cheese": "1.0 oz", "shrimps": "10.0 medium", "water": "1.0 cup"}',
            name: 'Taro Ice Cream',
            preview_media_url: Image.resolveAssetSource(recipe1Img).uri,
            preview_text: 'Make taro flavoured ice-cream at home!',
            time_h: 5,
            time_min: 50,
            cost: 654.52
          },
          {
            id: '2',
            ingredients: '{"broccoli": "150.0 g", "chocolate ice cream sauce": "300.0 g", "elbow pasta": "250.0 g", "ham": "3.0 slices", "mushrooms": "3.0 ", "olive oil": "2.0 tablespoons", "parmesan cheese": "1.0 oz", "shrimps": "10.0 medium", "water": "1.0 cup"}',
            name: 'Expresso',
            preview_media_url: Image.resolveAssetSource(recipe2Img).uri,
            preview_text: 'Pulling the best shot of expresso...',
            time_h: 1,
            time_min: 30,
            cost: 90.50
          },
          {
            id: '3',
            ingredients: '{"broccoli": "150.0 g", "chocolate ice cream sauce": "300.0 g", "elbow pasta": "250.0 g", "ham": "3.0 slices", "mushrooms": "3.0 ", "olive oil": "2.0 tablespoons", "parmesan cheese": "1.0 oz", "shrimps": "10.0 medium", "water": "1.0 cup"}',
            name: 'Over-roast Prime',
            preview_media_url: Image.resolveAssetSource(recipe3Img).uri,
            preview_text: 'Easy to make oven-roast prime...',
            time_h: 3,
            time_min: 0,
            cost: 120
          },
          {
            id: '4',
            ingredients: '{"broccoli": "150.0 g", "chocolate ice cream sauce": "300.0 g", "elbow pasta": "250.0 g", "ham": "3.0 slices", "mushrooms": "3.0 ", "olive oil": "2.0 tablespoons", "parmesan cheese": "1.0 oz", "shrimps": "10.0 medium", "water": "1.0 cup"}',
            name: 'Thanksgiving Turkey',
            preview_media_url: Image.resolveAssetSource(recipe4Img).uri,
            preview_text: 'Thankgiving turkey, a healthy alternative for protein.',
            time_h: 2,
            time_min: 50,
            cost: 342.99
          }
        ],
        is_random: false
      }));

      this.get('/inventory/:id', () => ({
        inventory: {
          Milk: { qty: 2, unit: 'L' },
          'Ground Beef': { qty: 500, unit: 'g' },
          Shrimp: { qty: 300, unit: 'g' },
          Milk2: { qty: 2, units: 'L' },
          'Ground Beef2': { qty: 500, unit: 'g' },
          Shrimp2: { qty: 300, unit: 'g' },
          Milk3: { qty: 2, unit: 'L' },
          'Ground Beef3': { qty: 500, unit: 'g' },
          Shrimp3: { qty: 300, unit: 'g' },
          Milk4: { qty: 2, unit: 'L' },
          'Ground Beef4': { qty: 500, unit: 'g' },
          Shrimp4: { qty: 300, unit: 'g' },
          Milk5: { qty: 2, unit: 'L' },
          'Ground Beef5': { qty: 500, unit: 'g' },
          Shrimp5: { qty: 300, unit: 'g' },
        }
      }));

      // Return the body sent as the response as this is how the real server would behave
      // assuming a successful request
      this.post('/inventory/:id', (schema, request) => (JSON.parse(request.requestBody)));

      this.get('/shopping/:id', () => ({
        shopping: {
          'Orange Juice': { qty: 2, unit: 'L' },
          'Ground Chicken': { qty: 500, unit: 'g' },
          Tuna: { qty: 300, unit: 'g' }
        }
      }));

      // Return the body sent as the response as this is how the real server would behave
      // assuming a successful request
      this.post('/shopping/:id', (schema, request) => (JSON.parse(request.requestBody)));

      this.post('/shopping/flash', () => ({
        inventory: {
          Flashed: { qty: 2, unit: 'L' }
        }
      }));
    }
  });
}
