
const {
  getClient
} = require('../src/index.js')

const {
  updateDatasource,
  findBySns,
  upsertFile,
  updateDatasourcevalue,
  updateValue
} = getClient('localhost:50051', '5e1c390fa625ed00194043ae')

const main = async () => {
  let res = await updateDatasource({
    computeProcess: true,
    cron: 'api',
    name: 'VND26_kWh',
    unit: 'kWh',
    createdBy: '5cb9a68d4e01892bfe5ab855'
  })
  console.log(res)

  res = await findBySns([1, 2])
  console.log(res)

  res = await upsertFile({
    sns: 1,
    relativePath: 'BURActiveEnergy-20140714-0200.csv',
    mtime: new Date('Mon Jul 14 2014 02:00:02 GMT+0800 (GMT+08:00)')
  })
  console.log(res)

  res = await updateDatasourcevalue({
    name: 'F3_Normal_kWh',
    time: new Date('2013-06-30T16:00:00.000Z'),
    original: 347810,
    // value: null,
    upsert: true
  })
  console.log(res)

  res = await updateValue({
    name: 'VND26_kWh',
    time: new Date('Mon Jul 14 2019 02:00:02 GMT+0800 (GMT+08:00)')
  })
  console.log(res)
}

main().then(() => console.log('---- end')).catch(err => console.error(err))
