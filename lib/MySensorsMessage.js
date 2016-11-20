'use strict';

const assert = require('assert');

const MySensorsMessageTypes = require('./MySensorsMessageTypes.js');
const MySensorsInternalSubTypes = require('./MySensorsInternalSubTypes.js');
const MySensorsSetReqSubTypes = require('./MySensorsSetReqSubTypes.js');
const MySensorsPresentationSubTypes = require('./MySensorsPresentationSubTypes.js');

const SIX_FIELD_MESSAGE = {
	FIELD_NODE_ID : 0,
	FIELD_CHILD_SENSOR_ID : 1,
	FIELD_MESSAGE_TYPE : 2,
	FIELD_ACKNOWLEDGE : 3,
	FIELD_SUBTYPE : 4,
	FIELD_PAYLOAD : 5
};

const SEVEN_FIELD_MESSAGE = {
	FIELD_OCCURENCE_DATE: 0,
	FIELD_NODE_ID : 1,
	FIELD_CHILD_SENSOR_ID : 2,
	FIELD_MESSAGE_TYPE : 3,
	FIELD_ACKNOWLEDGE : 4,
	FIELD_SUBTYPE : 5,
	FIELD_PAYLOAD : 6
};

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

		/**
		 *
		 * @type {Date}
		 */
		this.occurenceDate = new Date();

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
		else if (typeof rawInput === 'object')
		{
			this.nodeId = rawInput.nodeId;
			this.childSensorId = rawInput.childSensorId;
			this.messageType = MySensorsMessageTypes[rawInput.messageType];
			this.payload = rawInput.payload || "";

			this.isAcknowledged = inputMessageParts[fieldsMessage.FIELD_ACKNOWLEDGE] === "1";
			if (this.messageType === MySensorsMessageTypes.PRESENTATION)
			{
				this.subType = MySensorsPresentationSubTypes[rawInput.subType];
			}
			else if (this.messageType === MySensorsMessageTypes.REQ || this.messageType === MySensorsMessageTypes.SET)
			{
				this.subType = MySensorsSetReqSubTypes[rawInput.subType];
			}
			else if (this.messageType === MySensorsMessageTypes.INTERNAL)
			{
				this.subType = MySensorsInternalSubTypes[rawInput.subType];
			}
		}
	}

	toObject() {
		return {
			nodeId: this.nodeId,
			childSensorId: this.childSensorId,
			messageType: this.messageType.id,
			payload: this.payload,
			isAcknowledged: this.isAcknowledged,
			subType: this.subType.id
		};
	}

	parseInput(inputMessages) {
		inputMessages = inputMessages.split("\n");
		let inputMessageParts = inputMessages[0].split(";");

		//The input message needs 6 or 7 fields to continue
		assert(inputMessageParts.length == 6 || inputMessageParts.length == 7, "It was expected that the input message contains 6 or 7 fields.");

		//Six field messages are default
		let fieldsMessage = SIX_FIELD_MESSAGE;
		//In case it's a 7 field message the occurence date is part of the message
		if(inputMessageParts.length == 7)
		{
			fieldsMessage = SEVEN_FIELD_MESSAGE;
			this.occurenceDate = new Date(inputMessageParts[fieldsMessage.FIELD_OCCURENCE_DATE]);
		}

		this.nodeId = parseInt(inputMessageParts[fieldsMessage.FIELD_NODE_ID]);
		this.childSensorId = parseInt(inputMessageParts[fieldsMessage.FIELD_CHILD_SENSOR_ID]);
		this.messageType = MySensorsMessageTypes.lookupType(inputMessageParts[fieldsMessage.FIELD_MESSAGE_TYPE]);
		this.isAcknowledged = inputMessageParts[fieldsMessage.FIELD_ACKNOWLEDGE] == "1";
		if (this.messageType == MySensorsMessageTypes.PRESENTATION)
		{
			this.subType = MySensorsPresentationSubTypes.lookupType(inputMessageParts[fieldsMessage.FIELD_SUBTYPE]);
		}
		else if (this.messageType == MySensorsMessageTypes.REQ || this.messageType == MySensorsMessageTypes.SET)
		{
			this.subType = MySensorsSetReqSubTypes.lookupType(inputMessageParts[fieldsMessage.FIELD_SUBTYPE]);
		}
		else if (this.messageType == MySensorsMessageTypes.INTERNAL)
		{
			this.subType = MySensorsInternalSubTypes.lookupType(inputMessageParts[fieldsMessage.FIELD_SUBTYPE]);
		}
		this.payload = inputMessageParts[fieldsMessage.FIELD_PAYLOAD];
	}

	isGatewayReadyMessage() {
		return this.nodeId === 0 && this.childSensorId === 0 && this.messageType == MySensorsMessageTypes.INTERNAL && this.subType === MySensorsInternalSubTypes.I_GATEWAY_READY;
	}

	isNodeIDRequest() {
		return this.nodeId === MySensorsMessage.BROADCAST_NODE_ID && this.childSensorId === MySensorsMessage.CHILD_SENSOR_ID_ON_CONFIG && this.messageType == MySensorsMessageTypes.INTERNAL && this.subType === MySensorsInternalSubTypes.I_ID_REQUEST;
	}

	isNodeTypePresentation() {
		return this.childSensorId === MySensorsMessage.CHILD_SENSOR_ID_ON_CONFIG && this.messageType === MySensorsMessageTypes.PRESENTATION;
	}

	isNodeSketchInfo() {
		return this.nodeId !== MySensorsMessage.BROADCAST_NODE_ID && this.childSensorId === MySensorsMessage.CHILD_SENSOR_ID_ON_CONFIG && this.messageType === MySensorsMessageTypes.INTERNAL;
	}

	isNodeSensorPresentation() {
		return this.childSensorId !== MySensorsMessage.CHILD_SENSOR_ID_ON_CONFIG && this.messageType === MySensorsMessageTypes.PRESENTATION;
	}

	toString(includingDate) {
		let mySensorsMessage = [];

		if(includingDate === true)
		{
			let occurrenceDate = new Date();
			if(this.occurenceDate instanceof Date)
			{
				occurrenceDate = this.occurenceDate;
			}
			let occurrenceDateString = JSON.stringify(occurrenceDate).substr(1,24);
			mySensorsMessage.push(occurrenceDateString);
		}

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