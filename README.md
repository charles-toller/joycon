Joy-Con
=====

Prerequisites:

*  Windows Machine (check out [JoyCon-Driver](https://github.com/mfosse/JoyCon-Driver) for a fantastic Mac/Linux solution)
*  [Node 8](nodejs.org) (tested on node v8.7.0 and npm 5.4.2 currently with Windows 10)
*  npm native build tools for Windows (use Visual Studio (large download) or `npm install --global --production windows-build-tools` (smaller download))

Installation:

Run `npm install` and `node installDriver.js`. You'll only need to do this once per machine, and it sets up the virtual controller driver.

If `node installDriver.js` fails, go ahead and try the following steps anyway. It was fine on my machine, even though it threw many errors during installation.

Connecting Joy-Cons:

Hold the SYNC button (small round dark button next to player indicator LEDs) until the LEDs chase back and forth from Player 1 to Player 4. This puts the Joy-Con into discoverable mode. At this point, pair the Joy-Con(s) to your computer using your native Bluetooth interface.

The next step probably isn't required, but I like to do it because it makes me feel better about the order the Joy-Cons connect. Once Setup has completed (Windows 10 will tell you that it is going through additional setup), press the SYNC button once to disconnect from the computer. This will power off the Joy-Con.

Running the Program:

Run `node index.js`, and then press any button on your Joy-Con to connect them to the computer. At this point, a series of things will happen:

1. The Joy-Con lights will stop chasing and hold at a specific light. This indicates that the Joy-Con has connected via Bluetooth to your computer.
2. The bottom Joy-Con light will begin flashing with all other lights off. This indicates that the program has found the Joy-Con and is allocating a controller for it.
3. The Joy-Con will be assigned a controller, and the lights on the Joy-Con will light to show which controller it is.

All Joy-Cons initally connect in single-sideways mode. To pair them together, follow these steps:

1. Press Home on any connected controller. This will disconnect all Joy-Con controllers from the virtual controllers, rendering them inoperable for a short time.
2. On each controller you want to pair as single, press SL and SR at the same time. This will connect it to the next available virtual controller and set its lights.
3. On each controller pair you want to use together, press L and R at the same time. This will connect them both to the same virtual controller and set their lights as such.
4. Once complete, press A (or right, for single mode) on any controller to exit pairing mode. This will deallocated extra virtual controllers and turn off unpaired Joy-Cons.

Issues
=====

Please file an issue above for any problems/ideas you have. Thanks!