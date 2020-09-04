import { Rule,  externalSchematic, chain,  } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function myCustomMaterialTheme(options: any): Rule {
  // return async (host: Tree, _context: SchematicContext) => {
  return async () => {
    return chain([
      externalSchematic('@angular/material', 'material-shell', {
        project: options.project
      })
    ]);
  };
}
