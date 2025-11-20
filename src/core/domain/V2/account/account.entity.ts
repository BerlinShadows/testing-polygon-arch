export class Account {
    id: string;
    walletId: string;
    externalRef?: string;
    isActivated: boolean = false;

    activate(): void {
        this.isActivated = true;
    }
}