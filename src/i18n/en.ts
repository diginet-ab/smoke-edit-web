export default {
    root: {
        welcome: 'Welcome to SIOX Smoke Control Setup',
        newProject: 'New system',
        showInstructions: 'Show instructions',
        wantToImportOld: `Check this box if you want to import existing SX:ACCESS (.scp) files: `,
        instructions: `
        <h3>Instructions</h3>
        <p/>
        Create a new project or retrieve a saved project from your computer. A project can contain multiple systems, each with an SX:ACCESS or SX:NETLINK, for example, for floors or properties.
        <p/>
        Then import fire dampers from Excel or CSV (delimited text). Alternatively, add individual fire dampers under the main menu <b>Fire Dampers</b> on the far left.
        <p/>
        The list of fire compartments is automatically updated from the fire compartments the dampers belong to.
        <p/>
        Alarm inputs can be imported from Excel or CSV (delimited text). Alternatively, add individual alarm inputs under the main menu <b>Alarm</b> on the far left.
        <p/>
        <b>NOTE:</b> Regularly save the project to your computer using the <b>SAVE PROJECT</b> button.
        <p/>
        When the project is complete, documentation for ordering can be created using the <b>ORDER MODULES</b> button.
        At that time, files for the control units (SX:ACCESS) can also be saved to the computer with <b>EXPORT TO SX:ACCESS FILE</b>.
        <p/>
        Then use the PC tool <b>SIOX Smoke Editor</b> to download to the devices. In this tool, any advanced settings can also be made.
        <p/>
    `,
    }
}