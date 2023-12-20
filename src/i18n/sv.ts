export default {
    root: {
        welcome: 'Välkommen till SIOX Smoke Control Setup',
        newProject: 'Nytt system',
        showInstructions: 'Visa instruktioner',
        wantToImportOld: `Om du vill kunna importera från befintliga filer för SX:ACCESS (.scp) markera här: `,
        instructions: `
    <h3>Instruktioner</h3>
    <p/>
    Skapa ett nytt projekt eller hämta ett sparat projekt från din dator. Ett projekt kan innehålla flera system med vardera en SX:ACCESS eller SX:NETLINK, till exempel för våningsplan eller fastigheter.
    <p/>
    Importera sedan brandspjäll från Excel eller CSV (avgränsad text). Alternativt lägg till enstaka brandspjäll under huvudmenyn <b>Brandspjäll</b> längst till vänster.
    <p/>
    Listan med brandceller uppdateras automatiskt från de brandceller spjällen tillhör.
    <p/>
    Larmingångar kan importeras från Excel eller CSV (avgränsad text). Alternativt lägg till enstaka larmingångar under huvudmenyn <b>Larm</b> längst till vänster.                    
    <p/>
    <b>OBS:</b> Spara projektet regelbundet på din dator med knappen <b>SPARA PROJEKT</b>.
    <p/>
    När projektet är komplett kan underlag för beställning skapas med knappen <b>BESTÄLL MODULER</b>.
    Då kan även fil(er) för centralenheterna (SX:ACCESS) sparas till datorn med <b>EXPORTERA TILL SX:ACCESS-FIL</b>.
    <p/>
    Använd sedan PC-verktyget <b>SIOX Smoke Editor</b> för att ladda ner till enheterna. I det verktyget kan även eventuella avancerade inställningar göras.
    <p/>
    `
    },
    resources: {
        fireDampers: {
            name: 'Brandspjäll',
        },
        fireCells: {
            name: 'Brandcell |||| Brandceller',
        },
        modules: {
            name: 'Module |||| Moduler',
        },
        alarms: {
            name: 'Larm |||| Larm',
        },
    },
}