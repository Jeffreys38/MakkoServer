import { v4 as uuidv4 } from 'uuid';

class Account {
    private uid: string;
    private email: string;
    private password: string; // Unused for now
    private firstName: string;
    private lastName: string;
    private phoneNumber: string;

    private memberType: string;
    private memberSince: string;
    private token: number;

    constructor(email: string, memberType: string = "basic") {
        this.uid = this.generateUid();
        this.email = email;
        this.password = "";
        this.firstName = "";
        this.lastName = "";
        this.phoneNumber = "";
        this.memberType = memberType;
        this.memberSince = new Date().toISOString();
        this.token = this.initializeTokens(memberType);
    }

    setFullName(firstName: string, lastName: string): void {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    setMemberType(memberType: string): void {
        this.memberType = memberType;
        this.token = this.initializeTokens(memberType);
    }

    private initializeTokens(memberType: string): number {
        switch (memberType.toLowerCase()) {
            case "gold":
                return 600;
            case "platinum":
                return 1200;
            default:
                return 300;
        }
    }

    private generateUid(): string {
        return uuidv4();
    }

    getUid(): string {
        return this.uid;
    }

    getEmail(): string {
        return this.email;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    getMemberType(): string {
        return this.memberType;
    }

    getMemberSince(): string {
        return this.memberSince;
    }

    getToken(): number {
        return this.token;
    }

    // Method to spend tokens, e.g., for generating an image
    spendTokens(amount: number): boolean {
        if (this.token >= amount) {
            this.token -= amount;
            return true; // Successfully spent the tokens
        } else {
            return false; // Not enough tokens
        }
    }

    addTokens(amount: number): void {
        this.token += amount;
    }

    toJSON() {
        return {
            uid: this.uid,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            memberType: this.memberType,
            memberSince: this.memberSince,
            token: this.token
        };
    }
}
