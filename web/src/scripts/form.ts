/** Formular: Pflichtfelder prüfen. Versand wird in Ausbaustufe 6 angeschlossen (BRIEF.md, Abschnitt 10). */
export function initForm() {
  const form = document.querySelector<HTMLFormElement>('[data-form]');
  const status = form?.querySelector<HTMLElement>('[data-form-status]');
  if (!form || !status) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalid = [...form.elements].find(
      (el): el is HTMLInputElement => el instanceof HTMLInputElement && !el.checkValidity(),
    );
    form.querySelectorAll('input').forEach((el) => el.setAttribute('aria-invalid', String(!el.checkValidity())));
    if (invalid) {
      status.textContent = invalid.type === 'email' && invalid.value
        ? 'Bitte eine gültige E-Mail-Adresse eingeben.'
        : 'Bitte Name und E-Mail ausfüllen.';
      invalid.focus();
      return;
    }
    status.textContent = 'Vorschau: Der Versand wird in Ausbaustufe 6 angeschlossen.';
  });
}
