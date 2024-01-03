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
Soll den Geruch von zuviel Verantwortung verhindern