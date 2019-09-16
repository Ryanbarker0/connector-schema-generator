const _ = require('lodash');
// const util = require('util');
const fs = require('fs')
const { data } = require('./dataToFormat');

module.exports = () => {
	const buildSchema = data => {

		const handleArrays = value => {
			if (_.isPlainObject(value[0])) {
				return {
					title: '',
					description: '',
					type: 'object',
					properties: reducer(value[0])
				}
			} else {
				return {
					title: '',
					description: '',
					type: typeof value[0]
				}
			}
		}
		const idChecker = (key, acc) => {
			if (key.includes('_id') || key === 'id') {
				acc[key].title = key.includes('_id') ?
					`${_.upperFirst(key.split('_')[0])} ${_.upperCase(key.split('_')[1])}` :
					_.upperCase(key)
			}
			return acc
		}

		const reducer = input => {
			return _.reduce(input, (acc, value, key) => {
				switch (typeof value) {
					case 'object':
						if (_.isPlainObject(value)) {
							acc[key] = {
								type: 'object',
								description: '',
								properties: reducer(value)
							}
							return acc
						}
						else if (_.isArray(value)) {
							acc[key] = {
								type: 'array',
								description: '',
								items: handleArrays(value)
							}
							return acc
						}
					case 'string':
						acc[key] = {
							type: 'string',
							description: ''
						}
						return idChecker(key, acc)
					case 'number':
						acc[key] = {
							type: 'integer',
							description: ''
						}
						return idChecker(key, acc)
					case 'boolean':
						acc[key] = {
							type: 'boolean',
							description: '',
							default: false,
						}
						return acc
					default:
						console.log('failed');
				}

			}, {})
		}
		return reducer(data)
	}

	fs.writeFileSync('output.json', JSON.stringify(buildSchema(data)))
	console.log('-- Input Successfully Formatted --')

}