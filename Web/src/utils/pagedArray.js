export class PagedArray {
    constructor({items, totalCount}) {
        this.items = items
        this.page = 1
        this.totalCount = totalCount
    }
}