import { STATUS_CODES as RES_STATUS } from '../../utils/constants';
import { notFound } from '../../responses';
import { testURLRegex } from '../../utils';

class Route {
  constructor(method, urlExp, func) {
    this.method = method;
    this.urlExp = urlExp;
    this.func = func;
  }
}

class Router {
  constructor() {
    this.routes = [];
  }

  get = (urlExp, func) => {
    this.routes.push(new Route('GET', urlExp, func));
    return this;
  }

  post = (urlExp, func) => {
    this.routes.push(new Route('POST', urlExp, func));
    return this;
  }

  matchReqURL = (reqData, res) => {
    const { method, url } = reqData;

    res.statusCode = RES_STATUS[method];

    for (const route of this.routes) {
      const matches = testURLRegex(route.urlExp, url);
      if(matches && route.method === method) {
        const urlData = url.split('/');
        route.func({ ...reqData, urlData }, res);
        return;
      }
    }

    notFound(res);
  }
}

export default Router;
