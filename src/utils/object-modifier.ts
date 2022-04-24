import { MongoObjectId } from '../database/mongoose.utils';

export function parseNestData(data: object): object {
	const result = {};

	const joinKeys = (keys: string[]): string => {
		return `${keys.join('.')}`;
	};

	function parseObject(key: string, value: any) {
		if (typeof value === 'object') {
			if (value instanceof MongoObjectId) {
				return (result[joinKeys([...this.prevKeys, key])] =
					value.toHexString());
			}
			this.prevKeys.push(key);
			return loop(value, this.prevKeys);
		}

		result[joinKeys([...this.prevKeys, key])] = value;
	}

	function loop(data: object, prevKeys: string[]) {
		for (const key in data) {
			parseObject.apply({ prevKeys }, [key, data[key]]);
		}
	}

	loop(data, []);

	return result;
}

export function updateObejctKeys(object: object, name: string): object {
	return Object.fromEntries(
		Object.entries(object).map(([key, value]) => [`${name}.${key}`, value]),
	);
}
