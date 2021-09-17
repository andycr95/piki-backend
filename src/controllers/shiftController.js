const moment = require('moment')
moment.locale('es');
const db = require('../models');
const Driver = require('../models/driver');
const { Op, QueryTypes, DatabaseError } = require("sequelize");
const { CamposMock, CamposWhereMock } = require('../mocks/campos.mock');
const shiftCtrl = {};


shiftCtrl.get = async (req, res ) => {
    const shifts = await db.shift.findAll();
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
    const shifts = await db.shift.findAll({
        where: {
            shiftClassId: req.params.type
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

shiftCtrl.getShift = async (req, res ) => {
    const shift = await db.shift.findOne({
        where: {
            id: req.params.id,
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
    const { document,type,transportLine,clientId,limitTime,patio, containers, observations } = req.body;
    let dateLimit = new Date(limitTime)
    const classShift = await db.shiftClass.findOne({
        where:{
           id : type
        }
    });
    const driver = await db.driver.findOne({
        where:{
           identification : document
        }
    });
    const compare = await compareDate();
    const ShiftCreate = await db.shift.create({ 
        limitDate: dateLimit,
        clientId: parseInt(clientId),
        driverId: driver.id,
        transLineId: parseInt(transportLine),
        userId: 1,
        shiftClassId: parseInt(type),
        containerYardId: parseInt(patio),
        price: parseInt(classShift.price),
        dayShift:  compare.compare ? compare.shiftL.dayShift+1 : 1,
        globalShift: compare.compare ? compare.shiftL.globalShift+1 : 1,
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

    res.json({
        message: 'Turno registrado',
        shift
    });
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
        const compare = await compareDate();
        const ShiftCreate = await db.shift.create({ 
            clientId: shift.clientId,
            driverId: shift.driverId,
            transLineId: shift.transLineId,
            userId: shift.userId,
            createdAt: req.body.date,
            shiftClassId: req.body.type,
            containerYardId: shift.containerYardId,
            price: shift.price,
            dayShift:  compare.compare ? compare.shiftL.dayShift+1 : 1,
            globalShift: compare.compare ? compare.shiftL.globalShift+1 : 1,
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
        res.status(500).json({ error: error});
    }
}

async function compareDate() {
    const lastShift = await db.shift.findAll({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]]
    });

    if (lastShift.length === 0) return false;
    let shiftL = lastShift[0];
    let now = new Date();
    let date = moment(now).format("YYYY-MM-DD");
    let dateN = moment(shiftL.createdAt).format("YYYY-MM-DD");

    return {
        compare: date == dateN,
        shiftL
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

shiftCtrl.postMoneyBoxes = async (req, res) => {
    const lastMoneyBox = await db.moneyBox.findAll({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]]
    });
    const money = await db.moneyBox.create({
        goblalMoney: lastMoneyBox[0].goblalMoney,
        current: 0,
        end: lastMoneyBox[0].end
    })
    res.status(200).json(money);
}

async function createContainer(containers, id) {
    for (let i = 0; i < containers.length; i++) {
        const c = containers[i];
        const type = await db.containerType.findOne({
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
            if (!filter['shifts']) filter['shifts'] = {};
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