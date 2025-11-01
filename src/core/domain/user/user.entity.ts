export class User {
    constructor(
        public readonly id: string,
        public email: string,
        public name: string,
        public role: string,
        public isActive: boolean = true,
        public readonly createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
    ) { }

    updateProfile(name: string, email: string): void {
        this.name = name;
        this.email = email;
        this.updatedAt = new Date();
    }

    deactivate(): void {
        this.isActive = false;
        this.updatedAt = new Date();
    }
}