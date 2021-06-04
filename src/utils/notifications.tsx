import styles from './notifications.module.scss'
import { notification } from 'antd'

export function notify({ message = '', description = null, type = 'info' }) {
  ;(notification as any)[type]({
    className: styles.root,
    message,
    description,
    placement: 'bottomRight',
  })
}
