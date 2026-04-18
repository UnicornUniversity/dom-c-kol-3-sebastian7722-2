[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/TGjPX3a8)
**Toto je základní kód k úkolu 3 z BSDE (Základy softwarového vývoje) pro distanční studium v češtině.**

Zadání úkolu je [zde](https://github.com/UnicornUniversity/BSDE-DS-Assignment3/blob/master/BSDE%202025%20Summer%20Zad%C3%A1n%C3%AD%20dom%C3%A1c%C3%AD%20%C3%BAkol%20_%20homework%20assignment%2003.pdf): 

**Pro odevzdání je nutné úkol odevzdat**:

1) Kód sem na GitHub
2) Návrh algoritmu na Homework Solution
3) Na Plus4U přes tlačítko odevzdat

**Poznámky k úkolu:**
- Prosím dejte si pozor na to, že je nutné přesně dodržet strukturu ze zadání.
- Také je nutné **generovat náhodné datum tak, aby generovaný věk osob byl ve zvoleném intervalu**. Testy kontrolují přesnost až na ms, naštěstí vám ovšem nechávám přibližně měsíc jako polovenou odchylku :)
- Věk v intervalu zde bereme přísně matematicky. Pro věk Z z intervalu <X, Y> platí:X <= Z <= Y. Všechna čísla jsou reálná. **Tzn. pro interval věku <18, 60> osoby ve věku 17 let a 11 měsíců, i 60 let a 1 měsíc jsou mimo interval.**
- Pokud jste se během implementace ztratili v podmínkách různých dnů, let a měsíců, zkuste si připomenout, jak jste podobné slovní úlohy s časem řešili na základní/střední škole.
- Průměrný rok má přibližně 365.25 dne, vyšší přesnost je vzhledem k vysoké povolené odchylce zbytečná.

**Jak postupovat v úkolu:**
1) Editujete hlavně soubor main.js.
2) Úkol musí být spouštěn fukncí main(dtoIn).
3) Je výrazně doporučeno úkol rozdělit do více podfunkcí, aby se zabránilo nepřehlednosti kódu. Ta je také bodována.
4) Pokud chcete, můžete importovat funkce z jiných souborů (naznačeno na druhém řádku). Použijte pro to složku src.
5) Kód je automaticky otestován po každé operaci Push. Pokud chcete, můžete si spustit testování lokálně - je třeba pro to nainstalovat NPM. Následně v příkazovém řádku ve složce projektu nainstalujete moduly přes "npm install" a spustíte testování přes "npm test".
6) Přepisování testů a nebo způsobu spouštění aplikace (složka test, .git nebo soubor package.json) není povoleno. Pokud k tomu dojde, neznamená to, že úkol nebude hodnocen. Ale přiděláte mi tím práci.
