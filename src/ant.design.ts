import { App } from 'vue'
/* Only imports what we need */
import { Button, Input, Menu } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/index.css'
import './ant.override.css'

export default {
	install: (app: App) => {
		app.use(Button)
		app.use(Input)
		app.use(Menu)
	},
}
