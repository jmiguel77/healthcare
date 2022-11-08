import {expect, test} from '@jest/globals';
import extractErrorMessage from '../app/utils/error.utils.js';

test('should return simple string', () => {
    const error = {
        errors: [
            {
                message: 'error 1'
            },
            {
                message: 'error 2'
            }
        ]
    };
    const message = extractErrorMessage(error);
    expect(typeof message === 'string').toBe(true);
});
