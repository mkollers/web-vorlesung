## Anleitung

### Versionen
Diese Seite basiert auf verschiedenen Versionen die während der Vorlesung gezeigt worden sind. Um die verschiedenen Stände zu bekommen, müssen diese mit Hilfe von Git ausgecheckt werden. Dies Versionen werden Tags genannt. Folgende Tags existieren:
- no-style
- inline-style
- css

Um ein Version abzurufen muss der entsprechende Tag ausgecheckt werden. Dies kann über folgenden Kommandozeilenbefehl erreicht werden (ohne geschweifte Klammern):  
```git checkout {{tag}}```

### Starten der Seite
Grundsätzlich lässt sich die HTML-Datei einfach mit einen Browser öffnen. In der Version mit CSS wird es dabei allerdings zu dem Problem kommen, dass die CSS-Datei nicht geladen werden kann. Dafür wird ein Web Server benötigt. 

Die einfachste Möglichkeit einen kleinen abgespeckten Webserver zu starten kann mit Hilfe eines NPM-Pakets realisiert werden. Dafür muss NodeJS und NPM auf dem Gerät installiert sein. Sofern diese Tools installiert sind kann über folgenden Befehl ein Web-Server installiert werden:  
```npm i -g http-server```  

Durch diesen Befehl wird im User-Verzeichnis ein Web-Server installiert und im Betriebssystem registriert, sodass über den Befehl ```http-server``` auf der Kommandozeile ein Web-Server gestartet wird. Öffnen nun eine Kommandozeile im aktuellen Verzeichnis und tippt den Befehl ```http-server``` ein. Darauf hin könnt ihr unter http://localhost:8080 die Seite aufrufen.