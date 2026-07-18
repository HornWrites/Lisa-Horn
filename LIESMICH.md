# Lisa Horn — Recherche & Reportage

Diese Website hat jetzt ein eingebautes Redaktionssystem (CMS) unter
`/admin/`. Nach der einmaligen Einrichtung kannst du Artikel und
Live-Blog-Einträge über eine normale Weboberfläche bearbeiten — mit
Login, Formularfeldern und einem "Veröffentlichen"-Knopf. Kein Code,
kein GitHub-Editor mehr nötig.

## Einmalige Einrichtung (ca. 15 Minuten)

Das CMS (Decap CMS) braucht zwei Dinge: einen Ort, an dem es Änderungen
speichert (GitHub), und ein Login-System (Netlify Identity). Beides ist
kostenlos.

**1. Code zu GitHub hochladen**
- Kostenloses Konto auf github.com anlegen.
- Neues Repository erstellen (z. B. „lisa-horn-website"), diesen
  kompletten Ordner hochladen.

**2. Seite über Netlify veröffentlichen (nicht per Drag & Drop!)**
- Kostenloses Konto auf netlify.com anlegen.
- „Add new site" → „Import an existing project" → GitHub verbinden →
  das gerade erstellte Repository auswählen.
- Wichtig: Diesmal per Git-Import, nicht per Drag & Drop — nur so kann
  das CMS später Änderungen zurückspeichern.
- Netlify baut die Seite und gibt dir eine Adresse wie
  `zufallsname.netlify.app`.

**3. Netlify Identity aktivieren**
- Im Netlify-Dashboard: „Site configuration" → „Identity" → „Enable Identity".
- Unter „Registration preferences" auf „Invite only" stellen (damit sich
  niemand außer euch selbst registrieren kann).

**4. Git Gateway aktivieren**
- Weiterhin unter „Identity" → Reiter „Services" → „Git Gateway" →
  „Enable Git Gateway".

**5. Dich selbst einladen**
- Unter „Identity" → „Invite users" → deine E-Mail-Adresse eintragen.
- Du bekommst eine E-Mail, klickst auf den Link, vergibst ein Passwort.

**6. Einloggen und loslegen**
- Auf `deine-adresse.netlify.app/admin/` gehen, einloggen — fertig.
  Das Dashboard zeigt „Artikel" und „Live-Blog" als Bereiche zum
  Bearbeiten.

Wenn du unsicher bist: Melde dich, sobald du Schritt 1 und 2 gemacht
hast, dann kann ich dich durch den Rest lotsen.

## So funktioniert das CMS danach

- Auf `/admin/` einloggen.
- „Artikel" öffnen, auf „Alle Artikel" klicken. Jeder Artikel ist ein
  Eintrag mit Feldern für Titel, Datum, Status, Teasertext und
  Artikeltext. Neuen Eintrag hinzufügen mit dem „+"-Knopf, bestehenden
  bearbeiten durch Anklicken.
- „Live-Blog" funktioniert genauso, nur mit weniger Feldern.
- Fotos werden direkt im CMS hochgeladen (Bildfeld beim Bearbeiten) und
  landen automatisch im `images/`-Ordner.
- Jede Änderung, die du auf „Veröffentlichen" klickst, aktualisiert die
  Website automatisch innerhalb von ein bis zwei Minuten.

## Ein Porträtfoto auf der Über-mich-Seite einsetzen

Das läuft (vorerst) noch nicht über das CMS, weil die Über-mich-Seite
reiner Text ist. So geht's:
1. Foto in den Ordner `images/` hochladen (z. B. über GitHub direkt im
   Browser, oder wie in der vorherigen Anleitung beschrieben).
2. In `ueber-mich.html` die Zeile mit `class="photo-slot"` suchen (ein
   Kommentar direkt darüber erklärt es) und durch
   `<img class="portrait" src="images/dein-dateiname.jpg" alt="Porträtfoto von Lisa Horn">`
   ersetzen.

## Struktur der Website

- `index.html`, `live-blog.html`, `methodik.html`, `ueber-mich.html`,
  `kontakt.html`, `artikel-detail.html` — die sichtbaren Seiten
- `data/articles.json`, `data/blog.json` — die Inhalte, die du über
  das CMS bearbeitest
- `admin/` — das Redaktionssystem selbst, nicht anfassen
- `css/style.css` — das gesamte Design
- `js/main.js` — lädt die Inhalte aus den JSON-Dateien und baut daraus
  die Seiten

## Design-Hinweis

Das Konzept ist der Eisberg: Sichtbares (veröffentlichte Artikel) und
Verborgenes (laufende Recherchen im Live-Blog) werden bewusst als
Gegensatz inszeniert — dunkler Hero „unter Wasser", darunter die helle,
veröffentlichte Oberfläche. Streng schwarz/weiß, keine Farbakzente.
