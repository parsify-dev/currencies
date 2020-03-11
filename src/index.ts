import {Cashify, parse} from 'cashify';
import currency from 'currency.js';

interface Rates {
	[name: string]: number;
}
interface Options {
	base: string;
	rates: Rates;
}

export default ({base, rates}: Options) => async (expression: string): Promise<string> => {
	try {
		const cashify = new Cashify({base, rates});
		const parsingData = parse(expression);
		const converted = cashify.convert(expression);

		/* istanbul ignore next */
		return `${currency(converted).format()} ${parsingData.to ?? ''}`;

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return expression;
	}
};
