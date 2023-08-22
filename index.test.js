const { getGreeting } = require('./index');

test.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])(
    'returns Good morning for hours less than 12 when hour is %i',
    (hour) => {
        expect(getGreeting(hour)).toBe('Good morning');
    }
);

test.each([12, 13, 14, 15, 16, 17])(
    'returns Good afternoon for hours between than 12 and 17 when hour is %i',
    (hour) => {
        expect(getGreeting(hour)).toBe('Good afternoon');
    }
);

test.each([18, 19, 20, 21, 22, 23])(
    'returns Good evening for hours greater than 17 when hour is %i',
    (hour) => {
        expect(getGreeting(hour)).toBe('Good evening');
    }
);

const { lambdaHandler } = require('./index');

test ('lambdaHandler returns correct response structure', async() => {
    const event = {};
    const result = await lambdaHandler(event);

    expect(result).toHaveProperty('statusCode', 200);
    expect(result).toHaveProperty('body');

    const body = JSON.parse(result.body);

    expect(body).toHaveProperty('message');
});

test('lambdaHandler returns correct greeting in message', async() => {
    const event = {};
    const result = await lambdaHandler(event);
    const body = JSON.parse(result.body);

    expect(body.message).toMatch(/(Good morning|Good afternoon|Good evening)! The time now is \d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}(\+\d{2}:\d{2}|Z)/)
});