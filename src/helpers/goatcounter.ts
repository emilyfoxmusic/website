/* eslint-disable */

export const init = (val: any) => ((window as any).goatcounter = val);

export const count = (args: any) => {
  const gc = (window as any).goatcounter;
  if (gc && gc.count) {
    gc.count(args);
  } else {
    setTimeout(() => count(args), 1000);
  }
};
