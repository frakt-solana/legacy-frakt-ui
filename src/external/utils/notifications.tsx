import { notification } from 'antd';

export function notify({
  message = '',
  description = null,
  type = 'info',
}): void {
  (notification as any)[type]({
    className: 'frakt__notification',
    message,
    description,
    placement: 'bottomRight',
  });
}
