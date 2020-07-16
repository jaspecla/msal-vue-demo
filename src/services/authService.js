import * as Msal from 'msal';


export default class AuthService {
    constructor() {
        const config = {
            auth: {
                clientId: '57e0645a-85c8-408b-86ef-e0689550de6d',
                authority: 'https://login.microsoftonline.com/jasonspecland.com'
            }
        };

        this.myMsal = new Msal.UserAgentApplication(config);
        this.request = {
            scopes: ["user.read", "group.read.all"]
        };

        this.idToken = '';
        this.accessToken = '';
    }


    async login() {
        try {
            this.idToken = await this.myMsal.loginPopup(this.request);
        } catch(error) {
            console.log(error);
        }
    }

    async getAccessToken() {
        let tokenResponse = '';
        try {
            tokenResponse = await this.myMsal.acquireTokenSilent(this.request);
            this.accessToken = tokenResponse.accessToken;
        }
        catch(error) {
            console.log(error);
            if (this.requiresInteraction(error)) {
                try {
                    tokenResponse = await this.myMsal.acquireTokenPopup(this.request);
                    this.accessToken = tokenResponse.accessToken;
                }
                catch(error) {
                    console.log(error);
                }
            }
        }
    }

    async getGroups() {
        await this.getAccessToken();
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.accessToken
        };
        const graphUrl = 'https://graph.microsoft.com/v1.0/me/memberOf';
        const response = await fetch(graphUrl, {
            method: 'GET',
            headers: headers
        });

        const responseData = await response.json();
        let groups = responseData.value.map(groupData => {
            return { name : groupData.displayName ? groupData.displayName : groupData.id}
        });

        return groups;
        
    }

    requiresInteraction(errorCode) {
        if (!errorCode || !errorCode.length) {
            return false;
        }
        return errorCode === "consent_required" ||
            errorCode === "interaction_required" ||
            errorCode === "login_required";
    }
    
}
