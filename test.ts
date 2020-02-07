import test from 'ava';

import parsifyCurrencyPlugin from './src';

test('general', async t => {
    t.regex(await parsifyCurrencyPlugin()('12 usd to pln'), /PLN/);
    t.regex(await parsifyCurrencyPlugin()('3.5 CHF to isk'), /ISK/);
    t.regex(await parsifyCurrencyPlugin()('1 gBp TO EUR'), /EUR/);
});

test('if an error occurs, just output the expression', async t => {
    t.is(await parsifyCurrencyPlugin()('12 foo to bar'), '12 foo to bar');
    t.is(await parsifyCurrencyPlugin()('1+2'), '1+2');
    t.is(await parsifyCurrencyPlugin()('12 usd'), '12 usd');
});