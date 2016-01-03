'use strict';

class MySensorsMessageTypes {

	constructor(id, value, comment) {
		this.id = id;
		this.value = value;
		this.comment = comment;

		MySensorsMessageTypes.AVAILABLE_TYPES_BY_VALUE[this.value] = this;

		Object.freeze(this);
	}

}

MySensorsMessageTypes.AVAILABLE_TYPES_BY_VALUE = {};
MySensorsMessageTypes.lookupType = function(value) {
	if(value instanceof String)
	{
		value = parseInt(value);
	}
	let type = MySensorsMessageTypes.AVAILABLE_TYPES_BY_VALUE[value];
	if(type == undefined)
	{
		throw new Error("Requested type [" + value + "] cannot be resolved");
	}
	return type;
};

MySensorsMessageTypes.PRESENTATION = new MySensorsMessageTypes("PRESENTATION", 0, "Sent by a node when they present attached sensors. This is usually done in setup() at startup.");
MySensorsMessageTypes.SET = new MySensorsMessageTypes("SET", 1, "This message is sent from or to a sensor when a sensor value should be updated");
MySensorsMessageTypes.REQ = new MySensorsMessageTypes("REQ", 2, "Requests a variable value (usually from an actuator destined for controller).");
MySensorsMessageTypes.INTERNAL = new MySensorsMessageTypes("INTERNAL", 3, "This is a special internal message. See table below for the details");
MySensorsMessageTypes.STREAM = new MySensorsMessageTypes("STREAM", 4, "Used for OTA firmware updates");


Object.freeze(MySensorsMessageTypes);

module.exports = MySensorsMessageTypes;