# MySensorsMessage
The aim of MySensorMessage is to provide a Node.js module which is able to parse or generate messages which are used by the [MySensors](http://www.mysensors.org/) project. It is compatible with the [serial protocol](http://www.mysensors.org/download/serial_api_15) of version 1.5. It simplifies the communication with the sensors network but doesn't cover the managing the connection to the gateway. So it can be used with serial or ethernet gateways. To use this library you need Node.js version 5.0 or greater.


## Parse Message
```js
var MySensorsMessage = require('MySensorsMessage');

//A function which is called when a MySensorsMessage is received and shall be processed
function processMySesnsorsMessage(mySensorsRawMessage) {
    var receivedMessage = new MySensorsMessage(mySensorsRawMessage);
    console.log("Sender Node ID: " + receivedMessage.nodeId); //Number
    console.log("Child Sensor ID: " + receivedMessage.childSensorId); //Number
    console.log("Message Type: " + receivedMessage.messageType.value); //ENUM which provides the attributes ".value", ".id", ".comment"
    console.log("Message Sub Type: " + receivedMessage.subType.value); //ENUM which provides the attributes ".value", ".id", ".comment"
    console.log("Is Acknowledged requested: " + receivedMessage.isAcknowledged); //boolean
    console.log("Payload of the message: " + receivedMessage.payload); //string
}
```

## Create Message
```js
var MySensorsMessage = require('MySensorsMessage');

function getMessageToRequestVersionFromGateway() {
    var requestVersionMessage = new MySensorsMessage();
    requestVersionMessage.nodeId = 0;
    requestVersionMessage.childSensorId = 0;
    requestVersionMessage.messageType = MySensorsMessage.MySensorsMessageTypes.INTERNAL;
    requestVersionMessage.subType = MySensorsMessage.MySensorsInternalSubTypes.I_VERSION;
    requestVersionMessage.payload = "Get version";
    return requestVersionMessage.toString();
}

function getMessageToProvideNewNodeId(newNodeId) {
    let newIdMessage = new MySensorsMessage();
	newIdMessage.nodeId = MySensorsMessage.BROADCAST_NODE_ID;
	newIdMessage.childSensorId = MySensorsMessage.CHILD_SENSOR_ID_ON_CONFIG;
	newIdMessage.messageType = MySensorsMessage.MySensorsMessageTypes.INTERNAL;
	newIdMessage.subType = MySensorsMessage.MySensorsInternalSubTypes.I_ID_RESPONSE;
	newIdMessage.payload = newNodeId;
	return newIdMessage.toString();
}

function getMessageToSetValueOnNode(nodeId, chilSensorId, value) {
    let setValueMessage = new MySensorsMessage();
    setValueMessage.nodeId = nodeId;
    setValueMessage.childSensorId = chilSensorId;
    setValueMessage.messageType = MySensorsMessage.MySensorsMessageTypes.SET;
    setValueMessage.subType = MySensorsMessage.MySensorsSetReqSubTypes.V_VAR1;
    setValueMessage.payload = value;
    return setValueMessage.toString();
}
    
```