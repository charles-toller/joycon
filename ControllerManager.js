let WindowsController = require('./WindowsController')
class ControllerManager {
  constructor(vgen) {
    /**
     * @type {Joycon[]}
     */
    this.joycons = []
    /**
     * @type {WindowsController[]}
     */
    this.controllers = []
    this.vgen = vgen
    setInterval(()=>{
      if(this.joycons.filter((a)=>a.buttons.home).length > 0) {
        this.repairControllers()
      }
    },100)
  }
  get unassignedControllers() {
    return this.controllers.filter((a)=>this.joycons.find((b)=>b.controller === a) == null)
  }

  /**
   *
   * @param {Joycon} joycon
   */
  async addNewJoycon(joycon) {
    this.joycons.push(joycon)
    await joycon.waitUntilInitialized()
    if(this.unassignedControllers.length === 0) {
      this.allocateController()
    }
    joycon.controller = this.unassignedControllers[0]
    await joycon.setPlayerLights(this.controllers.indexOf(joycon.controller)+1)
    joycon.mode = joycon.SINGLE_MODE
  }
  allocateController() {
    this.controllers.push(new WindowsController(this.vgen))
  }
  async repairControllers() {
    for(let joycon of this.joycons) {
      joycon.releaseController()
      await joycon.setPairingLight()
      joycon.mode = null
    }
    await this.enterPairingMode()
  }
  enterPairingMode() {
    console.log("Pairing mode started...")
    return new Promise((f,r)=>{
      let interval
      interval = setInterval(async ()=>{
        let possibles = this.joycons.filter((a)=>a.mode == null)
        possibles.filter((joy)=>joy.buttons.SL && joy.buttons.SR).forEach((joy)=>{
          joy.mode = joy.SINGLE_MODE
          if(this.unassignedControllers.length === 0) this.allocateController()
          joy.controller = this.unassignedControllers[0]
          joy.setPlayerLights(this.controllers.indexOf(joy.controller)+1)
          console.log(`Single Joy-Con connected as controller ${this.controllers.indexOf(joy.controller)+1}`)
        })
        possibles = this.joycons.filter((a)=>a.mode == null)
        let L = possibles.filter((joy)=>joy.buttons.L)
        let R = possibles.filter((joy)=>joy.buttons.R)
        if(L.length > 0 && R.length > 0) {
          L[0].pairing = R[0]
          R[0].pairing = L[0]
          L[0].mode = L[0].DUAL_MODE
          R[0].mode = R[0].DUAL_MODE
          if(this.unassignedControllers.length === 0) this.allocateController()
          let c = this.unassignedControllers[0]
          L[0].controller = c
          R[0].controller = c
          L[0].setPlayerLights(this.controllers.indexOf(c)+1)
          R[0].setPlayerLights(this.controllers.indexOf(c)+1)
          console.log(`Dual Joy-Cons connected as controller ${this.controllers.indexOf(c)+1}`)
        }
        if(this.joycons.filter((a)=>a.buttons.a).length > 0) {
          while(this.unassignedControllers.length > 0) {
            this.unassignedControllers[0].finalize()
            this.controllers.splice(this.controllers.indexOf(this.unassignedControllers[0]),1)
          }
          this.joycons.filter((joy)=>joy.mode == null).forEach((joy)=>{
            joy.finalize()
            this.joycons.splice(this.joycons.indexOf(joy),1)
          })
          clearInterval(interval)
        }
      },100)
    })
  }
}
module.exports = ControllerManager