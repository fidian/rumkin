<?php

/**
 * Validate input form data (NOT JSON) by first converting $_POST data into
 * a single-level-deep object and then run it through \Json\Validator to
 * see if the inputs are correct.
 *
 * @param string $schemaFilename
 * @param array $request POST data or null to get it ourselves
 * @return mixed False if OK, array of errors otherwise
 */
function json_validate_input($schemaFilename, $post = null) {
	if (is_null($post)) {
		$post = $_POST;
	}

	$params = new stdclass();
	$validator = new \Json\Validator(__DIR__ . '/../schemas/' . $schemaFilename);
	$friend = new Friend($validator);
	$properties = $friend->schema->properties;

	foreach ($properties as $name => $property) {
		switch ($property->type) {
			case 'string':
				if (array_key_exists($name, $post)) {
					$params->$name = $post[$name];
				}
				break;

			case 'boolean':
				if (array_key_exists($name, $post)) {
					$params->$name = true;
				} else {
					$params->$name = false;
				}
				break;

			default:
				throw new Exception('Unsupported data type: ' . $property->type);
		}
	}

	try {
		$validator->validate($params);
	} catch (\Json\ValidationException $ex) {
		WebResponse::status(500);
		@header('Content-type: text/plain');
		echo $ex->getMessage();
		exit();
	}

	return $params;
}
