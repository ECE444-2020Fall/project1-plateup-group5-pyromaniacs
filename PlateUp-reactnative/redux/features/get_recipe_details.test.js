import recipeDetailsReducer, { getRecipeDetails, FETCHING, IDLE } from './get_recipe_details';

describe('recipeDetailsReducer', () => {
  test('correctly updates state on request fetching', () => {
    const action = {
      type: getRecipeDetails.pending,
      payload: {}
    };

    const previousState = {
      data: 'stale',
      status: IDLE,
      error: null,
    };

    const expectedState = {
      data: previousState.data,
      status: FETCHING,
      error: null,
    };

    expect(recipeDetailsReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response error', () => {
    const action = {
      type: getRecipeDetails.rejected,
      payload: 'Error Message'
    };

    const previousState = {
      data: 'stale',
      status: FETCHING,
      error: null,
    };

    const expectedState = {
      data: previousState.data,
      status: IDLE,
      error: action.payload,
    };

    expect(recipeDetailsReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response success', () => {
    const action = {
      type: getRecipeDetails.fulfilled,
      payload: {
        recipe_instruction: [
          {
            step_instruction: 'instruction 1'
          },
          {
            step_instruction: 'instruction 2'
          },
        ],
        recipe_preview: {
          id: '1',
          ingredients: '{"ingr1": "150.0 g", "ingr2": "300.0 g", "ingr3": "250.0 g"}',
          name: 'Name',
          preview_media_url: 'url',
          preview_text: 'preview text',
          time_h: 1,
          time_min: 20,
          cost: 500.00
        }
      }
    };

    const previousState = {
      status: FETCHING,
      error: null,
      data: 'stale'
    };

    // Since the reducer modifies the action's payload, need to make a deep copy of it here
    // and parse the ingredients before comparing.
    const expectedData = JSON.parse(JSON.stringify(action.payload));
    expectedData.recipe_preview.ingredients = JSON.parse(expectedData.recipe_preview.ingredients);

    const expectedState = {
      status: IDLE,
      error: null,
      data: expectedData
    };

    expect(recipeDetailsReducer(previousState, action)).toEqual(expectedState);
  });
});
