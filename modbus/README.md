# Click as Modbus slave (server)

## Getting Started

### PLC setup

Modbus TCP/IP works on port 1 of the PLC. The default settings can be used. The PLC will be used as a Modbus slave device.

![PLC port config](./img/com-port-config.png)

**important !**

~~There seems to be a bug in version 2.60 of the CLICK Programming Software.~~

~~The decimal modbus adresses differ by 1 in the decimal view.~~

~~Coil Y002 has modbus address 8194 in the DEC view (which is 20002 HEX).~~

![address picker decimal](./img/address-picker-decimal.png)

~~Coil Y002 has modbus address 2001 in the HEX view (which is 1893 DEC). This seems to be the correct one.~~

![address picker hex](./img/address-picker-hex.png)

**Example:**

Lets say you want to read holding register 40005

![holding reigster](./img/address-picker-holding-reg.png)

This has function code 03 and the PDU address must be 0004

### Node Red setup

Node Red has a [Modbus Package](https://www.npmjs.com/package/node-red-contrib-modbus) where you can use Node Red as the Modbus Master (client).

**Reading a value:**

General flow:

![node red modbus read flow](./img/modbus-read-flow.png)

Configuring the register to read out:

![node red modbus read config](./img/modbus-read-config.png)

Modbus server (slave) configuration:

![node red modbus server configuration](./img/modbus-read-slave-config.png)

**Writing a value:**

General flow:

![node red modbus write flow](./img/modbus-write-flow.png)

Write config:

![node red modbus write config](./img/modbus-write-config.png)
