import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc:number,
  price_def:number,
  ratio:number,
  upper_bound:number,
  lower_bound:number,
  trigger_alert:number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    return serverResponds.map((el: any) => {
      const price_abc = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2
      const price_def = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2
      const ratio = price_abc/price_def;

      const upper_bound = 1+0.1;
      const lower_bound = 1-0.1;
      return {
        price_abc,
        price_def,
        ratio,
        upper_bound,
        lower_bound,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp?serverResponds[0].timestamp:serverResponds[1].timestamp,
        trigger_alert:(ratio>upper_bound || ratio<lower_bound)?ratio:undefined
      };
    })
  }
}
