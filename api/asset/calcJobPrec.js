const fs = require('fs');

class Jobitgenderprecentage {
    //index 1 is aantal index 2 is aantal it jobs
    constructor(fileName) {
        this.hoeveelJongens = 0;
        this.hoeveelMeisjes = 0;
        this.hoeveelMeisjesBaan = 0;
        this.hoevelJongensBaan = 0;
        this.fileName = fileName;
    }
    _readFile() {
        let rawData = fs.readFileSync(this.fileName);
        let rawDataParsed = JSON.parse(rawData);
        return rawDataParsed;
    }
    calculateBoys() {
        const data = this._readFile();
        data["Jongens"].forEach((element, index) => {
            if (data["Jongens"][index].heeftITbaan) {
                this.hoevelJongensBaan++;
            }  
            this.hoeveelJongens++;
        });
        return (this.hoevelJongensBaan/this.hoeveelJongens)*100;
    }

    calculateGirls() {
        const data = this._readFile();
        data["Meisjes"].forEach((element, index) => {
            if (data["Meisjes"][index].heeftITbaan) {
                this.hoeveelMeisjesBaan++;
            }  
            this.hoeveelMeisjes++;
        });
        return (this.hoeveelMeisjesBaan/this.hoeveelMeisjes)*100;
    }

    calculateOriginPrecentageIT() {
        //local vars
        const data  = this._readFile();
        let amountNationalitys = 0;
        let amountNationalityITJob = 0;
        let UniqueCountrys = [];
        let countryITJob = [];
        let occurencesCountries = [];
        data["Jongens"].forEach((element, index) => {
            if (data["Jongens"][index].heeftITbaan) {
                countryITJob.push(data["Jongens"][index].afkomst);
                amountNationalityITJob++;
            }
            amountNationalitys++;
        });
        data["Meisjes"].forEach((element, index) => {
            if (data["Meisjes"][index].heeftITbaan) {
                countryITJob.push(data["Meisjes"][index].afkomst);
                amountNationalityITJob++;
            }
            amountNationalitys++;
        });

        countryITJob.forEach((element, index) => {
            if (!(UniqueCountrys.includes(element))) {
                UniqueCountrys.push(element);
            }
        });
                
        for (let i = 0; i < UniqueCountrys.length; i++) {
            occurencesCountries.push(countryITJob.reduce((n, x) => n + (x === UniqueCountrys[i]), 0));
        }

        let precentageorigin = [];
        for (let i = 0; i < UniqueCountrys.length; i++) {
            precentageorigin.push((occurencesCountries[i]/amountNationalityITJob)*100);
        }
        let relevantInformation = {
            verschillendeLanden: UniqueCountrys,
            precentageITland: precentageorigin,
            totaallandenIT: amountNationalityITJob
        }
        return relevantInformation;
    }

}

module.exports = Jobitgenderprecentage;