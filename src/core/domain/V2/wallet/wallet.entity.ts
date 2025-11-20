export class Wallet {
    id: string;
    userId: string;
    balance: number;
    status: 'pending' | 'active' | 'blocked';
    createdAt: Date;

    activate(): void {
        if (this.status === 'pending') this.status = 'active';
    }
}