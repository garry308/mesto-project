export default class Section {
	constructor({items, renderer}, selector) {
		this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(selector);
	}

	addItem(item) {
		this._container.prepend(item);
	}

	renderItems(items) {
		items.forEach((item) => {
			const renderedItem = this._renderer(item);
			this.addItem(renderedItem);
		})
	}

}