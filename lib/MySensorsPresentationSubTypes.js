'use strict';

class MySensorsPresentationSubTypes {

	constructor(id, value, comment, variables) {
		this.id = id;
		this.value = value;
		this.comment = comment;
		this.variables = this.readVariables(variables);

		MySensorsPresentationSubTypes.AVAILABLE_TYPES_BY_VALUE[this.value] = this;

		Object.freeze(this);
	}

	readVariables(variablesUnstructured) {
		let variables = [];

		if(variablesUnstructured != undefined)
		{
			variablesUnstructured = variablesUnstructured.split(",");
			for(let unstructuredVariable of variablesUnstructured)
			{
				variables.push(unstructuredVariable.trim());
			}
		}

		return variables;
	}

}

MySensorsPresentationSubTypes.AVAILABLE_TYPES_BY_VALUE = {};
MySensorsPresentationSubTypes.lookupType = function(value) {
	if(value instanceof String)
	{
		value = parseInt(value);
	}
	let type = MySensorsPresentationSubTypes.AVAILABLE_TYPES_BY_VALUE[value];
	if (type == undefined)
	{
		throw new Error("Requested type [" + value + "] cannot be resolved");
	}
	return type;
};


MySensorsPresentationSubTypes.S_DOOR = new MySensorsPresentationSubTypes("S_DOOR", 0, "Door and window sensors	V_TRIPPED, V_ARMED");
MySensorsPresentationSubTypes.S_MOTION = new MySensorsPresentationSubTypes("S_MOTION", 1, "Motion sensors	V_TRIPPED, V_ARMED");
MySensorsPresentationSubTypes.S_SMOKE = new MySensorsPresentationSubTypes("S_SMOKE", 2, "Smoke sensor	V_TRIPPED, V_ARMED");
MySensorsPresentationSubTypes.S_LIGHT = new MySensorsPresentationSubTypes("S_LIGHT", 3, "Light Actuator (on/off)	V_STATUS (or V_LIGHT), V_WATT");
MySensorsPresentationSubTypes.S_BINARY = new MySensorsPresentationSubTypes("S_BINARY", 3, "Binary device (on/off), Alias for S_LIGHT	V_STATUS (or V_LIGHT), V_WATT");
MySensorsPresentationSubTypes.S_DIMMER = new MySensorsPresentationSubTypes("S_DIMMER", 4, "Dimmable device of some kind	V_STATUS (on/off), V_PERCENTAGE (dimmer level 0-100), V_WATT");
MySensorsPresentationSubTypes.S_COVER = new MySensorsPresentationSubTypes("S_COVER", 5, "Window covers or shades	V_UP, V_DOWN, V_STOP, V_PERCENTAGE");
MySensorsPresentationSubTypes.S_TEMP = new MySensorsPresentationSubTypes("S_TEMP", 6, "Temperature sensor	V_TEMP, V_ID");
MySensorsPresentationSubTypes.S_HUM = new MySensorsPresentationSubTypes("S_HUM", 7, "Humidity sensor	V_HUM");
MySensorsPresentationSubTypes.S_BARO = new MySensorsPresentationSubTypes("S_BARO", 8, "Barometer sensor (Pressure)	V_PRESSURE, V_FORECAST");
MySensorsPresentationSubTypes.S_WIND = new MySensorsPresentationSubTypes("S_WIND", 9, "Wind sensor	V_WIND, V_GUST, V_DIRECTION");
MySensorsPresentationSubTypes.S_RAIN = new MySensorsPresentationSubTypes("S_RAIN", 10, "Rain sensor	V_RAIN, V_RAINRATE");
MySensorsPresentationSubTypes.S_UV = new MySensorsPresentationSubTypes("S_UV", 11, "UV sensor	V_UV");
MySensorsPresentationSubTypes.S_WEIGHT = new MySensorsPresentationSubTypes("S_WEIGHT", 12, "Weight sensor for scales etc.	V_WEIGHT, V_IMPEDANCE");
MySensorsPresentationSubTypes.S_POWER = new MySensorsPresentationSubTypes("S_POWER", 13, "Power measuring device, like power meters	V_WATT, V_KWH");
MySensorsPresentationSubTypes.S_HEATER = new MySensorsPresentationSubTypes("S_HEATER", 14, "Heater device	V_HVAC_SETPOINT_HEAT, V_HVAC_FLOW_STATE, V_TEMP");
MySensorsPresentationSubTypes.S_DISTANCE = new MySensorsPresentationSubTypes("S_DISTANCE", 15, "Distance sensor	V_DISTANCE, V_UNIT_PREFIX");
MySensorsPresentationSubTypes.S_LIGHT_LEVEL = new MySensorsPresentationSubTypes("S_LIGHT_LEVEL", 16, "Light sensor	V_LIGHT_LEVEL (uncalibrated percentage), V_LEVEL (light level in lux)");
MySensorsPresentationSubTypes.S_ARDUINO_NODE = new MySensorsPresentationSubTypes("S_ARDUINO_NODE", 17, "Arduino node device");
MySensorsPresentationSubTypes.S_ARDUINO_REPEATER_NODE = new MySensorsPresentationSubTypes("S_ARDUINO_REPEATER_NODE", 18, "Arduino repeating node device");
MySensorsPresentationSubTypes.S_LOCK = new MySensorsPresentationSubTypes("S_LOCK", 19, "Lock device	V_LOCK_STATUS");
MySensorsPresentationSubTypes.S_IR = new MySensorsPresentationSubTypes("S_IR", 20, "Ir sender/receiver device	V_IR_SEND, V_IR_RECEIVE");
MySensorsPresentationSubTypes.S_WATER = new MySensorsPresentationSubTypes("S_WATER", 21, "Water meter	V_FLOW, V_VOLUME");
MySensorsPresentationSubTypes.S_AIR_QUALITY = new MySensorsPresentationSubTypes("S_AIR_QUALITY", 22, "Air quality sensor e.g. MQ-2	V_LEVEL, V_UNIT_PREFIX");
MySensorsPresentationSubTypes.S_CUSTOM = new MySensorsPresentationSubTypes("S_CUSTOM", 23, "Use this for custom sensors where no other fits.S_DUST	24	Dust level sensor	V_LEVEL, V_UNIT_PREFIX");
MySensorsPresentationSubTypes.S_SCENE_CONTROLLER = new MySensorsPresentationSubTypes("S_SCENE_CONTROLLER", 25, "Scene controller device	V_SCENE_ON, V_SCENE_OFF");
MySensorsPresentationSubTypes.S_RGB_LIGHT = new MySensorsPresentationSubTypes("S_RGB_LIGHT", 26, "RGB light	V_RGB, V_WATT");
MySensorsPresentationSubTypes.S_RGBW_LIGHT = new MySensorsPresentationSubTypes("S_RGBW_LIGHT", 27, "RGBW light (with separate white component)	V_RGBW, V_WATT");
MySensorsPresentationSubTypes.S_COLOR_SENSOR = new MySensorsPresentationSubTypes("S_COLOR_SENSOR", 28, "Color sensor	V_RGB");
MySensorsPresentationSubTypes.S_HVAC = new MySensorsPresentationSubTypes("S_HVAC", 29, "Thermostat/HVAC device	V_HVAC_SETPOINT_HEAT, V_HVAC_SETPOINT_COLD, V_HVAC_FLOW_STATE, V_HVAC_FLOW_MODE, V_HVAC_SPEED");
MySensorsPresentationSubTypes.S_MULTIMETER = new MySensorsPresentationSubTypes("S_MULTIMETER", 30, "Multimeter device	V_VOLTAGE, V_CURRENT, V_IMPEDANCE");
MySensorsPresentationSubTypes.S_SPRINKLER = new MySensorsPresentationSubTypes("S_SPRINKLER", 31, "Sprinkler device	V_STATUS (turn on/off), V_TRIPPED (if fire detecting device)");
MySensorsPresentationSubTypes.S_WATER_LEAK = new MySensorsPresentationSubTypes("S_WATER_LEAK", 32, "Water leak sensor	V_TRIPPED, V_ARMED");
MySensorsPresentationSubTypes.S_SOUND = new MySensorsPresentationSubTypes("S_SOUND", 33, "Sound sensor	V_LEVEL (in dB), V_TRIPPED, V_ARMED");
MySensorsPresentationSubTypes.S_VIBRATION = new MySensorsPresentationSubTypes("S_VIBRATION", 34, "Vibration sensor	V_LEVEL (vibration in Hz), V_TRIPPED, V_ARMED");
MySensorsPresentationSubTypes.S_MOISTURE = new MySensorsPresentationSubTypes("S_MOISTURE", 35, "Moisture sensor	V_LEVEL (water content or moisture in percentage?), V_TRIPPED, V_ARMED");
MySensorsPresentationSubTypes.S_INFO = new MySensorsPresentationSubTypes("S_INFO", 36, "LCD text device	V_TEXT");
MySensorsPresentationSubTypes.S_GAS = new MySensorsPresentationSubTypes("S_GAS", 37, "Gas meter	V_FLOW, V_VOLUME");
MySensorsPresentationSubTypes.S_GPS = new MySensorsPresentationSubTypes("S_GPS", 38, "GPS Sensor	V_POSITION");
MySensorsPresentationSubTypes.S_WATER_QUALITY = new MySensorsPresentationSubTypes("S_WATER_QUALITY", 39, "Water quality sensor	V_TEMP, V_PH, V_ORP, V_EC, V_STATUS");

Object.freeze(MySensorsPresentationSubTypes);

module.exports = MySensorsPresentationSubTypes;