import { createServer } from 'miragejs';
import { Image } from 'react-native';
import env from './env';
import recipe1Img from './assets/imgs/mock-recipe-1.png';
import recipe2Img from './assets/imgs/mock-recipe-2.png';
import recipe3Img from './assets/imgs/mock-recipe-3.png';
import recipe4Img from './assets/imgs/mock-recipe-4.png';

export default mockHTTP = () => {
  if (window.server) {
    server.shutdown();
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

      this.delete('/login', () => ("Logout successful. User 18606548-10c8-11eb-8a7f-0242ac110002"));

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
            step_instruction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum lorem nec dui pretium sagittis."
          },
          {
            step_instruction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum lorem nec dui pretium sagittis."
          },
          {
            step_instruction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum lorem nec dui pretium sagittis."
          },
          {
            step_instruction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum lorem nec dui pretium sagittis."
          },
          {
            step_instruction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum lorem nec dui pretium sagittis."
          },
          {
            step_instruction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum lorem nec dui pretium sagittis."
          },
          {
            step_instruction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum lorem nec dui pretium sagittis."
          },
          {
            step_instruction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum lorem nec dui pretium sagittis."
          },
          {
            step_instruction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum lorem nec dui pretium sagittis."
          }
        ],
        recipe_preview: {
          id: '1',
          ingredients: "{\"broccoli\": \"150.0 g\", \"chocolate ice cream sauce\": \"300.0 g\", \"elbow pasta\": \"250.0 g\", \"ham\": \"3.0 slices\", \"mushrooms\": \"3.0 \", \"olive oil\": \"2.0 tablespoons\", \"parmesan cheese\": \"1.0 oz\", \"shrimps\": \"10.0 medium\", \"water\": \"1.0 cup\", \"broccoli2\": \"150.0 g\", \"chocolate ice cream sauce2\": \"300.0 g\", \"elbow pasta2\": \"250.0 g\", \"ham2\": \"3.0 slices\", \"mushrooms2\": \"3.0 \", \"olive oil2\": \"2.0 tablespoons\", \"parmesan cheese2\": \"1.0 oz\", \"shrimps2\": \"10.0 medium\", \"water2\": \"1.0 cup\"}",
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
            ingredients: "{\"broccoli\": \"150.0 g\", \"chocolate ice cream sauce\": \"300.0 g\", \"elbow pasta\": \"250.0 g\", \"ham\": \"3.0 slices\", \"mushrooms\": \"3.0 \", \"olive oil\": \"2.0 tablespoons\", \"parmesan cheese\": \"1.0 oz\", \"shrimps\": \"10.0 medium\", \"water\": \"1.0 cup\"}",
            name: 'Taro Ice Cream',
            preview_media_url: Image.resolveAssetSource(recipe1Img).uri,
            preview_text: 'Make taro flavoured ice-cream at home!',
            time_h: 5,
            time_min: 50,
            cost: 654.52
          },
          {
            id: '2',
            ingredients: "{\"broccoli\": \"150.0 g\", \"chocolate ice cream sauce\": \"300.0 g\", \"elbow pasta\": \"250.0 g\", \"ham\": \"3.0 slices\", \"mushrooms\": \"3.0 \", \"olive oil\": \"2.0 tablespoons\", \"parmesan cheese\": \"1.0 oz\", \"shrimps\": \"10.0 medium\", \"water\": \"1.0 cup\"}",
            name: 'Expresso',
            preview_media_url: Image.resolveAssetSource(recipe2Img).uri,
            preview_text: 'Pulling the best shot of expresso...',
            time_h: 1,
            time_min: 30,
            cost: 90.50
          },
          {
            id: '3',
            ingredients: "{\"broccoli\": \"150.0 g\", \"chocolate ice cream sauce\": \"300.0 g\", \"elbow pasta\": \"250.0 g\", \"ham\": \"3.0 slices\", \"mushrooms\": \"3.0 \", \"olive oil\": \"2.0 tablespoons\", \"parmesan cheese\": \"1.0 oz\", \"shrimps\": \"10.0 medium\", \"water\": \"1.0 cup\"}",
            name: 'Over-roast Prime',
            preview_media_url: Image.resolveAssetSource(recipe3Img).uri,
            preview_text: 'Easy to make oven-roast prime...',
            time_h: 3,
            time_min: 0,
            cost: 120
          },
          {
            id: '4',
            ingredients: "{\"broccoli\": \"150.0 g\", \"chocolate ice cream sauce\": \"300.0 g\", \"elbow pasta\": \"250.0 g\", \"ham\": \"3.0 slices\", \"mushrooms\": \"3.0 \", \"olive oil\": \"2.0 tablespoons\", \"parmesan cheese\": \"1.0 oz\", \"shrimps\": \"10.0 medium\", \"water\": \"1.0 cup\"}",
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
    }
  });
};
