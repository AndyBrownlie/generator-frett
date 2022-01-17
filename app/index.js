var Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;
var OptionOrPrompt = require('yeoman-option-or-prompt');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.optionOrPrompt = OptionOrPrompt;
  }

  async prompting() {
  
    const input = await this.optionOrPrompt([           
      {
        type: "input",
        name: "appName",
        message: "Enter app name",
        default: this.appname
      },
      {
          type: "input",
          name: "featureName",
          message: "Enter feature name",
      }
    ]);

    this.props = extend(this.props, input);
  }

  default() {
    console.log(this.props);
    
    this.composeWith(require.resolve('../feature'), {
        featureName: this.props.featureName
    });
  
  }

  get writing() {
    return {
      appStaticFiles() {
        const src = this.sourceRoot() + '/**';
        const dest = this.destinationPath(this.props.appName);

        const files = [
          'index.ts',
        ];

        const copyOpts = {
          globOptions: {
            ignore: [],
          },
        };
/*
        if (this.specification === 'openapi_3') {
          copyOpts.globOptions.ignore.push(src + '/server/common/swagger.js');
          copyOpts.globOptions.ignore.push(src + '/server/common/api.v2.yml');
        } else {
          files.push('server/common/api.v2.yml');
          copyOpts.globOptions.ignore.push(src + '/server/common/api.yml');
        }
        if (!this.docker) {
          copyOpts.globOptions.ignore.push(
            src + '/+(Dockerfile|.dockerignore)'
          );
        }
*/
        this.fs.copy(src, dest, copyOpts);
        //this.fs.copy(this.templatePath('.*'), dest, copyOpts);

        const opts = {
          appName: this.props.appName
        };

        files.forEach(f => {
          this.fs.copyTpl(
            this.templatePath(f),
            this.destinationPath(`${this.props.appName}/${f}`),
            opts,
            copyOpts
          );
        });
/*
        this.fs.move(
          this.destinationPath(`${this.name}`, 'gitignore'),
          this.destinationPath(`${this.name}`, '.gitignore')
        );
        if (this.specification !== 'openapi_3') {
          this.fs.move(
            this.destinationPath(`${this.name}`, 'server/common/api.v2.yml'),
            this.destinationPath(`${this.name}`, 'server/common/api.yml')
          );
        }
  */
      },
    };
  }


  paths() {
   console.log("app source root:", this.sourceRoot());
    // returns './templates'

    console.log("app dest path:", this.templatePath('index.js'));
    // returns './templates/index.js'
  }


}