# 1.Methode extrahieren
Kann angewendet werden, wenn eine Methode zu lange ist bzw. der Code Smell zu viel Verantwortung auftritt.
## Vorgehen:
1. Bereich identifizieren und mit Leerzeichen vom Rest des Codes abheben. Ggf. Kommentar einfügen
2. Neue Leere Methode erstellen
3. Neue methode über markierten Bereich aufrufen
4. Markierten Code ausschneiden und in der neuen Mehtode einfügen
5. Durch Compiler helfen lassen und fehlende Parameter hinzufügen


# 2. Funktion Teilen um Abstraktionsebenen zu trennen
## Regel - aufrufen oder Übergeben
Eine Funktion sollte entweder Funktionen an einem Objekt aufrufen oder dieses als Argument übergeben. 
Beheben durch Methode extrahieren