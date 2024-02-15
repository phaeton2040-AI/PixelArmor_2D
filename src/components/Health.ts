export class HealthComponent {
    health: number;
    maxHealth: number;

    constructor(maxHealth: number) {
        this.health = maxHealth;
        this.maxHealth = maxHealth;
    }

    takeDamage(amount: number): void {
        this.health = Math.max(0, this.health - amount);
    }

    heal(amount: number): void {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }

    isAlive(): boolean {
        return this.health > 0;
    }
}
