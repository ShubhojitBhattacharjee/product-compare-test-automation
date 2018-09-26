# Puppeteer Example - Product Compare Page Test Automation

Problem statement
-
- [ ] Given is a simple react example application to compare products
- [ ] Write all possible test scenario that needs testing for this app in a spread sheet
- [ ] Write a detailed manual Test Cases for only 2 out of the above written Test scenario
- [ ] Automate the above 2 manual Test Cases using puppeteer and jest


Solutions
- 
- [ ] Test Cases are in PDF file inside folder **integration_tests** with name "_**Test Scenario and Test Cases.pdf**_"
- [ ] The 2 detailed Test Cases are Automated using puppeteer as an automation tool and jest as testing framework
- [ ] Refer to **integration_tests** folder inside the project root folder for the complete puppeteer automation test framework
- [ ] A special class `StepLogger` has been used to log the exact test case steps as mentioned in the Test Case section in the PDF
- [ ] HTML report of test execution with name '**test-report.html**' is generated inside the folder **integration_tests**


Instructions to setup the repo and run the Puppeteer tests
-
- [ ] In root folder install the npm dependencies:
`npm install`

- [ ] In case of error during npm install, install windows dev tools by: 
`npm install --global windows-build-tools`
Re-run `npm install` after this

- [ ] After the dependencies have been installed, start the web-app by:
`npm start`

- [ ] cd to folder **integration_tests** and install npm dependencies by:
`npm install`

- [ ] Run test cases located in **`__tests__`** folder by:
`npm test`

- [ ] Test execution report '**test-report.html**' is generated inside the folder **integration_tests** 
