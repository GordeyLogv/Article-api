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

    public static restore(data: {
        id: number;
        title: string;
        content: string;
        imageUrl: string;
        views: number;
        likes: number;
        createdAt: Date;
    }) {
        const article = new Article({
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl
        });

        article._id = data.id;
        article._createdAt = data.createdAt;
        article._views = data.views;
        article._likes = data.likes;

        return article;
    }

    public toJson() {
        return {
            id: this._id,
            title: this._title,
            content: this._content,
            imageUrl: this._imageUrl,
            views: this._views,
            likes: this._likes,
            createdAt: this._createdAt
        };
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