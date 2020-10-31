import { fetchBrowseRecipes, processSettingsIntoParams, FETCHING, IDLE } from "./browse_recipes";
import browseRecipesReducer from "./browse_recipes";

// Tests written by Pranav Patel
describe('processSettingsIntoParams', () => {
    test('correctly handles cooking details', () => {
        const settings = {
            filterSettings: {
                activateFilters: true,
                maxCookTime: "150.5",
                maxCost: ""
            },
            searchQuery: ""
        }

        expect(processSettingsIntoParams(settings)).toEqual({
            maxCookTimeHour: "2",
            maxCookTimeMinutes: "30",
            search: ""
        })
    });

    test('correctly handles search query and max cost', () => {
        const settings = {
            filterSettings: {
                activateFilters: true,
                maxCookTime: "",
                maxCost: "10.50", // In dollars
            },
            searchQuery: "test"
        }

        expect(processSettingsIntoParams(settings)).toEqual({
            maxCost: "1050", // In cents
            search: "test"
        })
    });

    test('ignores filters when activateFilters is false', () => {
        const settings = {
            filterSettings: {
                activateFilters: false,
                maxCookTime: "10",
                maxCost: "10"
            },
            searchQuery: "test"
        }

        expect(processSettingsIntoParams(settings)).toEqual({
            search: "test"
        })
    });
})

describe('browseRecipesReducer', () => {
    test('correctly updates state on request fetching', () => {
        const action = {
            type: fetchBrowseRecipes.pending,
            payload: {}
        }

        const previousState = {
            status: IDLE,
            error: null,
            data: "stale",
        }

        const expectedState = {
            status: FETCHING,
            error: null,
            data: previousState.data
        }

        expect(browseRecipesReducer(previousState, action)).toEqual(expectedState)
    });

    test('correctly updates state on response error', () => {
        const action = {
            type: fetchBrowseRecipes.rejected,
            error: { message: "Error Message" }
        }

        const previousState = {
            status: FETCHING,
            error: null,
            data: "stale",
        }

        const expectedState = {
            status: IDLE,
            error: action.error.message,
            data: previousState.data
        }

        expect(browseRecipesReducer(previousState, action)).toEqual(expectedState)
    });

    test('correctly updates state on response success', () => {
        const action = {
            type: fetchBrowseRecipes.fulfilled,
            payload: { recipes: [], isRandom: false }
        }

        const previousState = {
            status: FETCHING,
            error: null,
            data: "stale"
        }

        const expectedState = {
            status: IDLE,
            error: null,
            data: action.payload
        }

        expect(browseRecipesReducer(previousState, action)).toEqual(expectedState)
    });
})