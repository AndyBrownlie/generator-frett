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
/*
  get writing() {
    return {
      appStaticFiles() {
        const src = this.sourceRoot() + '/**';
        const dest = this.destinationPath(this.featureName);

        const files = [
          'index.ts',
        ];

        const copyOpts = {
          globOptions: {
            ignore: [],
          },
        };

        this.fs.copy(src, dest, copyOpts);
        this.fs.copy(this.templatePath('.*'), dest, copyOpts);

        const opts = {
          name: this.featureName
        };

        files.forEach(f => {
          this.fs.copyTpl(
            this.templatePath(f),
            this.destinationPath(`${this.featureName}/${f}`),
            opts,
            copyOpts
          );
        });
      }
    }
  }
*/
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