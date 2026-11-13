/**
 * Formular „Musterfächer anfordern“: Pflichtfelder prüfen, dann per fetch an Netlify Forms senden.
 * Ohne JavaScript sendet das Formular regulär und landet auf /danke.
 */
export function initForm() {
  const form = document.querySelector<HTMLFormElement>('[data-form]');
  const status = form?.querySelector<HTMLElement>('[data-form-status]');
  const button = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!form || !status || !button) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputs = [...form.querySelectorAll<HTMLInputElement>('input[required]')];
    inputs.forEach((el) => el.setAttribute('aria-invalid', String(!el.checkValidity())));
    const invalid = inputs.find((el) => !el.checkValidity());
    status.classList.remove('is-ok');
    if (invalid) {
      status.textContent = invalid.type === 'email' && invalid.value
        ? 'Bitte eine gültige E-Mail-Adresse eingeben.'
        : 'Bitte Name und E-Mail ausfüllen.';
      invalid.focus();
      return;
    }

    button.disabled = true;
    status.textContent = 'Wird gesendet …';
    try {
      const body = new URLSearchParams(new FormData(form) as any).toString();
      const res = await fetch(import.meta.env.BASE_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      status.classList.add('is-ok');
      status.textContent = 'Danke. Die Anfrage ist angekommen, der Musterfächer wird vorbereitet.';
    } catch {
      status.textContent = 'Die Anfrage konnte nicht gesendet werden. Bitte später erneut versuchen oder direkt Kontakt aufnehmen.';
    } finally {
      button.disabled = false;
    }
  });
}
