/* eslint-disable @typescript-eslint/no-explicit-any */
// 轻量本地类型，兼容 socket.io-client v2 的常用接口
export type ChatSocket = {
  id?: string;
  connected?: boolean;
  emit: (event: string, ...args: any[]) => boolean;
  on: (event: string, listener: (...args: any[]) => void) => any;
  off: (event: string, listener?: (...args: any[]) => void) => any;
  close: () => void;
  disconnect?: () => void;
};
