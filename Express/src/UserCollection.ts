import {IUser} from "./User";

export interface IUserCollection extends Iterator<IUser> {
    /**
     * Liste des identifiants des utilisateurs
     *
     * @type {Array<string>}
     * @memberof I_users
     */
    readonly all: Array<string>

    /**
     * Récupération des données d'un utilisateur dont l'identifiant est `id`
     *
     * @param {string} id
     * @returns {(IUser | false)}
     * @memberof I_users
     */
    get(id: string): IUser | false

    /**
     * Ajoute un utilisateur aux utilisateurs connus de cette collection
     *
     * @param {IUser} user
     * @memberof I_users
     */
    add(user: IUser): void

    /**
     * Supprime de cette collection un utilisateur avec l'identifiant `id` donné
     *
     * @param {string} id
     * @memberof IUserCollection
     */
    del(id: string): void
}

export class Users implements IUserCollection {

    private _users: { [k: string]: IUser }
    private _ids: Array<string>
    private nextIdx: number

    constructor() {
        this._users = {};
        this._ids = [];
        this.nextIdx = 0;

    }

    get all(): Array<string> {
        return this._ids
    }

    set all(v: Array<string>) {
    }


    add(user: IUser): void {
        if (this._ids.indexOf(user.id) == -1) {
            this._ids.push(user.id)
            this._users[user.id]=user
        }
    }

    del(id: string): void {
        if (this._ids.indexOf(id) !== -1) {
            this._ids = this._ids.filter((ids) => ids !== id)
        }
    }

    get(id: string): IUser | false {
        if (id in this._users) {
            return this._users[id]
        }
        return false;
    }

    next(...args: Array<any>): { value: IUser, done?: false } | { value: undefined, done: true } {
        if (this.nextIdx < this._ids.length) {
            const ret : {value: IUser, done: false} = {value: this._users[this._ids[this.nextIdx]], done: false}
            this.nextIdx++
            return ret
        }
        this.nextIdx = 0
        return {value: undefined, done: true}
    }
}