import { constructQueryParams } from "./utils";


describe('constructQueryParams', () => {

    test('returns a query string when parameters are specified', () => {
        const params = {
            param1: "val1",
            param2: "val2",
            param3: "val3"
        }

        const keyTransforms = {
            param1: "key1",
            param2: "key2"
        }

        const queryParams = constructQueryParams(params, keyTransforms);

        expect(queryParams).toEqual("?key1=val1&key2=val2&param3=val3")
    });

    test('ignores params with empty values', () => {
        const params = {
            param1: "",
            param2: ""
        }

        const keyTransforms = {
            param1: "key1",
            param2: "key2"
        }

        const queryParams = constructQueryParams(params, keyTransforms);

        expect(queryParams).toEqual("")
    });

    test('only includes non-empty params when there is a mix of empty and non-empty', () => {
        const params = {
            param1: "val1",
            param2: ""
        }

        const keyTransforms = {
            param1: "key1",
            param2: "key2"
        }

        const queryParams = constructQueryParams(params, keyTransforms);

        expect(queryParams).toEqual("?key1=val1")
    });
    
    test('returns an empty string when no parameters provided', () => {
        const params = {}

        const keyTransforms = {
            param1: "key1",
            param2: "key2"
        }

        const queryParams = constructQueryParams(params, keyTransforms);

        expect(queryParams).toEqual("")
    });

})