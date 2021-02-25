const express = require('express');
const Jobprecentage = require('../asset/calcJobPrec');

const router = express.Router();

const jobPrecentage = new Jobprecentage('./data/jobs.json');

let jobminimalRequirements = {
    ervaring: '3',
    diploma: ["hbo", "wo"],
    motivated: 'ja'
};


//TOOO het laten zien dat je niet eengenomen bent op scherm


function isoptimal(ervaring, diploma, motivatie, gender, origin) {
    let approved = 0;
    let orginITPrecentage = jobPrecentage.calculateOriginPrecentageIT();
    let boysPrecentage = jobPrecentage.calculateBoys();
    let girlsPrecentage = jobPrecentage.calculateGirls();
    let CountryWithMostIT = orginITPrecentage.verschillendeLanden[orginITPrecentage.precentageITland.indexOf(Math.max(...orginITPrecentage.precentageITland))];
    let genderminderkansVROUW = null;

    if (boysPrecentage >= 75) {
        genderminderkansVROUW = true;
    } else if (girlsPrecentage >= 75) {
        genderminderkansVROUW = false;
    }
    
    if (orginITPrecentage.precentageITland[orginITPrecentage.precentageITland.indexOf(Math.max(...orginITPrecentage.precentageITland))] >= 75) {
        console.log(origin, CountryWithMostIT);
        console.log(origin != CountryWithMostIT);
        if (origin != CountryWithMostIT) {
            approved -= 20;
        }
    }
    if (parseInt(ervaring, 10) >= jobminimalRequirements.ervaring) {
        approved += 60;
    }

    //Senior Specialit bonus
    if (parseInt(ervaring, 10) >= 10) {
        approved += 26;
    }

    if (diploma == jobminimalRequirements.diploma[0] || diploma == jobminimalRequirements.diploma[1]) {
        approved += 30;
    }

    if (motivatie == jobminimalRequirements.motivated) {
        approved += 20;
    }

    // if (genderminderkansVROUW && gender == 'vrouw') {
    //     approved -= 30;
    // } else if (genderminderkansVROUW == false && gender == 'man') {
    //     approved -= 30;
    // };

    return approved;
}

router.post('/', (req,res) => {
    let approveRate;
    approveRate = isoptimal(req.body.ervaring, req.body.diploma, req.body.motivated, req.body.gender, req.body.origin);
    if (approveRate >= 90) {
        res.send({
            aangenomen: true
        });
    } else {
        res.send({
            aangenomen: false
        });
    }

});

module.exports = router;

