/* eslint-disable no-unused-vars */
import Electron from '../src_common/electron'
import APP_CONFIG from '../src_common/electron/APP_CONFIG'
import webSocket from './webSocket'
import AgentCmd from './AgentCmds'
import Agent from '../src_common/electron/Agent'


Agent.init(AgentCmd.name, AgentCmd.cmds);
// Agent.send({
//   target: 'main',
//   cmd: 'test',
//   data: {lalal: 123, s: true}
// })
//   .then((data) => console.log(1, data))
//   .catch((data) => console.log(2, data))
