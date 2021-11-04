import { App } from 'vue'
/* Only imports what we need */
import { Button, Input } from 'ant-design-vue'

export default {
	install: (app: App) => {
		app.use(Button)
		app.use(Input)
	},
}
