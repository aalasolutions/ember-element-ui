'use strict';
const path = require('path');
const fs = require('fs');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: require('./package').name,
  normalizeEntityName: function () {},

  beforeInstall() {
    // Add addons to package.json and run defaultBlueprint
    return this.addAddonsToProject({
      // a packages array defines the addons to install
      packages: [
        // name is the addon name, and target (optional) is the version
        { name: 'ember-cli-sass' },
        { name: 'ember-moment' },
      ],
    });
  },
  afterInstall() {
    var importStatement = '\n@import "ember-element-ui";\n';
    var stylePath = path.join('app', 'styles');
    var file = path.join(stylePath, `app.scss`);

    if (!fs.existsSync(stylePath)) {
      fs.mkdirSync(stylePath);
    }

    if (fs.existsSync(file)) {
      this.ui.writeLine(`Added import statement to ${file}`);
      this.insertIntoFile(file, importStatement, {});
    } else {
      fs.writeFileSync(file, importStatement);
      this.ui.writeLine(`Created ${file}`);
    }

    this.addAddonsToProject({
      packages: [{ name: 'ember-font-awesome', target: '^4.0.0-rc.4' }],
    });

    return this.addPackagesToProject([
      { name: '@element-plus/theme-chalk', target: '^2.2.16' },
      { name: 'popper.js' },
      { name: 'normalize.css' },
    ]);
  },

  included() {
    this._super.included.apply(this, arguments);
    this._ensureFindHost();

    var popperPath = path.join('node_modules', 'popper.js', 'dist', 'umd');

    var host = this._findHost();

    host.import({
      development: path.join(popperPath, 'popper.js'),
      production: path.join(popperPath, 'popper.min.js'),
    });

    host.import({
      development: path.join(popperPath, 'popper-utils.js'),
      production: path.join(popperPath, 'popper-utils.min.js'),
    });

    host.import(path.join('node_modules', 'normalize.css', 'normalize.css'));
    host.import(path.join('node_modules', 'animate.css', 'animate.css'));

    host.import(
      path.join('node_modules', 'popper.js', 'dist', 'umd', 'popper.js')
    );
    host.import(
      path.join('node_modules', 'popper.js', 'dist', 'umd', 'popper-utils.js')
    );

    host.import(
      path.join('node_modules', '@element-plus', 'theme-chalk', 'dist', 'display.css')
    );
  },

  treeForStyles: function () {
    var host = this._findHost();

    if (host.project.findAddonByName('ember-cli-sass')) {
      return new Funnel(
        path.join('node_modules', '@element-plus', 'theme-chalk', 'src'),
        {
          destDir: 'ember-element-ui',
        }
      );
    }
  },

  _ensureFindHost() {
    if (!this._findHost) {
      this._findHost = function findHostShim() {
        var current = this;
        var app;

        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));

        return app;
      };
    }
  },
};
