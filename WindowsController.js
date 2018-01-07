class WindowsController {
  constructor (vgen) {
    this.vgen = vgen
    this.id = this.vgen.pluginNext()
  }
  buttonA(pressed) {
    this.vgen.setButton(this.id,this.vgen.Buttons.A,!!pressed)
  }
  buttonB(pressed) {
    this.vgen.setButton(this.id,this.vgen.Buttons.B,!!pressed)
  }
  buttonX(pressed) {
    this.vgen.setButton(this.id,this.vgen.Buttons.X,!!pressed)
  }
  buttonY(pressed) {
    this.vgen.setButton(this.id,this.vgen.Buttons.Y,!!pressed)
  }
  dPad(up,down,left,right) {
    let dir
    if(up && left) {
      dir = this.vgen.Dpad.UP_LEFT
    }
    else if(up && right) {
      dir = this.vgen.Dpad.UP_RIGHT
    }
    else if(down && left) {
      dir = this.vgen.Dpad.DOWN_LEFT
    }
    else if(down && right) {
      dir = this.vgen.Dpad.DOWN_RIGHT
    }
    else if(up) {
      dir = this.vgen.Dpad.UP
    }
    else if(down) {
      dir = this.vgen.Dpad.DOWN
    }
    else if(left) {
      dir = this.vgen.Dpad.LEFT
    }
    else if(right) {
      dir = this.vgen.Dpad.RIGHT
    }
    else {
      dir = this.vgen.Dpad.NONE
    }
    this.vgen.setDpad(this.id,dir)
  }
  leftStick(x,y) {
    x = Math.min(Math.max(x,-1),1)
    y = Math.min(Math.max(y,-1),1)
    this.vgen.setAxisL(this.id,x,y)
  }
  rightStick(x,y) {
    x = Math.min(Math.max(x,-1),1)
    y = Math.min(Math.max(y,-1),1)
    this.vgen.setAxisR(this.id,x,y)
  }
  leftButton(pressed) {
    this.vgen.setButton(this.id,this.vgen.Buttons.LEFT_SHOULDER,!!pressed)
  }
  rightButton(pressed) {
    this.vgen.setButton(this.id,this.vgen.Buttons.RIGHT_SHOULDER,!!pressed)
  }
  leftTrigger(pressed) {
    this.vgen.setTriggerL(this.id,pressed ? 1:0)
  }
  rightTrigger(pressed) {
    this.vgen.setTriggerR(this.id,pressed ? 1:0)
  }
  finalize() {
    this.vgen.unplug(this.id)
  }
}
module.exports = WindowsController