import test from 'ava';

import parsifyCurrencyPlugin from './src';

const rates = {
	GBP: 0.92,
	EUR: 1,
	USD: 1.12
};

test('general', async t => {
	t.regex(await parsifyCurrencyPlugin({base: 'EUR', rates})('12 usd to gbp'), /GBP/);
	t.regex(await parsifyCurrencyPlugin({base: 'EUR', rates})('3.5 EUR in usd'), /USD/);
	t.regex(await parsifyCurrencyPlugin({base: 'EUR', rates})('1 gBp TO EUR'), /EUR/);
});

test('if an error occurs, just output the expression', async t => {
	t.is(await parsifyCurrencyPlugin({base: 'EUR', rates})('12 foo to bar'), '12 foo to bar');
	t.is(await parsifyCurrencyPlugin({base: 'EUR', rates})('1+2'), '1+2');
	t.is(await parsifyCurrencyPlugin({base: 'EUR', rates})('12 usd'), '12 usd');
});
