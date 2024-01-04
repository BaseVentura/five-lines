# 1.Methode extrahieren
Kann angewendet werden, wenn eine Methode zu lange ist bzw. der Code Smell zu viel Verantwortung auftritt. Wird verwendet, wenn folgende Regeln verletzt werden

## Regel - 5 Zeilen
Eine Funktion sollte eine festgelegte Länge nicht überschreiten

### Vorgehen:
1. Bereich identifizieren und mit Leerzeichen vom Rest des Codes abheben. Ggf. Kommentar einfügen
2. Neue Leere Methode erstellen
3. Neue methode über markierten Bereich aufrufen
4. Markierten Code ausschneiden und in der neuen Mehtode einfügen
5. Durch Compiler helfen lassen und fehlende Parameter hinzufügen

## Regel - aufrufen oder Übergeben
Eine Funktion sollte entweder Funktionen an einem Objekt aufrufen oder dieses als Argument übergeben. 
Das soll verhindern, dass Abstraktionsebenen vermischt werden und die Lesbarkeit des Codes nachlässt.

## Regel - "if" nur am Anfang
Falls es eine If-Anweisung gibt sollte diese am Anfang der Funktion stehen
Soll den Geruch von zuviel Verantwortung verhindern

## Regel - Benutze niemals "if" mit "else"
Mit if else treffen wir fest verdratetet Entscheidungen und verlieren an Flexibilität.
if -> Prüfung 
if-else -> Entscheidung

### Geruch - Frühe Bindung
Durch ein if-else Binden wir uns schon zur Compiletime und verhidnert damit erweiten durch Komposition
Kann zum Beispiel durch das refactoring type codes durch klassen ersetzen erreicht werden.