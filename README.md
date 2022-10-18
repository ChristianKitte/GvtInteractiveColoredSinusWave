![image](https://user-images.githubusercontent.com/32162305/150810942-99672aac-99af-47ea-849b-ba263fae0c3f.png)

---

**Graphical Visualisation Technologies**

**Dozent: Prof. Dr. Felix Gers (Berliner Hochschule für Technik)**

**Studiengang Medieninformatik Online MA, Wintersemester 2022/23**

**University of Applied Sciences Emden/Leer, Faculty of Technology, Department of Electrical Engineering and
Informatics**

---

### Einsendeaufgabe EA3 : 2D-Geometrie aus farbigen Dreiecken.

[zur Webseite](https://gvt.ckitte.de/ea3/)

Im Rahmen der zweiten Einsendeaufgabe sollt eine 2D-Geometrie aus Dreiecken erzeugt und mittels WebGL dargestellt werden. 

Für meine Abgabe verwende ich als Basis meine vorherige Abgabe. Nach wie vor wird eine dynamisch änderbare  Sinuswelle fest über 90 berechnete Punkte ausgegeben. Mit den unten eingestellten Werten wird so eine vollständige Sinusschwingung ausgegeben. Die Sinuswelle wird hierbei durch Säulen dargestellt, welche jeweils mit Hilfe zweier Dreiecke erzeugt werden. Um dies zu verdeutlichen, werden die zwei Dreiecke jeder Säulen unterschiedlich eingefärbt.

![](assets/2022-10-16-13-22-08-image.png)

Die Sinuswelle kann anhand von drei Parametern verändert werden.  Mit Startwinkel wird der erste Winkel festgelegt, mit Amplitude erfolgt eine Skalierung des Funktionswertes. Die Auflösung ändert die Breite der verwendeten Balken und somit die Auflösung. Der Resetbutton stellt die anfänglichen Werte wieder her.

![](assets/2022-10-16-13-33-35-image.png)

Als Startseite dient wie üblich eine **index.html**. Die Datei **main.css** enthält alle benötigten Klassen, um die Grafik einfach einzubinden. In der Datei **layout.css** wird das Layout der Webseite selbst festgelegt. Daneben kommt Bootstrap für die Buttons zum Einsatz. Die gesamte Logik der Anwendung befindet sich in der Datei **main.js**.

Der Canvas als zentrales Ausgabeobjekt wurde in der Index.html angelegt und mit einer fixen Breite von 1000px belegt. Alle anderen Einstellungen erfolgen über CSS.
