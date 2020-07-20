export class UserInfoBean {

    constructor(
        public username: string,
        public firstName: string,
        public lastName: string,
        public fullName: string,
        public authToken: string
    ) {
    }

}