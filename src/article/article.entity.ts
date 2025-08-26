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

    public static restore(data: {
        id: number;
        title: string;
        content: string;
        imageUrl: string;
        views: number;
        likes: number;
        createdAt: Date;
    }): Article {
        const article = new Article({
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl
        });

        article._id = data.id;
        article._views = data.views;
        article._likes = data.likes;
        article._createdAt = data.createdAt;

        return article;
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