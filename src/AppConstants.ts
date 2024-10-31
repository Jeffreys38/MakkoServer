class AppConstants {
    public static readonly VERSION: string = "0.1";

    // Creator (User)
    public static readonly DEFAULT_BIO: string = "Hello, I'm using Makko!";
    public static readonly DEFAULT_AVATAR: string = "https://firebasestorage.googleapis.com/v0/b/makko-social-network.appspot.com/o/default%2Favatar.png?alt=media&token=8d4c2b4a-6e7b-4d9e-9f9e-5f5e5f4c1d3c";
    public static readonly DEFAULT_COVER: string = "https://firebasestorage.googleapis.com/v0/b/makko-social-network.appspot.com/o/default%2Fcover.jpg?alt=media&token=3e4b2b1d-4c2a-4e9f-9f9e-5f5e5f4c1d3c";

    // Chat
    public static readonly MAX_FRIENDSHIPS: number = 20;
    public static readonly MAX_CHAT_HISTORY : number = 100; // Max chat messages per conversation

    // BaseMail
    public static readonly MAIL_FROM: string = "'Makko Social Network' <abc@gmail.com>";
}

export default AppConstants;