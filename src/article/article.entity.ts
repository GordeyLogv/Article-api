export class Article {
    private _title: string;
    private _content: string;
    private _imageUrl: string;
    
    private _id?: number;
    private _views: number;
    private _likes: number;
    private _createdAt: Date;

    constructor(data: {
        title: string,
        content: string,
        imageUrl: string
    }) {
        this._title = data.title;
        this._content = data.content;
        this._imageUrl = data.imageUrl;
        
        this._views = 0;
        this._likes = 0;
        this._createdAt = new Date();
    }

    public incrementViews() {
        this._views += 1;
    }

    public incrementLike() {
        this._likes += 1;
    }

    public setId(id: number) {
        this._id = id;
    }

    public get id() {
        return this._id;
    }

    public get title() {
        return this._title;
    }

    public get createdAt() {
        return this._createdAt;
    }

    public get views() {
        return this._views;
    }

    public get likes() {
        return this._likes;
    }

    public get content() {
        return this._content;
    }

    public get imageUrl() {
        return this._imageUrl;
    }
}