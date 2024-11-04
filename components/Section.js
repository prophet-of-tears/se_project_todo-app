 class Section {
    constructor({initialTodos, renderer, containerElement}){
        this._items = initialTodos;
        this._renderer = renderer;
        this._containerElement = document.querySelector(containerElement);
    }

    renderItems(){
        this._items.forEach((item) => {
            this._renderer(item);
        });
    };

    addItem(element){
        this._containerElement.append(element);
};
 
}
export default Section;