const { QueryModel, Cashed } = require("../models/queryModal");
const { country, username, bonus, salary, workedYear, company, year_died, year_born, position,} = require("../config/random");
const _ = require("underscore");

exports.createData = async (req, res, next) => {
    const count = 400000;
    let calculateData = 0;
    const recursion = async (RECURSION_NUMBER) => {
        if (RECURSION_NUMBER > 0) {
            const result = new QueryModel({
                username: _.sample(username),
                country: _.sample(country),
                company: _.sample(company),
                workedYear: _.sample(workedYear),
                salary: {
                    january: _.sample(salary),
                    february: _.sample(salary),
                    march: _.sample(salary),
                    april: _.sample(salary),
                    may: _.sample(salary),
                    june: _.sample(salary),
                },
                bonus: {
                    january: _.sample(bonus),
                    february: _.sample(bonus),
                    march: _.sample(bonus),
                    april: _.sample(bonus),
                    may: _.sample(bonus),
                    june: _.sample(bonus),
                },
                year_born: _.sample(year_born),
                year_died: _.sample(year_died),
                position: _.sample(position),
            });
            await result.save();
            console.log("Saved ", (calculateData += 1));
            recursion(RECURSION_NUMBER - 1);
        }
    };
    recursion(count);
};
exports.optimisationData = async (req, res) => {
    const globalStartTime = new Date();
    process.stdout.write("----- Test start -----");
    async function productCount() {
        const startTime = new Date();
        const queries = await Cashed.find({}).lean()
        console.log("----- Malumotlar soni -----", queries.length);
        console.log(
            "----- Tezlik holati ----- ",
            `${(new Date() - startTime) / 1000} sekund`
        );
    }
    (async () => {
        try {
            await productCount();
        } catch (e) {
            console.log(e);
        } finally {
            console.log(
                "----- Tugagan payti ----- ",
                `${(new Date() - globalStartTime) / 1000} sekund`
            );
            process.exit();
        }
    })();
};
exports.filters = async (req, res, next) => {
    const queries = await QueryModel.find({}).lean();
    res.json(queries);
};
exports.casheDataCreate = async (req, res, next) => {
    const count = 500000;
    let calculateData = 0;
    const recursion = async (RECURSION_NUMBER) => {
        if (RECURSION_NUMBER > 0) {
            const result = new Cashed({
                username: _.sample(username),
                country: _.sample(country),
                company: _.sample(company),
                workedYear: _.sample(workedYear),
                year_born: _.sample(year_born),
                year_died: _.sample(year_died),
                position: _.sample(position),
            });
            await result.save();
            console.log("Saved ", (calculateData += 1));
            recursion(RECURSION_NUMBER - 1);
        }
    };
    recursion(count);
}
exports.cashing = async (req, res, next) =>{
    const query = await Cashed.find({}).lean() 
    res.json(query)
}
exports.createIndex = async (req, res, next) => {
    await QueryModel.createIndex({
        username: 1
    })
    console.log("ok")
}
