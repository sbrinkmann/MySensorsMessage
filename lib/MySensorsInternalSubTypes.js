'use strict';

class MySensorsInternalSubTypes {

	constructor(id, value, comment) {
		this.id = id;
		this.value = value;
		this.comment = comment;

		MySensorsInternalSubTypes.AVAILABLE_TYPES_BY_VALUE[this.value] = this;

		Object.freeze(this);
	}

}

MySensorsInternalSubTypes.AVAILABLE_TYPES_BY_VALUE = {};
MySensorsInternalSubTypes.lookupType = function(value) {
	let type = MySensorsInternalSubTypes.AVAILABLE_TYPES_BY_VALUE[value];
	if (type == undefined)
	{
		throw new Error("Requested type [" + value + "] cannot be resolved");
	}
	return type;
};

MySensorsInternalSubTypes.I_BATTERY_LEVEL = new MySensorsInternalSubTypes("I_BATTERY_LEVEL", 0, "Use this to report the battery level (in percent 0-100).");
MySensorsInternalSubTypes.I_TIME = new MySensorsInternalSubTypes("I_TIME", 1, "Sensors can request the current time from the Controller using this message. The time will be reported as the seconds since 1970");
MySensorsInternalSubTypes.I_VERSION = new MySensorsInternalSubTypes("I_VERSION", 2, "Used to request gateway version from controller.");
MySensorsInternalSubTypes.I_ID_REQUEST = new MySensorsInternalSubTypes("I_ID_REQUEST", 3, "Use this to request a unique node id from the controller.");
MySensorsInternalSubTypes.I_ID_RESPONSE = new MySensorsInternalSubTypes("I_ID_RESPONSE", 4, "Id response back to node. Payload contains node id.");
MySensorsInternalSubTypes.I_INCLUSION_MODE = new MySensorsInternalSubTypes("I_INCLUSION_MODE", 5, "Start/stop inclusion mode of the Controller (1=start, 0=stop).");
MySensorsInternalSubTypes.I_CONFIG = new MySensorsInternalSubTypes("I_CONFIG", 6, "Config request from node. Reply with (M)etric or (I)mperal back to sensor.");
MySensorsInternalSubTypes.I_FIND_PARENT = new MySensorsInternalSubTypes("I_FIND_PARENT", 7, "When a sensor starts up, it broadcast a search request to all neighbor nodes. They reply with a I_FIND_PARENT_RESPONSE.");
MySensorsInternalSubTypes.I_FIND_PARENT_RESPONSE = new MySensorsInternalSubTypes("I_FIND_PARENT_RESPONSE", 8, "Reply message type to I_FIND_PARENT request.");
MySensorsInternalSubTypes.I_LOG_MESSAGE = new MySensorsInternalSubTypes("I_LOG_MESSAGE", 9, "Sent by the gateway to the Controller to trace-log a message");
MySensorsInternalSubTypes.I_CHILDREN = new MySensorsInternalSubTypes("I_CHILDREN", 10, "A message that can be used to transfer child sensors (from EEPROM routing table) of a repeating node.");
MySensorsInternalSubTypes.I_SKETCH_NAME = new MySensorsInternalSubTypes("I_SKETCH_NAME", 11, "Optional sketch name that can be used to identify sensor in the Controller GUI");
MySensorsInternalSubTypes.I_SKETCH_VERSION = new MySensorsInternalSubTypes("I_SKETCH_VERSION", 12, "Optional sketch version that can be reported to keep track of the version of sensor in the Controller GUI.");
MySensorsInternalSubTypes.I_REBOOT = new MySensorsInternalSubTypes("I_REBOOT", 13, "Used by OTA firmware updates. Request for node to reboot.");
MySensorsInternalSubTypes.I_GATEWAY_READY = new MySensorsInternalSubTypes("I_GATEWAY_READY", 14, "Send by gateway to controller when startup is complete.");
MySensorsInternalSubTypes.I_SIGNING_PRESENTATION = new MySensorsInternalSubTypes("I_SIGNING_PRESENTATION", 15, "Provides signing related preferences (first byte is preference version).");
MySensorsInternalSubTypes.I_NONCE_REQUEST = new MySensorsInternalSubTypes("I_NONCE_REQUEST", 16, "Used between sensors when requesting nonce.");
MySensorsInternalSubTypes.I_NONCE_RESPONSE = new MySensorsInternalSubTypes("I_NONCE_RESPONSE", 17, "Used between sensors for nonce response.");
MySensorsInternalSubTypes.I_HEARTBEAT_REQUEST = new MySensorsInternalSubTypes("I_HEARTBEAT_REQUEST", 18, "Heartbeat request");
MySensorsInternalSubTypes.I_PRESENTATION = new MySensorsInternalSubTypes("I_PRESENTATION", 19, "Presentation message");
MySensorsInternalSubTypes.I_DISCOVER_REQUEST = new MySensorsInternalSubTypes("I_DISCOVER_REQUEST", 20, "Discover request");
MySensorsInternalSubTypes.I_DISCOVER_RESPONSE = new MySensorsInternalSubTypes("I_DISCOVER_RESPONSE", 21, "Discover response");
MySensorsInternalSubTypes.I_HEARTBEAT_RESPONSE = new MySensorsInternalSubTypes("I_HEARTBEAT_RESPONSE", 22, "Heartbeat response");
MySensorsInternalSubTypes.I_LOCKED = new MySensorsInternalSubTypes("I_LOCKED", 23, "Node is locked (reason in string-payload)");
MySensorsInternalSubTypes.I_PING = new MySensorsInternalSubTypes("I_PING", 24, "Ping sent to node, payload incremental hop counter");
MySensorsInternalSubTypes.I_PONG = new MySensorsInternalSubTypes("I_PONG", 25, "In return to ping, sent back to sender, payload incremental hop counter");
MySensorsInternalSubTypes.I_REGISTRATION_REQUEST = new MySensorsInternalSubTypes("I_REGISTRATION_REQUEST", 26, "Register request to GW");
MySensorsInternalSubTypes.I_REGISTRATION_RESPONSE = new MySensorsInternalSubTypes("I_REGISTRATION_RESPONSE", 27, "Register response from GW");
MySensorsInternalSubTypes.I_DEBUG = new MySensorsInternalSubTypes("I_DEBUG", 28, "Debug message");

Object.freeze(MySensorsInternalSubTypes);

module.exports = MySensorsInternalSubTypes;