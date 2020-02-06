import test from 'ava';

import parsifyCurrencyPlugin from './src';

test('general', async t => {
    t.is(await parsifyCurrencyPlugin()('12 usd to pln'), '46.26 PLN');
    t.is(await parsifyCurrencyPlugin()('3.5 CHF to isk'), '451.01 ISK');
    t.is(await parsifyCurrencyPlugin()('1 gBp TO EUR'), '1.18 EUR');
});

test('if an error occurs, just output the expression', async t => {
    t.is(await parsifyCurrencyPlugin()('12 foo to bar'), '12 foo to bar');
    t.is(await parsifyCurrencyPlugin()('1+2'), '1+2');
    t.is(await parsifyCurrencyPlugin()('12 usd'), '12 usd');
});