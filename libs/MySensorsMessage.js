'use strict';

const assert = require('assert');

const MySensorsMessageTypes = require('./MySensorsMessageTypes.js');
const MySensorsInternalSubTypes = require('./MySensorsInternalSubTypes.js');
const MySensorsSetReqSubTypes = require('./MySensorsSetReqSubTypes.js');
const MySensorsPresentationSubTypes = require('./MySensorsPresentationSubTypes.js');

const FIELD_NODE_ID = 0;
const FIELD_CHILD_SENSOR_ID = 1;
const FIELD_MESSAGE_TYPE = 2;
const FIELD_ACKNOWLEDGE = 3;
const FIELD_SUBTYPE = 4;
const FIELD_PAYLOAD = 5;

class MySensorsMessage {

	/**
	 * Represents a MySensor Message and is able to parse the raw string as well as create a response message
	 * @param {string|MySensorMessage} [rawInput] - The input to initialize the message. This can be a string as incoming message or another MySensorMessage to create a clone
	 */
	constructor(rawInput) {
		/**
		 * This is the identifier of the node
		 * @type {number}
		 */
		this.nodeId = 0;

		/**
		 * Identifier of the sensor attached to the node
		 * @type {number}
		 */
		this.childSensorId = 0;

		/**
		 * The message type which was send by the node
		 * @type {MySensorsMessageTypes}
		 */
		this.messageType = null;

		/**
		 * The ack parameter has the following meaning:
		 * Outgoing: false = unacknowledged message, true = request ack from destination node
		 * Incoming: false = normal message, true = this is an ack message
		 * @type {boolean}
		 */
		this.isAcknowledged = false;

		/**
		 * Depending on messageType this field has different meaning
		 * @type {null}
		 */
		this.subType = null;

		/**
		 * The payload holds the message coming in from sensors or instruction going out to actuators.
		 * @type {string}
		 */
		this.payload = "";

		//Read input and initialize object
		if (rawInput instanceof Uint8Array)
		{
			this.parseInput(inputStreamtoString(rawInput));
		}
		else if (rawInput instanceof String)
		{
			this.parseInput(rawInput);
		}
		else if (rawInput instanceof MySensorsMessage)
		{
			for (let otherMySensorsAttribute in rawInput)
			{
				this[otherMySensorsAttribute] = rawInput[otherMySensorsAttribute];
			}
		}
	}

	parseInput(inputMessages) {
		inputMessages = inputMessages.split("\n");
		let inputMessageParts = inputMessages[0].split(";");

		assert(inputMessageParts.length == 6, "It was expected that the input message contains 6 fields.");

		this.nodeId = parseInt(inputMessageParts[FIELD_NODE_ID]);
		this.childSensorId = parseInt(inputMessageParts[FIELD_CHILD_SENSOR_ID]);
		this.messageType = MySensorsMessageTypes.lookupType(inputMessageParts[FIELD_MESSAGE_TYPE]);
		this.isAcknowledged = inputMessageParts[FIELD_ACKNOWLEDGE] == "1";
		if (this.messageType == MySensorsMessageTypes.PRESENTATION)
		{
			this.subType = MySensorsPresentationSubTypes.lookupType(inputMessageParts[FIELD_SUBTYPE]);
		}
		else if (this.messageType == MySensorsMessageTypes.REQ || this.messageType == MySensorsMessageTypes.SET)
		{
			this.subType = MySensorsSetReqSubTypes.lookupType(inputMessageParts[FIELD_SUBTYPE]);
		}
		else if (this.messageType == MySensorsMessageTypes.INTERNAL)
		{
			this.subType = MySensorsInternalSubTypes.lookupType(inputMessageParts[FIELD_SUBTYPE]);
		}
		this.payload = inputMessageParts[FIELD_PAYLOAD];
	}

	isGatewayReadyMessage() {
		return this.nodeId == 0 && this.childSensorId == 0 && this.messageType == MySensorsMessageTypes.INTERNAL && this.subType == MySensorsInternalSubTypes.I_GATEWAY_READY;
	}

	isNodeIDRequest() {
		return this.nodeId == MySensorsMessage.BROADCAST_NODE_ID && this.childSensorId == MySensorsMessage.CHILD_SENSOR_ID_ON_CONFIG && this.messageType == MySensorsMessageTypes.INTERNAL && this.subType == MySensorsInternalSubTypes.I_ID_REQUEST;
	}

	toString() {
		let mySensorsMessage = [];
		mySensorsMessage.push(this.nodeId);
		mySensorsMessage.push(this.childSensorId);
		mySensorsMessage.push(this.messageType.value);
		mySensorsMessage.push(this.isAcknowledged ? "1" : "0");
		mySensorsMessage.push(this.subType.value);
		mySensorsMessage.push(this.payload);

		return mySensorsMessage.join(";") + "\n";
	}

}

MySensorsMessage.BROADCAST_NODE_ID = 255;
MySensorsMessage.CHILD_SENSOR_ID_ON_CONFIG = 255;
MySensorsMessage.MySensorsMessageTypes = MySensorsMessageTypes;
MySensorsMessage.MySensorsInternalSubTypes = MySensorsInternalSubTypes;
MySensorsMessage.MySensorsSetReqSubTypes = MySensorsSetReqSubTypes;
MySensorsMessage.MySensorsPresentationSubTypes = MySensorsPresentationSubTypes;

Object.freeze(MySensorsMessage);

module.exports = MySensorsMessage;

const inputStreamtoString = function(buf) {
	return String.fromCharCode.apply(null, new Uint16Array(buf));
};

const stringEndsWith = function(string, suffix) {
	return string.indexOf(suffix, string.length - suffix.length) !== -1;
};