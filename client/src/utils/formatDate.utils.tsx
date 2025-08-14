export function formatSmartDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0 && diffHours < 24) {
        return `il y a ${diffHours <= 1 ? '1 heure' : `${diffHours} heures`}`;
    }

    if (diffDays <= 3) {
        return `il y a ${diffDays === 1 ? '1 jour' : `${diffDays} jours`}`;
    }

    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}