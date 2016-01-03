'use strict';

class MySensorsSetReqSubTypes {

	constructor(id, value, comment, usedBy) {
		this.id = id;
		this.value = value;
		this.comment = comment;
		this.usedBy = this.readUsedBy(usedBy);

		MySensorsSetReqSubTypes.AVAILABLE_TYPES_BY_VALUE[this.value] = this;

		Object.freeze(this);
	}

	readUsedBy(usedByUnstructured) {
		let usedBy = [];

		if (usedByUnstructured != undefined)
		{
			usedByUnstructured = usedByUnstructured.split(",");
			for (let usedByElement of usedByUnstructured)
			{
				usedBy.push(usedByElement.trim());
			}
		}

		return usedBy;
	}

}

MySensorsSetReqSubTypes.AVAILABLE_TYPES_BY_VALUE = {};
MySensorsSetReqSubTypes.lookupType = function(value) {
	if(value instanceof String)
	{
		value = parseInt(value);
	}
	let type = MySensorsSetReqSubTypes.AVAILABLE_TYPES_BY_VALUE[value];
	if (type == undefined)
	{
		throw new Error("Requested type [" + value + "] cannot be resolved");
	}
	return type;
};

MySensorsSetReqSubTypes.V_TEMP = new MySensorsSetReqSubTypes("V_TEMP", 0, "Temperature", "S_TEMP, S_HEATER, S_HVAC");
MySensorsSetReqSubTypes.V_HUM = new MySensorsSetReqSubTypes("V_HUM", 1, "Humidity", "S_HUM");
MySensorsSetReqSubTypes.V_STATUS = new MySensorsSetReqSubTypes("V_STATUS", 2, "Binary status. 0=off 1=on", "S_LIGHT, S_DIMMER, S_SPRINKLER, S_HVAC, S_HEATER");
MySensorsSetReqSubTypes.V_LIGHT = new MySensorsSetReqSubTypes("V_LIGHT", 2, "Deprecated. Alias for V_STATUS. Light status. 0=off 1=on", "S_LIGHT, S_DIMMER, S_SPRINKLER");
MySensorsSetReqSubTypes.V_PERCENTAGE = new MySensorsSetReqSubTypes("V_PERCENTAGE", 3, "Percentage value. 0-100 (%)", "S_DIMMER");
MySensorsSetReqSubTypes.V_DIMMER = new MySensorsSetReqSubTypes("V_DIMMER", 3, "Deprecated. Alias for V_PERCENTAGE. Dimmer value. 0-100 (%)", "S_DIMMER");
MySensorsSetReqSubTypes.V_PRESSURE = new MySensorsSetReqSubTypes("V_PRESSURE", 4, "Atmospheric Pressure", "S_BARO");
MySensorsSetReqSubTypes.V_FORECAST = new MySensorsSetReqSubTypes("V_FORECAST", 5, "Whether forecast. One of 'stable', 'sunny', 'cloudy', 'unstable', 'thunderstorm' or 'unknown'", "S_BARO");
MySensorsSetReqSubTypes.V_RAIN = new MySensorsSetReqSubTypes("V_RAIN", 6, "Amount of rain", "S_RAIN");
MySensorsSetReqSubTypes.V_RAINRATE = new MySensorsSetReqSubTypes("V_RAINRATE", 7, "Rate of rain", "S_RAIN");
MySensorsSetReqSubTypes.V_WIND = new MySensorsSetReqSubTypes("V_WIND", 8, "Windspeed", "S_WIND");
MySensorsSetReqSubTypes.V_GUST = new MySensorsSetReqSubTypes("V_GUST", 9, "Gust", "S_WIND");
MySensorsSetReqSubTypes.V_DIRECTION = new MySensorsSetReqSubTypes("V_DIRECTION", 10, "Wind direction", "S_WIND");
MySensorsSetReqSubTypes.V_UV = new MySensorsSetReqSubTypes("V_UV", 11, "UV light level", "S_UV");
MySensorsSetReqSubTypes.V_WEIGHT = new MySensorsSetReqSubTypes("V_WEIGHT", 12, "Weight (for scales etc)", "S_WEIGHT");
MySensorsSetReqSubTypes.V_DISTANCE = new MySensorsSetReqSubTypes("V_DISTANCE", 13, "Distance", "S_DISTANCE");
MySensorsSetReqSubTypes.V_IMPEDANCE = new MySensorsSetReqSubTypes("V_IMPEDANCE", 14, "Impedance value", "S_MULTIMETER, S_WEIGHT");
MySensorsSetReqSubTypes.V_ARMED = new MySensorsSetReqSubTypes("V_ARMED", 15, "Armed status of a security sensor. 1=Armed, 0=Bypassed", "S_DOOR, S_MOTION, S_SMOKE, S_SPRINKLER, S_WATER_LEAK, S_SOUND, S_VIBRATION, S_MOISTURE");
MySensorsSetReqSubTypes.V_TRIPPED = new MySensorsSetReqSubTypes("V_TRIPPED", 16, "Tripped status of a security sensor. 1=Tripped, 0=Untripped", "S_DOOR, S_MOTION, S_SMOKE, S_SPRINKLER, S_WATER_LEAK, S_SOUND, S_VIBRATION, S_MOISTURE");
MySensorsSetReqSubTypes.V_WATT = new MySensorsSetReqSubTypes("V_WATT", 17, "Watt value for power meters", "S_POWER, S_LIGHT, S_DIMMER, S_RGB, S_RGBW");
MySensorsSetReqSubTypes.V_KWH = new MySensorsSetReqSubTypes("V_KWH", 18, "Accumulated number of KWH for a power meter", "S_POWER");
MySensorsSetReqSubTypes.V_SCENE_ON = new MySensorsSetReqSubTypes("V_SCENE_ON", 19, "Turn on a scene", "S_SCENE_CONTROLLER");
MySensorsSetReqSubTypes.V_SCENE_OFF = new MySensorsSetReqSubTypes("V_SCENE_OFF", 20, "Turn of a scene", "S_SCENE_CONTROLLER");
MySensorsSetReqSubTypes.V_HVAC_FLOW_STATE = new MySensorsSetReqSubTypes("V_HVAC_FLOW_STATE", 21, "Mode of header. One of 'Off', 'HeatOn', 'CoolOn', or 'AutoChangeOver'", "S_HVAC, S_HEATER");
MySensorsSetReqSubTypes.V_HVAC_SPEED = new MySensorsSetReqSubTypes("V_HVAC_SPEED", 22, "HVAC/Heater fan speed ('Min', 'Normal', 'Max', 'Auto')", "S_HVAC, S_HEATER");
MySensorsSetReqSubTypes.V_LIGHT_LEVEL = new MySensorsSetReqSubTypes("V_LIGHT_LEVEL", 23, "Uncalibrated light level. 0-100%. Use V_LEVEL for light level in lux.", "S_LIGHT_LEVEL");
MySensorsSetReqSubTypes.V_VAR1 = new MySensorsSetReqSubTypes("V_VAR1", 24, "Custom value", "Any device");
MySensorsSetReqSubTypes.V_VAR2 = new MySensorsSetReqSubTypes("V_VAR2", 25, "Custom value", "Any device");
MySensorsSetReqSubTypes.V_VAR3 = new MySensorsSetReqSubTypes("V_VAR3", 26, "Custom value", "Any device");
MySensorsSetReqSubTypes.V_VAR4 = new MySensorsSetReqSubTypes("V_VAR4", 27, "Custom value", "Any device");
MySensorsSetReqSubTypes.V_VAR5 = new MySensorsSetReqSubTypes("V_VAR5", 28, "Custom value", "Any device");
MySensorsSetReqSubTypes.V_UP = new MySensorsSetReqSubTypes("V_UP", 29, "Window covering. Up.", "S_COVER");
MySensorsSetReqSubTypes.V_DOWN = new MySensorsSetReqSubTypes("V_DOWN", 30, "Window covering. Down.", "S_COVER");
MySensorsSetReqSubTypes.V_STOP = new MySensorsSetReqSubTypes("V_STOP", 31, "Window covering. Stop.", "S_COVER");
MySensorsSetReqSubTypes.V_IR_SEND = new MySensorsSetReqSubTypes("V_IR_SEND", 32, "Send out an IR-command", "S_IR");
MySensorsSetReqSubTypes.V_IR_RECEIVE = new MySensorsSetReqSubTypes("V_IR_RECEIVE", 33, "This message contains a received IR-command", "S_IR");
MySensorsSetReqSubTypes.V_FLOW = new MySensorsSetReqSubTypes("V_FLOW", 34, "Flow of water (in meter)", "S_WATER");
MySensorsSetReqSubTypes.V_VOLUME = new MySensorsSetReqSubTypes("V_VOLUME", 35, "Water volume", "S_WATER");
MySensorsSetReqSubTypes.V_LOCK_STATUS = new MySensorsSetReqSubTypes("V_LOCK_STATUS", 36, "Set or get lock status. 1=Locked, 0=Unlocked", "S_LOCK");
MySensorsSetReqSubTypes.V_LEVEL = new MySensorsSetReqSubTypes("V_LEVEL", 37, "Used for sending level-value", "S_DUST, S_AIR_QUALITY, S_SOUND (dB), S_VIBRATION (hz), S_LIGHT_LEVEL (lux)");
MySensorsSetReqSubTypes.V_VOLTAGE = new MySensorsSetReqSubTypes("V_VOLTAGE", 38, "Voltage level", "S_MULTIMETER");
MySensorsSetReqSubTypes.V_CURRENT = new MySensorsSetReqSubTypes("V_CURRENT", 39, "Current level", "S_MULTIMETER");
MySensorsSetReqSubTypes.V_RGB = new MySensorsSetReqSubTypes("V_RGB", 40, "RGB value transmitted as ASCII hex string (I.e 'ff0000' for red)", "S_RGB_LIGHT, S_COLOR_SENSOR");
MySensorsSetReqSubTypes.V_RGBW = new MySensorsSetReqSubTypes("V_RGBW", 41, "RGBW value transmitted as ASCII hex string (I.e 'ff0000ff' for red + full white)", "S_RGBW_LIGHT");
MySensorsSetReqSubTypes.V_ID = new MySensorsSetReqSubTypes("V_ID", 42, "Optional unique sensor id (e.g. OneWire DS1820b ids)", "S_TEMP");
MySensorsSetReqSubTypes.V_UNIT_PREFIX = new MySensorsSetReqSubTypes("V_UNIT_PREFIX", 43, "Allows sensors to send in a string representing the unit prefix to be displayed in GUI. This is not parsed by controller! E.g. cm, m, km, inch.", "S_DISTANCE, S_DUST, S_AIR_QUALITY");
MySensorsSetReqSubTypes.V_HVAC_SETPOINT_COOL = new MySensorsSetReqSubTypes("V_HVAC_SETPOINT_COOL", 44, "HVAC cold setpoint", "S_HVAC");
MySensorsSetReqSubTypes.V_HVAC_SETPOINT_HEAT = new MySensorsSetReqSubTypes("V_HVAC_SETPOINT_HEAT", 45, "HVAC/Heater setpoint", "S_HVAC, S_HEATER");
MySensorsSetReqSubTypes.V_HVAC_FLOW_MODE = new MySensorsSetReqSubTypes("V_HVAC_FLOW_MODE", 46, "Flow mode for HVAC ('Auto', 'ContinuousOn', 'PeriodicOn')", "S_HVAC");

Object.freeze(MySensorsSetReqSubTypes);

module.exports = MySensorsSetReqSubTypes;