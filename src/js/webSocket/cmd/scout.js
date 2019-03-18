import Scout from "../../utils/scout";

let Cmds = {
  _1688Ranking(req, res) {
    let {keywords, selector, parameter, needItem, maxPage, pageSize} = req;
    Scout._1688Ranking(keywords, selector, parameter, needItem, maxPage, pageSize)
      .then(list => res.sd(list))
      .catch(err => res.f('查询1688排名失败', err));
  },
  _1688RankingSales(req, res) {
    let {keywords, selector, parameter, needItem, maxPage, pageSize} = req;
    Scout._1688RankingSales(keywords, selector, parameter, needItem, maxPage, pageSize)
      .then(list => res.sd(list))
      .catch(err => res.f('查询1688排名失败', err));
  },
  _1688Search(req, res) {
    let {keywords, parameter, pageTotal, pageSize} = req;
    Scout._1688Search(keywords, parameter, pageTotal, pageSize)
      .then(list => res.sd(list))
      .catch(err => res.f('查询1688商品', err));
  }
};

export default Cmds;