import { fetchBrowseRecipes, processSettingsIntoParams } from "./browse_recipes";
import browseRecipesReducer from "./browse_recipes";

// Tests written by Pranav Patel
describe('processSettingsIntoParams', () => {
    test('correctly handles cooking details', () => {
        const settings = {
            filterSettings: {
                activateFilters: true,
                maxCookTime: "120",
                maxCost: ""
            },
            searchQuery: ""
        }

        expect(processSettingsIntoParams(settings)).toEqual({
            maxCookTimeHour: "2",
            maxCookTimeMinutes: "0",
            search: ""
        })
    });

    test('correctly handles search query and max cost', () => {
        const settings = {
            filterSettings: {
                activateFilters: true,
                maxCookTime: "",
                maxCost: "10", // In dollars
            },
            searchQuery: "test"
        }

        expect(processSettingsIntoParams(settings)).toEqual({
            maxCost: "1000", // In cents
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
            status: "idle",
            error: null,
            data: "stale",
        }

        const expectedState = {
            status: "fetching",
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
            status: "fetching",
            error: null,
            data: "stale",
        }

        const expectedState = {
            status: "idle",
            error: "Error Message",
            data: "stale"
        }

        expect(browseRecipesReducer(previousState, action)).toEqual(expectedState)
    });

    test('correctly updates state on response success', () => {
        const action = {
            type: fetchBrowseRecipes.fulfilled,
            payload: { recipes: [], isRandom: false }
        }

        const previousState = {
            status: "fetching",
            error: null,
            data: "stale"
        }

        const expectedState = {
            status: "idle",
            error: null,
            data: { recipes: [], isRandom: false }
        }

        expect(browseRecipesReducer(previousState, action)).toEqual(expectedState)
    });
})