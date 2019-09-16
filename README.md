# Connector Schema Generator

This is a WIP attempt to help speed up schema generation for connectors (in certain cases).

# Usage

The current format of the programme expects a input of the following format:

```
{
	"cartItem": {
		"item_id": 0,
		"sku": "string",
		"qty": 0,
		"name": "string",
		"price": 0,
		"product_type": "string",
		"quote_id": "string",
		"product_option": {
			"extension_attributes": {
				"custom_options": [
					{
						"option_id": "string",
						"option_value": "string",
						"extension_attributes": {
							"file_info": {
								"base64_encoded_data": "string",
								"type": "string",
								"name": "string"
							}
						}
					}
				],
			}
		}
	}
}
```
Assuming the API provides payload examples similar to the schema in the example, copy the example into the `app/dataToFormat.js` portion of the programme. Ensure it is being exported as `data`.

Then open the terminal and cd into the connector-schema-generator folder you have cloned, to execute the programme simply run:
```
node run.js
```
You will then receive a JSON stringified version of the input schema (found in the `output.json` file in the director root), converted into JSON schema, appropriate for the `input` field of your `schema.js` file in the connector.

# Be aware

The program is in early development and certain fields may not be correctly formatted at this point in time. Additionally, due to the nature of the input, descriptions for each input will be generate as empty strings, so need to be manually inputted. Required fields at this point are not flagged, so it is a connector developer's requirement to specify the required fields manually.   