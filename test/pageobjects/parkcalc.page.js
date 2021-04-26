const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class Parkcalc extends Page {
    /**
     * define selectors using getter methods
     */
    get inputParkingLot () { return $('#ParkingLot') }
    get inputParkingLotSelected () { return $$('#ParkingLot option[selected]') }

    get inputStartingDate () { return $('#StartingDate') }
    get inputLeavingDate () { return $('#LeavingDate') }

    get inputStartingTime () { return $('#StartingTime') }
    get inputLeavingTime () { return $('#LeavingTime') }

    get inputStartingAm () { return $('input[name="StartingTimeAMPM"][value="AM"]') }
    get inputStartingPm () { return $('input[name="StartingTimeAMPM"][value="PM"]') }

    get inputLeavingAm () { return $('input[name="LeavingTimeAMPM"][value="AM"]') }
    get inputLeavingPm () { return $('input[name="LeavingTimeAMPM"][value="PM"]') }

    get btnCalculate () { return $('input[type="submit"]') }
    get estimatedParkingCosts () { return $$('.SubHead b') }    
    // Using the class, instead of the tag input, because at the response moment, it changes

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async loadPage (
        {   parkingLot,
            startingDate,
            leavingDate,
            startingTime,
            leavingTime,
            startingAm,
            startingPm,
            leavingAm,
            leavingPm,
            isClicked 
        }
        ) {
        await (await this.inputParkingLot).selectByVisibleText(parkingLot);
        await (await this.inputStartingDate).setValue(startingDate);
        await (await this.inputLeavingDate).setValue(leavingDate);
        await (await this.inputStartingTime).setValue(startingTime);
        await (await this.inputLeavingTime).setValue(leavingTime);

        if(startingPm)
            await (await this.inputStartingPm).click();

        if(leavingPm)
            await (await this.inputLeavingPm).click();

        // if(isClicked)
        //     await (await this.btnCalculate).click();

        
        // await (await this.inputStartingAm).setValue(startingAm);
        // await (await this.inputStartingPm).setValue(startingPm);
        // await (await this.inputLeavingAm).setValue(leavingAm);
        // await (await this.inputLeavingPm).setValue(leavingPm);

        // await (await this.btnCalculate).click();
        
    }

    async loadValidValues () {
        const validParams = {
            parkingLot: 'Short-Term Parking',
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '07:00',
            leavingTime: '11:00',
            startingAm: false,
            startingPm: true,
            leavingAm: false,
            leavingPm: true,
            isClicked: false
        };
        await this.loadPage(validParams);
    }

    async loadValues () {
        const validParams = {
            parkingLot: 'Short-Term Parking',
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '07:00',
            leavingTime: '11:00',
            startingAm: false,
            startingPm: true,
            leavingAm: false,
            leavingPm: true,
            isClicked: true
        };
        await this.loadPage(validParams);
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('parkcalc');
    }
}

module.exports = new Parkcalc();
