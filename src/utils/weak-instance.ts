export class WeakInstance<T> {
	private _wm: WeakMap<WeakInstance<T>, T>
	constructor(init: T) {
		this._wm = new WeakMap()
		this.set(init)
	}
	delete() {
		return this._wm.delete(this)
	}
	set(value: T) {
		this._wm.set(this, value)
	}
	get() {
		return this._wm.get(this)
	}
	has() {
		return this._wm.has(this)
	}
}
