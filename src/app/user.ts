export interface User {
    xuid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    myCustomData?: string;
    getAccessToken():string {
        return "";
    }
}
