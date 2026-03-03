import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user';

const STORAGE_KEY = 'cine_current_user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    /** Signal réactif contenant l'utilisateur connecté (ou null) */
    private readonly currentUserSignal = signal<User | null>(this.loadFromStorage());

    /** Signal public en lecture seule */
    readonly currentUser = this.currentUserSignal.asReadonly();

    /** Computed : est-ce que l'utilisateur est connecté ? */
    readonly isLoggedIn = computed(() => this.currentUserSignal() !== null);

    /**
     * Connecte un utilisateur : stocke dans localStorage + met à jour le signal
     */
    login(user: User): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        this.currentUserSignal.set(user);
    }

    /**
     * Déconnecte l'utilisateur : supprime du localStorage + reset le signal
     */
    logout(): void {
        localStorage.removeItem(STORAGE_KEY);
        this.currentUserSignal.set(null);
    }

    /**
     * Récupère l'utilisateur depuis le localStorage (appelé au démarrage)
     */
    private loadFromStorage(): User | null {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            try {
                return JSON.parse(data) as User;
            } catch {
                localStorage.removeItem(STORAGE_KEY);
                return null;
            }
        }
        return null;
    }
}
