import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { UsersApi } from '../services/users-api';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../services/toast';

type SortField = 'firstName' | 'email' | 'age' | 'points';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-panel-admin',
  imports: [CommonModule],
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.scss',
})
export class PanelAdmin {
  // Services injectés
  private readonly usersApi = inject(UsersApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toast = inject(ToastService);

  // État de base
  users = signal<User[]>([]);
  searchQuery = signal<string>('');

  // Pagination
  displayLimit = signal<number>(10);

  // Tri
  sortField = signal<SortField>('firstName');
  sortDirection = signal<SortDirection>('asc');

  // ===== COMPUTED SIGNALS (dérivés automatiquement) =====

  // Étape 1 : Filtrage par recherche
  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.users();

    return this.users().filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      return fullName.includes(query) || email.includes(query);
    });
  });

  // Étape 2 : Tri
  sortedUsers = computed(() => {
    const users = [...this.filteredUsers()];
    const field = this.sortField();
    const direction = this.sortDirection();

    users.sort((a, b) => {
      let aVal: any = a[field];
      let bVal: any = b[field];

      // Pour le tri par nom, on combine prénom et nom
      if (field === 'firstName') {
        aVal = `${a.firstName} ${a.lastName}`.toLowerCase();
        bVal = `${b.firstName} ${b.lastName}`.toLowerCase();
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return users;
  });

  // Étape 3 : Pagination (limitation du nombre affiché)
  displayedUsers = computed(() => {
    return this.sortedUsers().slice(0, this.displayLimit());
  });

  // Statistiques calculées
  totalUsers = computed(() => this.filteredUsers().length);
  displayedCount = computed(() => this.displayedUsers().length);

  totalPoints = computed(() =>
    this.users().reduce((sum, user) => sum + (user.points ?? 0), 0)
  );

  averageAge = computed(() => {
    const list = this.users();
    if (!list.length) return 0;
    return Math.round(
      list.reduce((sum, user) => sum + (user.age ?? 0), 0) / list.length
    );
  });

  hasMore = computed(() => this.displayLimit() < this.totalUsers());

  // ===== LIFECYCLE =====

  ngOnInit(): void {
    this.usersApi.getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(users => this.users.set(users));
  }

  // ===== ACTIONS UTILISATEUR =====

  deleteUser(id: number): void {
    // Confirmation native simple et efficace
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      return;
    }
    this.usersApi.deleteUser(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.users.update(current =>
          current.filter(user => user.id !== id)
        );
        this.toast.ok('Utilisateur supprimé avec succès');
      });
  }

  loadMore(): void {
    // Charge 10 utilisateurs supplémentaires
    this.displayLimit.update(current => current + 10);
  }

  sort(field: SortField): void {
    if (this.sortField() === field) {
      // Inverser la direction si même champ
      this.sortDirection.update(dir => dir === 'asc' ? 'desc' : 'asc');
    } else {
      // Nouveau champ, direction ascendante par défaut
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }
}
