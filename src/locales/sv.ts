export default {
    root: {
        welcome: 'Välkommen till SIOX Smoke Control Setup',
        newSystem: 'Nytt system',
        showInstructions: 'Visa instruktioner',
        wantToImportOld: `Aktivera knappar för import frpn SX:ACCESS (.scp) filer: `,
        manageProjects: 'Hantera projekt',
        newProject: 'Nytt projekt',
        getProject: 'Hämta projekt',
        saveProject: 'Spara projekt',
        exportToCentralUnits: 'Exportera till SX:ACCESS fil(er)',
        validateProject: 'Validera projektet',
        orderModules: 'Beställ moduler',
        system: 'System (centralenheter)',
        new: 'Ny',
        edit: 'Ändra',
        remove: 'Ta bort',
        importDampers: 'Importera spjäll',
        importAlarmInputs: 'Importera larmingångar',
        importFromFile: 'Importera från fil',
        importFromCentralUnitFile: 'Importera från SX:ACCESS-fil',
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
            fields: {
                type: 'Typ',
                fireCells: 'Brandceller',
                group: 'Grupp',
                address: 'Adress',
            },
        },
        fireCells: {
            name: 'Brandcell |||| Brandceller',
            fields: {
                fireDampers: 'Brandspjäll',
            },
        },
        modules: {
            name: 'Module |||| Moduler',
            fields: {
                type: 'Typ',
                settings: 'Inställningar',
            },
        },
        alarms: {
            name: 'Larm |||| Larm',
            fields: {
                module: 'Modul',
            },
        },
    },
}