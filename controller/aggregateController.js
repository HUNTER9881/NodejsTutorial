const { FirstModal } = require('../models/aggregateModal')
const { Human } = require('../models/human')
const { randomNumber, randomString, country, username, year_born, year_died, nationality, price } = require('../config/random')
const _ = require('underscore')
const ObjectId = require('mongodb').ObjectId

exports.createData_1 = async (req, res) => {
    const count = 1000000
    const recursion = async (RECURSION_NUMBER) => {
        if (RECURSION_NUMBER > 0) {
            const result = new FirstModal({
                last_name: _.sample(username),
                first_name: _.sample(username),
                count: randomNumber(100),
                views: randomNumber(1000),
                tag: [randomString("ABCDE", 2), randomString("ABCDE", 2), randomString("ABCDE", 2)],
                ball: [randomNumber(100), randomNumber(100), randomNumber(100), randomNumber(100), randomNumber(100)],
                countryName: _.sample(country),
                price: _.sample(price),
                year_born: _.sample(year_born),
                year_died: _.sample(year_died),
                nationality: _.sample(nationality),
                humen_ID: "628bba7f937ef31b4f3bd5c5"
            })
            await result.save()
            console.log("Saved", result)


            recursion(RECURSION_NUMBER - 1)
        }
    }
    recursion(count)
}
exports.comparision = async (req, res, next) => {
    pipeline_1 = [
        {
            $match: {
                count: {
                    $gt: 50
                },
            }
        }
    ]
    pipeline_2 = [
        {
            $match: {
                tag: {
                    $in: ["EE"]
                },
            }
        }
    ]
    pipeline_3 = [
        {
            $match: {
                tag: {
                    $nin: ["EE"]
                },
            }
        }
    ]
    pipeline_4 = [
        {
            $match: {
                year_born: {
                    $ne: 1999
                },
            }
        }
    ]
    const result = await FirstModal.aggregate(pipeline_4)
    res.json({
        soni: result.length,
        data: result
    })
}
exports.logical = async (req, res, next) => {

    /*
        FirstModal.filter((item) => {
            item.count < 50 && item.views < 500
        })
    */
    pipeline_1 = [
        {
            $match: {
                $and: [
                    { count: { $lt: 50 } },
                    { views: { $lt: 500 } }
                ]
            }
        }
    ]






    /*
        FirstModal.filter((item) => {
            (item.count < 50 && item.views < 500 ) && 
            (item.tag == "EC" && item.ball == 40 ) 
        })
    */
    pipeline_2 = [
        {
            $match: {
                $and: [
                    // 1.( item.count < 50 && item.views < 500 )
                    {
                        $and: [
                            { count: { $lt: 50 } },
                            { views: { $lt: 500 } },
                        ]
                    },

                    // 2.(item.tag == "EC" && item.ball == 40 ) 
                    {
                        $and: [
                            { tag: { $in: ["EC"] } },
                            { ball: { $in: [40] } },
                        ]
                    },
                ]
            }
        }
    ]






    /*
        FirstModal.filter((item) => {
            ((item.count < 50 && item.views < 500 ) &&  (item.tag == "EC" && item.ball == 40 )) || 
            ((item.price !== 80 && item.year_born !== 1998 ) &&  (item.year_died !== 1999 && item.nationality == "uzbek" )) 
        })
    */
    pipeline_3 = [
        {
            $match: {
                $or: [
                    //  ((item.count < 50 && item.views < 500 ) &&  (item.tag == "EC" && item.ball == 40 )) 
                    {
                        $and: [
                            // 1.( item.count < 50 && item.views < 500 )
                            {
                                $and: [
                                    { count: { $lt: 50 } },
                                    { views: { $lt: 500 } },
                                ]
                            },
                            // 2.(item.tag == "EC" && item.ball == 40 ) 
                            {
                                $and: [
                                    { tag: { $in: ["EC"] } },
                                    { ball: { $in: [40] } },
                                ]
                            },
                        ]
                    },

                    // ((item.price !== 80 && item.year_born !== 1998 ) &&  (item.year_died !== 1999 && item.nationality == "uzbek" )) 
                    {
                        $and: [
                            {
                                $and: [
                                    { price: { $ne: 80 } },
                                    { year_born: { $ne: 1998 } }
                                ]
                            },
                            {
                                $and: [
                                    { year_died: { $ne: 1999 } },
                                    { nationality: { $eq: "uzbek" } }
                                ]
                            },
                        ]
                    },
                ]
            }
        }
    ]



    pepeline_4 = [
        {
            $match: {
                $nor: [
                    { count: { $lt: 50 } },
                    { views: { $lt: 500 } },
                    { price: { $lt: 50 } },
                ]
            }
        }
    ]



    pepeline_5 = [
        {
            $match: {
                count: {

                    // !(item.count >= 50)
                    $not: {
                        $lt: 50
                    }
                }
            }
        }
    ]



    const result = await FirstModal.aggregate(pepeline_5)
    res.json({
        soni: result.length,
        data: result
    })
}
exports.logical = async (req, res, next) => {
    // price * count
    pipeline_1 = [
        {
            $addFields: {
                NATIJA: { $multiply: ["$count", "$price"] }
            }
        }
    ]
    // price + count
    pipeline_2 = [
        {
            $addFields: {
                NATIJA: { $add: ["$count", 10000] }
            }
        }
    ]
    // ((count + views) / 3) * 66 - 120 + 1000
    pipeline_3 = [
        {
            $addFields: {
                NATIJA: {
                    $add: [
                        {
                            $subtract: [
                                {
                                    $multiply: [
                                        {
                                            $divide: [
                                                {
                                                    $add: ["$count", "$views"]
                                                },
                                                3
                                            ]
                                        },
                                        66
                                    ]
                                },
                                120
                            ]
                        },
                        1000
                    ]
                }
            }
        }
    ]
    const result = await FirstModal.updateMany(
        {
            views: {
                $lt: 110
            }
        },
        {
            $inc: { count: 10 }
        }
    )
    res.json({
        soni: result.length,
        data: result
    })
}
exports.addFields = async (req, res) => {
    // 1.obyektdan yangi element qoshadi  va unga yangi qiymat berib o'tadi
    pipeline_1 = [
        {
            $addFields: {
                total: "Assalomu alaykum"
            }
        }
    ];
    pipeline_2 = [
        {
            $addFields: {
                total: {
                    $add: ["$count", "$views"]
                }
            }
        }
    ]
    pipeline_3 = [
        {
            $addFields: {
                total: {
                    $add: ["$count", "$views"]
                }
            }
        },
        {
            $addFields: {
                multiplyTotal: {
                    $multiply: ["$total", 2]
                }
            }
        }
    ]
    pipeline_4 = [
        {
            $addFields: {
                data: {
                    username: "Muhammad",
                    age: 1998,
                    color: "red",
                    car: "BMW"
                }
            }
        },

    ]

    // 2. Shuningdek mavjud elementning qiymati o'rniga boshqa qiymatni berish imkoniyatiga ham ega 
    pipeline_5 = [
        {
            $addFields: {
                _id: "$name",
                name: "Assalomu alaykum"
            }
        }
    ]

    // 3. $concatArrays metodi bilan ishlash imkoniyati mavjud
    pipeline_6 = [
        {
            $addFields: {
                totalElement: {
                    $concatArrays: ["$ball", [1, 2, 3, 4, 5]]
                }
            }
        },
        {
            $addFields: {
                totalSumm: {
                    $sum: "$totalElement"
                }
            }
        }
    ]


    const result = await FirstModal.aggregate(pipeline_6)
    res.json(result)
}
exports.buckets = async (req, res) => {

    /*
        1) 
            qaysidir element boyicha filtrlaydi, 
            groupBy holatidagi element boyicha qiymatlarrni berish va aynan shu elementlar bilan filtrlaydi
            boundaries boyicha filter bolmagan va qolib ketganlarni alohida olish
            natijani chiqarish

            {
                $bucket: {
                    groupBy: <expression>, - guruhlash uchun ishlatilinadi
                    boundaries: [ <lowerbound1>, <lowerbound2>, ... ], - groupBy boyicha malumotlarni saralaydi
                    default: <literal>, - 
                    output: { - natija chiqish ichun ishlatilinadi
                       <output1>: { <$accumulator expression> },
                       <output2>: { <$accumulator expression> },
                       <output3>: { <$accumulator expression> },
                       <output4>: { <$accumulator expression> },
                       <output5>: { <$accumulator expression> },
                    }
                 }
            }
    */
    pipeline_1 = [
        {
            $bucket: {
                groupBy: "$year_born",                                       // qaysidir element boyicha filtrlash
                boundaries: [1950, 1960, 1970, 1980, 1990, 2000, 2011],      // groupBy holatidagi element boyicha qiymatlarrni berish va aynan shu elementlar bilan filtrlash
                default: "Other",                                            // boundaries boyicha filter bolmagan va qolib ketganlarni alohida olish
                output: {                                                    // natijani chiqarish
                    "count": { $sum: 1 },
                    "artists": {
                        $push: {
                            "ISM": "$first_name",
                            "TUGILGAN": "$year_born"
                        }
                    }
                }
            }
        },
    ]


    // 2. $facet bilan bir nechta buketlarni olish imkoniyati mavjud
    pipeline_2 = [
        {
            $facet: {
                "YIL_BO'YICHA": [
                    {
                        $bucket: {
                            groupBy: "$year_born",                                       // qaysidir element boyicha filtrlash
                            boundaries: [1950, 1960, 1970, 1980, 1990, 2000, 2011],      // groupBy holatidagi element boyicha qiymatlarrni berish va aynan shu elementlar bilan filtrlash
                            default: "Other",                                            // boundaries boyicha filter bolmagan va qolib ketganlarni alohida olish
                            output: {                                                    // natijani chiqarish
                                "count": { $sum: 1 },
                                "artists": {
                                    $push: {
                                        "ISM": "$first_name",
                                        "TUGILGAN": "$year_born"
                                    }
                                }
                            }
                        }
                    }
                ],
                "NARX_BO'YICHA":
                    [
                        {
                            $bucket: {
                                groupBy: "$price",          // qaysidir element boyicha filtrlash
                                boundaries: [30, 60, 90],   // groupBy holatidagi element boyicha qiymatlarrni berish va aynan shu elementlar bilan filtrlash
                                default: "Other",           // boundaries boyicha filter bolmagan va qolib ketganlarni alohida olish
                                output: {                   // natijani chiqarish
                                    "count": { $sum: 1 },
                                    "artists": {
                                        $push: {
                                            "ISM": "$first_name",
                                            "NARX": "$price"
                                        }
                                    }
                                }
                            }
                        }
                    ]
            }
        }
    ]


    const result = await FirstModal.aggregate(pipeline_2)
    res.json(result)
}
exports.bucketAuto = async (req, res) => {
    /* 
        1.qaysidir element boyicha filtrlash va umummiy son boyicha qismga ajratadi va taqsimlab chiqadi
        {
          $bucketAuto: {
              groupBy: <expression>,
              buckets: <number>,
              output: {
                 <output1>: { <$accumulator expression> },
                 ...
              }
              granularity: <string>
          }
        }
    */
    pipeline_1 = [
        {
            $bucketAuto: {
                groupBy: "$price", // qaysidir element boyicha filtrlash
                buckets: 5 // umummiy shuncha qismga ajratadi va taqsimlab chiqadi
            }
        }
    ]


    // 2. $facet bilan bir nechta buketAutolarni olish imkoniyati mavjud
    pipeline_2 = [
        {
            $facet: {
                "Narx_boyicha": [
                    {
                        $bucketAuto: {
                            groupBy: "$price",
                            buckets: 4
                        }
                    }
                ],
                "Yil_boyicha": [
                    {
                        $bucketAuto: {
                            groupBy: "$year_born",
                            buckets: 3,
                            output: {
                                "count": { $sum: 1 },
                                "year_born": { $push: "$year_born" }
                            }
                        }
                    }
                ]
            }
        }
    ]

    const result = await FirstModal.aggregate(pipeline_2)
    res.json(result)
}
exports.collStats = async (req, res) => {
    /*
        1) storageStats: {}  - xotira sigimi bilan ishlash imkoniyatini beradi;

        Quyidagi halatda malumot qaytadi: 

         - "ns" - qaysi kolletiondan olinyotgani
         - "host" - qaysi bazadan olinayotgani
         - "localtime": qachon olingani
         - "size": malumotlar hajmini beradi
         - "count" - suhbu kollectionda qancha malumot yigilgani haqida
         - "avgObjSize" - ortacha hajmi belgilaydi
         - "storageSize" - umumiy xotira hajmi
         - "freeStorageSize" - bosh xotira hajmi
        ...        
            
    */
    pipeline_1 = [
        { $collStats: { storageStats: {} } }
    ]




    /*
        1) count: {}  - umumiy malumot beradi

        Quyidagi halatda malumot qaytadi: 

         - "ns" - qaysi kolletiondan olinyotgani
         - "host" - qaysi bazadan olinayotgani
         - "localtime": qachon olingani
         - "size": malumotlar hajmini beradi
            
    */
    pipeline_2 = [
        { $collStats: { count: {} } }
    ]



    /*
        1) count: {}  - umumiy malumot beradi
    
        Quyidagi halatda malumot qaytadi: 

         - "ns" - qaysi kolletiondan olinyotgani
         - "host" - qaysi bazadan olinayotgani
         - "localtime": qachon olingani
    */
    pipeline_3 = [
        { $collStats: { queryExecStats: {} } }
    ]



    const result = await FirstModal.aggregate(pipeline_3)
    res.json(result)
}
exports.count = async (req, res) => {
    // 1. $group + $project dan foydalanib hamma malumotlar sonini olish
    pipeline_1 = [
        { $group: { _id: null, myCount: { $sum: 1 } } },
        { $project: { _id: 0 } }
    ]
    // 2. $count dan foydalanib hamma malumotlarni sonini olish
    pipeline_2 = [
        {
            $count: "myCount"
        }
    ]
    const result = await FirstModal.aggregate(pipeline_2)
    res.json(result)
}
exports.currentOp = async (req, res) => {
    // 1. admin database bilan ishlash imkoniyatini beradi
    pipeline_1 = [
        {
            $currentOp: {

            }
        }
    ]
    const result = await FirstModal.aggregate(pipeline_1)
    res.json(result)
}
exports.facet = async (req, res) => {
    // 1. bir vaqtning o'zida bir nechta amaluyotni amalga oshirish imkoniyatini beradi
    pipeline_1 = [
        {
            $facet: {
                "birinchi_vazifa": [
                    {
                        $bucket: {
                            groupBy: "$year_born",
                            boundaries: [1950, 1960, 1970, 1980, 1990, 2000, 2011],
                            default: "Other",
                            output: {
                                "count": { $sum: 1 },
                                "artists": {
                                    $push: {
                                        "ISM": "$first_name",
                                        "TUGILGAN": "$year_born"
                                    }
                                }
                            }
                        }
                    }
                ],
                "ikkinchi_vazifa": [
                    {
                        $match: {
                            $and: [
                                { price: { $gte: 50 } },
                                { views: { $gte: 500 } }
                            ]
                        }
                    },
                    {
                        $count: "natija"
                    }
                ],
                "uchinchi_vazifa": [
                    {
                        $addFields: {
                            umumiyBallYigindisi: {
                                $sum: "$ball"
                            }
                        }
                    },
                    {
                        $project: {
                            umumiyBallYigindisi: {
                                $add: [100, "$umumiyBallYigindisi"]
                            }
                        }
                    }
                ],
                "tortinchi_vazifa": [
                    {
                        $addFields: {
                            umumiyBallYigindisi: {
                                $sum: "$ball"
                            }
                        }
                    },
                    {
                        $project: {
                            umumiyBallYigindisi: {
                                $add: [100, "$umumiyBallYigindisi"]
                            }
                        }
                    },
                    {
                        $match: {
                            umumiyBallYigindisi: {
                                $lte: 200
                            }
                        }
                    },
                    {
                        $addFields: {
                            natija: {
                                $divide: ["$umumiyBallYigindisi", 2]
                            }
                        }
                    }
                ]
            }
        }
    ]
    const result = await FirstModal.aggregate(pipeline_1)
    res.json(result)
}
exports.createHuman = async (req, res) => {
    const result = await Human.create(req.body)
    res.json(result)
}
exports.aggregateMixed = async (req, res, next) => {
    set_pipeline = [
        {
            $set: {
                jami: {
                    $add: [
                        { $sum: "$ball" },
                        10000
                    ]
                }
            }
        },
        {
            $unset: "countryName"
        }
    ]
    bucket_pipeline = [
        {
            $bucket: {
                groupBy: "$year_born",
                boundaries: [1983, 1986, 1990], // 1981 - 2000
                default: "Other",
                output: {
                    "soni": { $sum: 1 },
                    "worker": {
                        $push: {
                            "ismi": { $concat: ["$last_name", " ", "$first_name"] },
                            "tugilgan": "$year_born"
                        }
                    }
                }
            }
        }
    ]
    bucketAuto = [
        {
            $bucketAuto: {
                groupBy: "$year_born",
                buckets: 4,
                output: {
                    "soni": { $sum: 1 },
                    "worker": {
                        $push: {
                            "ismi": { $concat: ["$last_name", " ", "$first_name"] },
                            "tugilgan": "$year_born"
                        }
                    }
                }
            }
        }
    ]
    facet_pipeline = [
        {
            $facet: {
                "task_1": [
                    {
                        $addFields: {
                            total_ball: {
                                $sum: "$ball"
                            },
                        }
                    },
                    {
                        $match: {
                            $and: [
                                { total_ball: { $gt: 100 } },
                                { total_ball: { $lt: 150 } },
                            ],
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            "soni": { $sum: 1 },
                            "malumot": {
                                $push: {
                                    "name": "$last_name"
                                }
                            }
                        }
                    }
                ],
                "task_2": [
                    {
                        $addFields: {
                            number: { $subtract: ["$year_died", "$year_born"] }
                        }
                    },
                    {
                        $match: {
                            number: {
                                $eq: 22
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            "soni": { $sum: 1 },
                            "malumot": {
                                $push: {
                                    "name": "$last_name",
                                    "born": "$year_born",
                                    "died": "$year_died"
                                }
                            }
                        }
                    }
                ],
                "task_3": [
                    {
                        $project: {
                            last_name: 1,
                            first_name: 1,
                            soni: {
                                $add: [
                                    { $sum: "$ball" }, // [1,2,4] = 7
                                    "$count",
                                    "$views",
                                    "$price"
                                ]
                            }
                        }
                    },
                    {
                        $bucket: {
                            groupBy: "$soni",
                            boundaries: [200, 400, 600, 800, 1000],
                            default: "Other",
                            output: {
                                "jami": { $sum: 1 },
                                "worker": {
                                    $push: {
                                        "ismi": { $concat: ["$last_name", " ", "$first_name"] },
                                        "oylik": "$soni"
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        },

    ]
    const result = await FirstModal.aggregate(lookup)
    res.json(result)
}
exports.lookUp = async (req, res) => {


    // simple
    const pipeline_1 = [
        { $match: {} },// hammasini oldik
        {
            $lookup: {
                from: "firsts",
                localField: "_id",
                foreignField: "humen_ID",
                as: "UMUMIY"
            }
        },
        {
            $project: {
                name: 1,
                "UMUMIY.last_name": 1,
            }
        },
    ]
    const pipeline_2 = [
        {
            $lookup: {
                from: "firsts",
                let: { humen_ID: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$humen_ID", "$$humen_ID"] } } },
                    {
                        $project: {
                            "last_name": 1
                        }
                    }
                ],
                as: "UMUMIY",
            },
        },
    ]
    const pipeline_3 = [
        {
            $match: {
                _id: ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
                from: "firsts",
                let: { humen_ID: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$humen_ID", "$$humen_ID"] } } },
                    {
                        $project: {
                            last_name: 1,
                            first_name: 1,
                            soni: {
                                $add: [
                                    "$count",
                                    "$price",
                                    "$views",
                                    {
                                        $sum: "$ball"
                                    }
                                ]
                            }
                        }
                    },

                    {
                        $group: {
                            _id: null,
                            "COUNT": { $sum: 1 },
                            "DATA": {
                                $push: {
                                    "name": "$last_name",
                                    "surname": "$first_name",
                                    "numbers": "$soni"
                                }
                            }
                        }
                    }


                    // {
                    //     $bucket: {
                    //         groupBy: "$soni",
                    //         boundaries: [200, 400, 600, 800, 1000],
                    //         default: "Other",
                    //         output: {
                    //             "jami": { $sum: 1 },
                    //             "worker": {
                    //                 $push: {
                    //                     "ismi": { $concat: ["$last_name", " ", "$first_name"] },
                    //                     "oylik": "$soni"
                    //                 }
                    //             }
                    //         }
                    //     }
                    // }
                ],
                as: "UMUMIY",
            },
        },
    ]




    const result = await Human.aggregate(pipeline_3)
    res.json(result)
}



