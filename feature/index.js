var Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;
var OptionOrPrompt = require('yeoman-option-or-prompt');

module.exports = class extends Generator {

  constructor(args, options) {
    super(args, options);
    this.optionOrPrompt = OptionOrPrompt;
  }

  async prompting() {
  
    const input = await this.optionOrPrompt([           
      {
          type: "input",
          name: "featureName",
          message: "Enter feature name",
          default: this.options.name
      },
      {
        type: "input",
        name: "modelName",
        message: "Enter model name",
        default: this.options.name
    }
    ]);

    this.props = extend(this.props, input);
  }

 get writing() {
  return {
    appStaticFiles() {
      const src = this.sourceRoot() + '/**';
      const dest = this.destinationPath(this.props.featureName);

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
        featureName: this.props.featureName
      };

      files.forEach(f => {
        this.fs.copyTpl(
          this.templatePath(f),
          this.destinationPath(`${this.props.featureName}/${f}`),
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
  default() {
    console.log(this.props);
    
    this.composeWith(require.resolve('../model'), {
        modelName: this.props.modelName
    });
  
  }


  paths() {
    console.log("feature source root:", this.sourceRoot());
     // returns './templates'
 
     console.log("feature dest path:", this.templatePath('index.js'));
     // returns './templates/index.js'
   }

};