const ParkcalcPage = require('../../pageobjects/parkcalc.page');

describe('calculation, Economy Parking', () => {

    it('should be $8 when time is for five hours', async () => {
        await ParkcalcPage.open();

        const params = {
            parkingLot: 'Economy Parking',
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '06:00',
            leavingTime: '10:00',
            startingAm: true,
            startingPm: false,
            leavingAm: true,
            leavingPm: false,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 8.00');
    });

    it('should be $9 maximum when time is less than or equal one day', async () => {
        await ParkcalcPage.open();

        const params = {
            parkingLot: 'Economy Parking',
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '02:00',
            leavingTime: '11:00',
            startingAm: true,
            startingPm: false,
            leavingAm: true,
            leavingPm: false,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 9.00');
    });
     
    it('should be $15 when time is one day and three additional hours', async () => {
        await ParkcalcPage.open();

        const params = {
            parkingLot: 'Economy Parking',
            startingDate: '01/14/2021',
            leavingDate: '01/15/2021',
            startingTime: '02:00',
            leavingTime: '05:00',
            startingAm: true,
            startingPm: false,
            leavingAm: true,
            leavingPm: false,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 15.00');
    });

     
    it('should be $54 when time a week', async () => {
        await ParkcalcPage.open();

        const params = {
            parkingLot: 'Economy Parking',
            startingDate: '01/14/2021',
            leavingDate: '01/21/2021',
            startingTime: '02:00',
            leavingTime: '02:00',
            startingAm: true,
            startingPm: false,
            leavingAm: true,
            leavingPm: false,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 54.00');
    });
});