import Agent from './Agent'


const reqSend = (cmd, data) => {
  return Agent.send({target: name, cmd, data})
}

const reqs = {
  exit() {
    return reqSend('exit', {});
  },
  toHome() {
    return reqSend('toHome', {});
  },
  loginAfter() {
    return reqSend('loginAfter', {});
  }
}

const name = 'main';
export default {name, reqs}
