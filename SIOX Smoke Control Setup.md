# SIOX Smoke Control Setup

`Version 2023-12-20`

Configure Smoke Control systems online with the SIOX Smoke Control Setup web app.

The web app creates SIOX Smoke Control project files that can be downloaded to the SX:ACCESS central units using a simplified interface for the existing Smoke Edit Windows application.

The web application can be accessed at https:// sioxsolutions.com/siox-smoke-edit-online but is also installed for offline use as a Windows service together with the new version of SIOX Smoke Editor. 

## Web server

This first version does not require any backend functionality and can simply be served by web servers such as Apache or NGINX.

The user must regularly save the project file on his/her local system. To continue editing the project later this file must be opened again.

Future versions may add backend functionality with user login and "cloud" storage.

### Login

There is a login page with default username: `siox` and password: `smokecontrol`. There is an inactivity timeout that logs out the user to prevent unauthorized access.

## App overview

### Top bar

![image-20231220012217067](.\doc-images\image-20231220012217067.png)

To the left is the main menu and to the right a user menu with logout. There are also buttons for language, refresh and dark/light mode.

### Menu

<img src=".\doc-images\image-20231220213535766.png" align="left" alt="image-20231220213535766" />

The start menu is used to create, load and save projects and for importing and exporting data. There is also a button for ordering modules here.

The other menus show list views of the different items in the project. The list of fire cells is calculated from the dampers fire cell value (one or more fire cell ID:s).

## Start page

<img src=".\doc-images\image-20231220012644189.png" align="left" style="border: 1px solid  gray;" alt="image-20231220012644189" />

The start page contains all necessary user instructions. These can be minimized to save space when not needed anymore.

There are a number of "cards" further down on the start page.

### Project management

![image-20231220013124675](.\doc-images\image-20231220013124675.png)

There are buttons for creating, opening, saving a project and for importing data. Also for validating the project and for ordering modules.

The project file for SIOX Smoke Control Setup uses a new JSON format with support for multiple central units.

The central unit(s) can be exported to Smoke Edit file(s) (.scp) for later download to SX:ACCESS.

In future version direct upload to all SX:ACCESS units may be added.

### Systems (central units)

![image-20231220013209204](.\doc-images\image-20231220013209204.png)

Create and edit central units. Select a central unit here for import of dampers and alarm inputs.

- Function test interval
- IP settings
- Language
- Watchdog

### Import fire dampers

![image-20231220013243501](.\doc-images\image-20231220013243501.png)

Import fire dampers to the selected central unit from Excel or CSV.

- Module type
- Damper(s) ID
- Detector ID
- Module address
- Fire cell(s)

### Import alarm inputs

![image-20231220013312437](.\doc-images\image-20231220013312437.png)

Import alarm inputs to the selected central unit from Excel or CSV.

- Fire alarm input(s)

## List views

Separate list views can be used to view fire dampers, used fire cells, alarm inputs and used SIOX modules.

There is a flexible search function.

## Simplified upload to central unit

#### Mark project file for "simplified upload"

Mark the file with attribute `QuickUpload=true`.

## Testing and simulation

## User documentation

## Security

All end points are protected by HTTPS TLS encryption and login supports two-factor authentication.

## Development

### React and Typescript

### Web app

#### Offline application

The application can be installed as a single user application with a NodeJS program running as a service.

The user starts the application from the Windows Start Menu, launching the default web browser on localhost.

### Smoke Edit Normal view (upload)

#### Simplified upload to central unit

When the Smoke Control `.scp` file includes the attribute `QuickUpload=true`  Smoke Edit displays a simplified user interface with buttons for `Upload to central unit`, `Edit project` and `Exit`. The `Edit Project` button opens the full Smoke Edit view.

### Smoke Edit Advanced view (same as now)

## Future development

### Direct upload from web app

Compile and upload directly to central units in the local network via a service that is installed together with the new version of Smoke Edit.

### User accounts in the "cloud"

Create or login to user accounts with storage of multiple projects for each user in a Profcon server.

## Versions

Version 1	2023-12-20	First version