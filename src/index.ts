import fetch from 'isomorphic-unfetch';
import {Cashify, parse} from 'cashify';
import currency from 'currency.js';

import currencies from './lib/currencies';

export default () => async (expression: string): Promise<string> => {
	const regex = new RegExp(currencies.join('|'), 'i');

	if (regex.test(expression)) {
		try {
			const data = await fetch('https://api.exchangeratesapi.io/latest').then((r: any) => r.json());
			const {base, rates} = data;

			const cashify = new Cashify({base, rates});
			const parsingData = parse(expression);
			const converted = cashify.convert(expression);

			/* istanbul ignore next */
			return `${currency(converted).format()} ${parsingData.to ?? ''}`;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			return expression;
		}
	}

	return expression;
};
