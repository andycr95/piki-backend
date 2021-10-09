const moment = require('moment')
moment.locale('es');
const db = require('../models');
const Driver = require('../models/driver');
const { Op, QueryTypes, DatabaseError } = require("sequelize");
const { CamposMock, CamposWhereMock } = require('../mocks/campos.mock');
const shiftCtrl = {};


shiftCtrl.get = async (req, res ) => {
    const shifts = await db.shift.findAll({
        where: {
            status: 'true'
        }
    });
    res.json(shifts);
}

shiftCtrl.getMoney = async (req, res ) => {
    const lastMoneyBox = await db.moneyBox.findAll({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]]
    });
    res.json(lastMoneyBox);
}

shiftCtrl.getWithType = async (req, res ) => {
    try {
        if (req.params.type === '5') {
            const shifts = await db.shift.findAll({
                order: [ [ 'createdAt', 'DESC' ]],
                where: {
                    [Op.or]:[
                        {shiftClassId: req.params.type},
                        {shiftClassId: 1},
                    ],
                    status: 'true'
                },
                include: [
                    {model: db.client, as: 'client' }, 
                    {model: db.shiftClass, as: 'shiftClass' },
                    {model: db.containerYard, as: 'containerYard' },
                    {model: db.container, as: 'containers', include:{
                        model: db.containerType, as: 'containerType' 
                    } },
                    { model: db.driver, as: 'driver'}
                ]
            });
            res.json(shifts);
        } else if (req.params.type === '6') {
            const shifts = await db.shift.findAll({
                order: [ [ 'createdAt', 'DESC' ]],
                where: {
                    [Op.or]:[
                        {shiftClassId: req.params.type},
                        {shiftClassId: 2},
                    ],
                    status: 'true'
                },
                include: [
                    {model: db.client, as: 'client' }, 
                    {model: db.shiftClass, as: 'shiftClass' },
                    {model: db.containerYard, as: 'containerYard' },
                    {model: db.container, as: 'containers', include:{
                        model: db.containerType, as: 'containerType' 
                    } },
                    { model: db.driver, as: 'driver'}
                ]
            });
            res.json(shifts);
        }
    } catch (error) {
        res.status(500).json({ error: error})
    }
}

shiftCtrl.getShift = async (req, res ) => {
    const shift = await db.shift.findOne({
        order: [ [ 'createdAt', 'ASC' ]],
        where: {
            [Op.and]:[
                {id: req.params.id},
                {status: 'true'}
            ]
        },
        include: [
            {model: db.client, as: 'client' }, 
            {model: db.transLine, as: 'transLine' },
            {model: db.user, as: 'user' },
            {model: db.shiftClass, as: 'shiftClass' },
            {model: db.containerYard, as: 'containerYard' },
            {model: db.container, as: 'containers', include:{
                model: db.containerType, as: 'containerType' 
            } },
           { model: db.driver, as: 'driver'}
        ]
    });
    res.json(shift);
}

shiftCtrl.post = async ( req, res ) => {
    try {
        const { driver,type,transportLine,clientId,limitTime,patio, containers, observations, user, placa } = req.body;
        let okDriver = false;
        let DriverCreate = [];
        const classShift = await db.shiftClass.findOne({
            where:{
               id : type
            }
        });
        const getDriver = await db.driver.findOne({
            where:{
               identification : driver.documentId
            }
        });
        if (!getDriver) {
            DriverCreate = await db.driver.create({ 
                identification:driver.documentId,
                name:driver.name, 
                email: driver.email,
                phone: driver.phone, 
                vehicle_plate: driver.placa_vehicle, 
                type: driver.type,
                status: 'true'
            });
            okDriver = true
        }
        let dateLimit = moment(limitTime).format();
        const compare = await compareDate(dateLimit);
        const ShiftCreate = await db.shift.create({ 
            date: dateLimit,
            clientId: parseInt(clientId),
            driverId: okDriver ? DriverCreate.id : getDriver.id,
            createdAt: dateLimit,
            transLineId: parseInt(transportLine),
            userId: user,
            shiftClassId: parseInt(type),
            containerYardId: parseInt(patio),
            price: parseInt(classShift.price),
            dayShift:  compare.compare ? compare.shiftL.dayShift+1 : 1,
            globalShift: compare.compare2 ? compare.shiftF.globalShift+1 : 1,
            obvs: observations,
            status: 'true'
        });
        await createContainer(containers, ShiftCreate.id);
        const shift = await db.shift.findOne({
            where: {
                id: ShiftCreate.id,
            },
            include: [
                {model: db.client, as: 'client' }, 
                {model: db.transLine, as: 'transLine' },
                {model: db.user, as: 'user' },
                {model: db.shiftClass, as: 'shiftClass' },
                {model: db.containerYard, as: 'containerYard' },
                {model: db.container, as: 'containers', include:{
                    model: db.containerType, as: 'containerType' 
                } },
               { model: db.driver, as: 'driver'}
            ]
        });
        moneyBoxes(shift);
        res.status(200).json({
            message: 'Turno registrado',
            shift
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

shiftCtrl.update = async (req, res) => {
    try {
        const shift = await db.shift.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {model: db.container, as: 'containers'}
            ]
        });
        let dateLimit = moment(req.body.date).format();
        const compare = await compareDate(dateLimit);
        const ShiftCreate = await db.shift.create({ 
            clientId: shift.clientId,
            driverId: shift.driverId,
            transLineId: shift.transLineId,
            userId: shift.userId,
            createdAt: req.body.date,
            date: req.body.date,
            shiftClassId: req.body.type,
            containerYardId: shift.containerYardId,
            price: shift.price,
            dayShift:  compare.compare ? compare.shiftL.dayShift+1 : 1,
            globalShift: compare.compare2 ? compare.shiftF.globalShift+1 : 1,
            obvs: req.body.observations,
            status: 'true'
        });
        await createContainerRe(shift.containers, ShiftCreate.id);
        const shiftUpdated = await db.shift.findOne({
            where: {
                id: ShiftCreate.id,
            },
            include: [
                {model: db.client, as: 'client' }, 
                {model: db.transLine, as: 'transLine' },
                {model: db.user, as: 'user' },
                {model: db.shiftClass, as: 'shiftClass' },
                {model: db.containerYard, as: 'containerYard' },
                {model: db.container, as: 'containers', include:{
                    model: db.containerType, as: 'containerType' 
                }},
            { model: db.driver, as: 'driver'}
            ]
        });
        moneyBoxes(shiftUpdated);
        res.status(200).json({
            shiftUpdated,
            message: 'Reenturne registrado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error});
    }
}

shiftCtrl.delete = async (req, res) => {
    try {
        const shift = await db.shift.findOne({
            where: {
                id: req.params.id,
            }
        });
        shift.status = 'false';
        shift.obvs = req.query.obvs;
        shift.save();
        const shiftUpdated = await db.shift.findOne({
            where: {
                id: shift.id,
            },
            include: [
                {model: db.client, as: 'client' }, 
                {model: db.transLine, as: 'transLine' },
                {model: db.user, as: 'user' },
                {model: db.shiftClass, as: 'shiftClass' },
                {model: db.containerYard, as: 'containerYard' },
                {model: db.container, as: 'containers', include:{
                    model: db.containerType, as: 'containerType' 
                }},
            { model: db.driver, as: 'driver'}
            ]
        });
        moneyBoxesDelete(shift);
        res.status(200).json({
            shiftUpdated,
            message: 'Turno anulado'
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
}

async function compareDate(dateShift) {
    const lastShift = await db.shift.findAll({
        where: {
            [Op.and]:[
                {createdAt : { 
                    [Op.lt]: dateShift
                }},
                {status: 'true'}
            ]
        },
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]]
    });
    const shiftF = await db.shift.findAll({
        limit: 1,
        order: [ [ 'globalShift', 'DESC' ]]
    });
    let shiftL = lastShift[0];
    if (lastShift.length === 0) {
        return {
            compare: false,
            compare2: shiftF.length === 0 ? false : true,
            shiftL,
            shiftF: shiftF[0]
        };
    } else{
        let date = moment(dateShift).format("YYYY-MM-DD");
        let dateN = moment(shiftL.date).format("YYYY-MM-DD");
        return {
            compare: date == dateN,
            compare2: shiftF.length === 0 ? false : true,
            shiftL,
            shiftF: shiftF[0]
        };
    };
}

async function moneyBoxes(item){
    const lastMoneyBox = await db.moneyBox.findAll({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]]
    });
    if (lastMoneyBox.length == 0) {
        await db.moneyBox.create({
            goblalMoney: item.price,
            current: item.price,
            end: 0
        })
    } else{
        await db.moneyBox.create({
            goblalMoney: lastMoneyBox[0].goblalMoney + item.price,
            current: lastMoneyBox[0].current + item.price,
            end: lastMoneyBox[0].end
        })
    }
}

async function moneyBoxesDelete(item){
    const lastMoneyBox = await db.moneyBox.findAll({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]]
    });
    await db.moneyBox.create({
        goblalMoney: lastMoneyBox[0].goblalMoney - item.price,
        current: lastMoneyBox[0].current - item.price,
        end: lastMoneyBox[0].end
    })
}

shiftCtrl.postMoneyBoxes = async (req, res) => {
    const lastMoneyBox = await db.moneyBox.findAll({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]]
    });
    const money = await db.moneyBox.create({
        goblalMoney: lastMoneyBox[0].goblalMoney,
        current: 0,
        end: lastMoneyBox[0].current
    })
    res.status(200).json(money);
}

async function createContainer(containers, id) {
    for (let i = 0; i < containers.length; i++) {
        let c = containers[i];
        console.log(c);
        let type = await db.containerType.findOne({
            where: {
                code: c.typeCode,
                status: 'true'
            }
        });
        await db.container.create({ 
            code:c.container,
            containerTypeId:type.id, 
            shiftId:id,
            status: 'true'
        });        
    }
}

async function createContainerRe(containers, id) {
    for (let i = 0; i < containers.length; i++) {
        const c = containers[i];
        await db.container.create({ 
            code:c.code,
            containerTypeId:c.containerTypeId, 
            shiftId:id,
            status: 'true'
        });        
    }
}

shiftCtrl.getFilter = async ( req, res ) => {
    try {
        const { campos, fechaIni, fechaFin } = req.body;
        delete req.body.titulo
        delete req.body.campos
        delete req.body.fechaIni
        delete req.body.fechaFin
        let attributes = {};
        attributes['shifts'] = ['createdAt', 'price'];
        attributes['containers'] = ['id']
        let filter = {}

        if (!filter['shifts']) filter['shifts'] = {};

        filter['shifts']['status'] = "true"

        for (const campo of campos) {
            const datos = CamposMock[campo];
            if (datos) {
                for (const value of datos) {
                    if (!attributes[value['table']]) attributes[value['table']] = []
                    attributes[value['table']].push(value['field'])
                }
            }
        }

        for (const key in req.body) {
            if (req.body[key] && req.body[key].length) {
                const campo = CamposWhereMock[key]
                if (!filter[campo['table']]) filter[campo['table']] = {}
                filter[campo['table']][campo['field']] = req.body[key][0].item_id                
            }
        }

        if (fechaIni) {
            filter['shifts']['createdAt'] = {
                [Op.gte]: moment(fechaIni).format('YYYY-MM-DD HH:mm:ss'),
                [Op.lte]: moment( (fechaFin) ? fechaFin : fechaIni).add(24, 'hours').format('YYYY-MM-DD HH:mm:ss')
            }
        } 

        const query = {
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: db.client,
                    attributes: (attributes['clients'] ) ? attributes['clients'] : []
                },
                {
                    model: db.container,
                    attributes: attributes['containers'],
                    where: filter['containers'],
                    include: {
                        model: db.containerType,
                        attributes: (attributes['containerTypes'] ) ? attributes['containerTypes'] : [],
                    }
                },
                {
                    model: db.driver,
                    attributes: (attributes['drivers'] ) ? attributes['drivers'] : [],
                },
                {
                    model: db.transLine,
                    attributes: (attributes['transLines'] ) ? attributes['transLines'] : [],
                },
                {
                    model: db.containerYard,
                    attributes: (attributes['containerYards'] ) ? attributes['containerYards'] : [],
                },
                {
                    model: db.shiftClass,
                    attributes: ['id', 'name' ]
                }

            ],
            attributes: attributes['shifts'],
            where: filter['shifts']
        }

        const turnos = await db.shift.findAll(query)

        res.status(200).json(turnos)
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = shiftCtrl;