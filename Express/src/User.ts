import {IUserCollection} from "./UserCollection";

export interface IUserConfig {
    /**
     * Identifiant de l'utilisateur
     *
     * @type {string}
     * @memberof IUserConfig
     */
    readonly id: string
    /**
     * Pseudo éventuel de l'utilisateur
     *
     * @type {string}
     * @memberof IUserConfig
     */
    readonly pseudo?: string
    /**
     * Url de l'éventuelle image de l'utilisateur
     *
     * @type {string}
     * @memberof IUserConfig
     */
    readonly imgUrl?: string
    /**
     * Collection à l'intérieur de laquelle est enregistré l'utilisateur
     *
     * @type {IUserCollection}
     * @memberof IUserConfig
     */
    readonly collection: IUserCollection
}

export interface IUser {
    /**
     * Identifiant de l'utilisateur
     *
     * @type {string}
     * @memberof IUserConfig
     */
    readonly id: string
    /**
     * Pseudo éventuel de l'utilisateur
     *
     * @type {string}
     * @memberof IUserConfig
     */
    pseudo?: string
    /**
     * Url de l'éventuelle image de l'utilisateur
     *
     * @type {string}
     * @memberof IUserConfig
     */
    imgUrl?: string
    /**
     * Collection à l'intérieur de laquelle est enregistré l'utilisateur
     *
     * @type {IUserCollection}
     * @memberof IUserConfig
     */
    collection: IUserCollection
    /**
     * Liste des identifiants des salons que l'utilisateur à joint
     *
     * @type {Array<string>}
     * @memberof IUser
     */
    rooms?: Array<string>

    /**
     * Méthode permettant d'inclure l'utilisateur dans un salon
     *
     * @param {string} roomId
     * @memberof IUser
     */
    joinRoom(roomId: string): void

    /**
     * Méthode permettant à un utilisateur de quitter un salon
     *
     * @param {string} roomId
     * @memberof IUser
     */
    leaveRoom(roomId: string): void
}

export class User implements IUser {

    private readonly _pseudo?: string;
    private readonly _imgUrl?: string;
    private readonly _rooms: Array<string>
    collection: IUserCollection;

    readonly id: string ;

    constructor(config: IUserConfig) {
        this.collection = config.collection;
        this._rooms = [];
        this._pseudo="";
        this._imgUrl="";
        this.id =config.id;

    }
    get pseudo() :string |undefined{
        return this._pseudo;
    }
    set  pseudo(value:string |undefined){

    }

    get imgUrl() :string |undefined{
        return this._imgUrl;
    }
    set  imgUrl(value:string |undefined){

    }

    get rooms() :Array<string> {
        return this._rooms;
    }
    set  rooms(value:Array<string>){

    }



    joinRoom(roomId: string): void {
        if (this.rooms.indexOf(roomId) == -1) {
            this.rooms.push(roomId)
        }
    }


    leaveRoom(roomId: string): void {
        if (this.rooms.indexOf(roomId) !== -1) {
            this.rooms = this.rooms.filter((id) => roomId !== id)
        }
    }

}