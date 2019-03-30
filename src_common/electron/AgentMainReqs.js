import Agent from './Agent'


const reqSend = (cmd, data) => {
  return Agent.send({target: name, cmd, data})
}

const reqs = {
  toHome(user) {
    return reqSend('toHome', user);
  }
}
const name = 'main';
export default {name, reqs}
