//import log4js from 'log4js'
const chalk = require('chalk');

class StepLogger {
  constructor(debug) {
    if (debug === void 0) {
      debug = process.env.DEBUG || true
    }
    this.debug = debug
    this.stepIdVar = ''
    this.logMessages = ''
    this.id = 0
  }

  set caseId(theCaseId) {
    this.testCaseId = theCaseId
    //this.logger = log4js.getLogger(`C${theCaseId}`)
    //this.logger.debug(this.logMessages)
    this.id = 1
    this.logMessages = ''
  }

  step(stepName) {
    let operation = 'Step Description'
    if (this.testCaseId) {
      // this.stepId();
      operation = 'Step'
    }
    this.commonLogger(operation, stepName)
  }

  stepId(optionalId) {
    if (optionalId === void 0) {
      optionalId = 0
    }
    this.id = optionalId > 0 ? optionalId : this.id + 1
    this.commonLogger('Step Id', this.id.toString())
  }

  commonLogger(operation, step) {
    const message = `${this.stepIdVar}- *${operation}* - ${step}`
    if (this.debug) {
      console.log(chalk.green(
        `${this.testCaseId || ''}${message}`
      ))
    }
    /*if (!process.env.NO_ALLURE) {
      // tslint:disable-next-line:no-empty
      allure.createStep(message, () => {
      })()
    }
    if (this.logger) {
      this.logger.debug(message)
    }
    else {
      this.logMessages += message
    }*/
  }

  verification(verificationDescription) {
    this.commonLogger('Verification', verificationDescription)
  }

  /**
   * Called for any precondition related step-log shown towrds Spec file, never used anywhere else such as validation/helper
   * @param {string} preConditionDescription
   */
  preCondition(preConditionDescription) {
    this.commonLogger('Pre-Condition', preConditionDescription)
  }

  postCondition(postConditionDescription) {
    this.commonLogger('Post-Condition', postConditionDescription)
  }

  /**
   * Called wherever a helper/validation method need to have a step/action step significant enough to log
   * @param {string} stepName
   */
  subStep(stepName) {
    this.commonLogger('Sub-Step', stepName)
  }

  /**
   * Called wherever a helper/validation method need to have a verification step significant enough to log
   * @param {string} verificationDescription
   */
  subVerification(verificationDescription) {
    this.commonLogger('Sub-Verification', verificationDescription)
  }
}

export default StepLogger
