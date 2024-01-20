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

### Refactoring - TypeCodes durch Klasse ersetzen

### Refactoring - Code in Klasse schieben
Fortsetzung von TypeCodes durch Klasse ersetzen.
Hilft Invarianten zu lokalisieren, das es Logik in die Zugehörige Klasse schiebt und damit den Code näher an die Daten.

#### Vorgehen
1. Funktion in die entsprechenden Klassen kopieren und damit zur Methode machen.
2. this einbauen und Überflüssigen Parameter entfernen
3. Methode in Interface kopieren und einen neuen Namen geben -> führt zu Kompilierfehlern in Klassen die wir noch nicht bearbeitet haben
4. Klasse bearbeiten
  a. Intefriere Methoden, die eine Konstante zurück geben
  b. Schritte ausführen deren Ergebnis jetzt schon bekannt ist. Bsp. 'if(true)' und 'if(false)' entfernen
  c. Methode umbenen um Kompiler zufrieden zu stellen

### Refactoring - Methode integrieren
Sinnvoll, wenn die Methode sehr klein ist. Hier werden die Methoden aufrufe durch deren Rumpf ersetzt und die Methode selbst dann anschliessend entfernt.

## Regel - verwende neimals Switch
Promleme sind hier der default fall und die Fallthrough logik. Als Ausmahme könnene wir beides verhindern indem wir in jedem fall returnen und dadurch kein Break brauchen und es keinen default Fall gibt -> assertExhausted

## Regel - Erbe nur von Interfaces
Wir könnten eigentlich statt des ganzen doppelten Codes auch eine abstrakte Klasse verwenden und von dieser Erben. Der Vorteil vom Interface ist, dass wir gezwungen werden uns Gedanken zu machen und die Methoden erneute zu implementieren sobald wir eine weitere Klasse implementieren. Wir erweitern also durch hinzufügen. -> Komposition gegenüber Vererbung 

### Refactoring - Klassen zusammenführen
- Immer wenn wir mehrere Klassen haben die sich nur durch Konstante Methoden unterscheiden können wir diese zusammenführen. -> Methoden die einen Konstanten wert zurückgeben.
- Die Konstanen Methoden bilden die Basis unserer Klassen - eine Basis mit zwei Methoden -> Zweierbasis
-  Die Menge der Klassen die wir zusammen führen können hängt mit der Größe der Basis zusammen: Um x Klassen zusammenzuführen darf unsere Basis nicht mehr als x-1 sein.

#### Vorgehen
1. Unterschiedliche Methoden angleichen
  a. Rumpf aller Methoden aller Klassen mit if(true) umgeben
  b. true durch ausdruck der alle Methoden der Basis aufruft und ihren Rückgabewert mit einer Konstante vergelicht. 
  c. Rumpf jeder Methode in kopieren und in jede anderen implementierung einfügen.

2. Basismethoden anpassen indem wir für jede Basismethode im Konstruktor ein neuen Feld einführen und dieses in der Basismethode zurückgeben statt der Konstante. 

3. Doppelte Klassen löschen. 

### Refactoring "Strategy einführen"
- Strategy ist ein Entwurfsmuster, dß varianz einführt indem wir eine weitere Klasse instanziieren.
- Strategy Klassen enthalten selten neue Methoden wenn sie geschrieben wurden
- Sinnvoll um Code aus Klassen rausziziehen um Logik zu betonen oder um Varianz zu schaffen.
