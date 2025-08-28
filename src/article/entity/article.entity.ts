export class Article {
    private _title: string;
    private _content: string;
    private _imageUrl: string;

    private _id?: number;
    private _createdAt: Date = new Date(); 
    private _views: number = 0;
    private _likes: number = 0;

    constructor(data: {
        title: string;
        content: string;
        imageUrl: string;
    }) {
        this._title = data.title;
        this._content = data.content;
        this._imageUrl = data.imageUrl;
    }


    public incrementViews() {
        return this._views++;
    }

    public incrementLikes() {
        return this._likes++;
    }

    public descrementLikes() {
        return this._likes--;
    }

    public get title() {
        return this._title;
    }

    public get content() {
        return this._content;
    }

    public get imageUrl() {
        return this._imageUrl;
    }

    public get views() {
        return this._views;
    }

    public get likes() {
        return this._likes;
    }

    public get createdAt() {
        return this._createdAt;
    }
}