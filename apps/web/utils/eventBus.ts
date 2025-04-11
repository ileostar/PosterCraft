/**
 * 简单的事件总线实现，用于组件间通信
 */

type EventCallback = (...args: any[]) => void;

interface EventBus {
  events: Record<string, EventCallback[]>;
  on(event: string, callback: EventCallback): void;
  off(event: string, callback: EventCallback): void;
  emit(event: string, ...args: any[]): void;
}

const eventBus: EventBus = {
  events: {},

  // 订阅事件
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },

  // 取消订阅
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  },

  // 触发事件
  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => {
      callback(...args);
    });
  },
};

// 预定义的事件类型
export const EventTypes = {
  AUTH_ERROR: "auth_error",
  // 可以添加更多事件类型
};

export default eventBus;
