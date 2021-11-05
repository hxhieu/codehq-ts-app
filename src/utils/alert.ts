// Abstract Alert / notifications, this may be couple with the UI framework we using
import { message } from 'ant-design-vue'

export const error = (msg: string, delay = 5000) => {
	message.error(msg, delay / 1000)
}

export const info = (msg: string, delay = 5000) => {
	message.info(msg, delay / 1000)
}

export const warn = (msg: string, delay = 5000) => {
	message.warn(msg, delay / 1000)
}
