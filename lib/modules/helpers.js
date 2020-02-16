/*

River Helpers

*/

import { Rivers }  from './rivers/collection.js';

//////////////////////////
// Rivers Array Helpers //
//////////////////////////

export const divideRivers = function(array) {
  let dwrArray = [] // Department of Water Resources: CO
  let usgsArray = [] // United States Geological Service: USA
  array.map(riverInfo => {
    if (riverInfo.url_marker === 0) {
      dwrArray.push(riverInfo.river_id)
    } else {
      usgsArray.push(riverInfo.river_id)
    }
  })
  return {
    dwr: dwrArray,
    usgs: usgsArray
  }
};

//////////////////////////
// Current Flow Helpers //
//////////////////////////

// This call is for DWR
export const currentDwrConditions = async function(array) {
  let newArray = [];
  await fetch(`https://dwr.state.co.us/Rest/GET/api/v2/telemetrystations/telemetrystation/?abbrev=${array.join(', ')}`, {
      method: 'GET'
  })
  .then( results => results.json() )
  .then( results => {
    results.ResultList.map( river => {
      newArray.push({
        url_marker: 0,
        current_date_time: river.measDateTime,
        station_name: river.stationName,
        current_amount_cfs: river.measValue,
        usgs_station_id: river.usgsStationId,
        abbrev: river.abbrev
      })
    })
  }, error => {
    console.log(error)
  })
  return newArray
};

// This call is for USGS
export const currentUsgsConditions = async function(array) {
  let newArray = [];
  await fetch(`https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${array.join(',')}&parameterCd=00060&siteStatus=all`, {
      method: 'GET'
  })
  .then( results => results.json() )
  .then( results => {
    results.value.timeSeries.map( river => {
      newArray.push({
        url_marker: 1,
        current_date_time: river.values[0].value[0].dateTime,
        station_name:river.sourceInfo.siteName,
        current_amount_cfs: parseFloat(river.values[0].value[0].value),
        usgs_station_id:river.sourceInfo.siteCode[0].value,
        abbrev: river.sourceInfo.siteCode[0].value,
      })
    })
  }, error => {
    console.log(error)
  })
  return newArray
};

///////////////////////////
//  Current River Chart  //
///////////////////////////

// This call is for the 7 day period for all the DWR rivers
export const currentDwrChart = async function(array) {

  function dwrDateTimeCfs (data) {
    let x = new Date()
    x = x.setDate(x.getDate() - 7)
    let arrangedData = []
    data.map((dateCfs ,index, array) => {
      if (dateCfs.parameter === 'GAGE_HT') {
        return
      } else if (dateCfs.parameter === 'AIRTEMP') {
        return
      } else if (dateCfs.parameter === 'PRECIP') {
        return
      } else if (dateCfs.parameter === 'PRECIP_T') {
        return
      } else if (new Date(dateCfs.measDateTime) <= x) {
        return
      } else {
        delete dateCfs.parameter
        delete dateCfs.measUnit
        delete dateCfs.flagA
        delete dateCfs.flagB
        delete dateCfs.modified
        // tenDayWindow(dateCfs)
      }
      return arrangedData.push({"abbrev": dateCfs.abbrev, "dateTime": dateCfs.measDateTime, "value":parseInt(dateCfs.measValue, 10)})
      // delete dateCfs.qualifiers
      // return arrangedData.push({"dateTime": dateCfs.dateTime,"value":parseInt(dateCfs.value, 10)})
    })
    return arrangedData
  }

  function today () {
    let x = new Date()
    x = new Date(x.setDate(x.getDate() - 7))
    let dd = x.getDate();
    let mm = x.getMonth() + 1;
    let yyyy = x.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    let today = mm + '/' + dd + '/' + yyyy;

    return today;
  }

  let riverResults = await fetch(`https://dwr.state.co.us/Rest/GET/api/v2/telemetrystations/telemetrytimeseriesraw/?startDate=${today()}&abbrev=${array.join(', ')}`, {
    method: 'GET'
  })
  .then(results => results.json())
  .then( (results) => {
     return results.ResultList
  }, error => {
    console.log(error)
  })
  let scrubbedRiverResults = await dwrDateTimeCfs(riverResults)
  return scrubbedRiverResults;

}

// This call is for the 7 day period for all the USGS rivers


export const currentUsgsChart = async function(array) {

  function dateTimeCfs(data) {
    let scrubbedChartData = []
    data.map((dateCfs) => {
      delete dateCfs.data.qualifiers
      dateCfs.data.map( (dateValues) => {
        scrubbedChartData.push({ "abbrev":dateCfs.name, "dateTime":dateValues.dateTime, "value":parseInt(dateValues.value, 10) })
      })
      // return arrangedData.push({ "abbrev":abbrev, "dateTime": dateCfs.dateTime, "value":parseInt(dateCfs.value, 10) })
    })
    return scrubbedChartData;
  }

  let newArray = [];
  await fetch(`https://waterservices.usgs.gov/nwis/iv?sites=${array.join(',')}&parameterCd=00060&period=P7D&format=json`, {   //period = is equivalent to 7 day time period-should be able to edit
      method: 'GET'
    })
  .then( results => results.json())
  .then( (results) => {
    results.value.timeSeries.map( (river) => {
      newArray.push({
        name:river.sourceInfo.siteCode[0].value,
        data: river.values[0].value.map( (riverValue) => {
          return riverValue
        })
      })
    })
    return newArray
    // dateTimeCfs(newArray)
    // this.setState({
    //         usgs_station_id: result.value.timeSeries[0].sourceInfo.siteCode[0].value,
    //         station_name: result.value.timeSeries[0].sourceInfo.siteName,
    //         date_time_cfs: dateTimeCfs(result.value.timeSeries[0].values[0].value),
    //         isLoading: false,
    //       });
  })
  .then((results) => {
    return newArray = dateTimeCfs(results)
  }, error => {
    console.log(error)
  })
  return newArray
}
//
//   .then(res => res.json())
//   .then(
//     (result) => {
//       this.setState({
//         station_name: river_id,
//         abbrev: result.ResultList[0].abbrev,
//         date_time_cfs:dwrDateTimeCfs(result.ResultList),
//         isLoading: false
//       })
//     },
//     (error) => {
//       this.setState({
//         error
//       });
//     }
//   )
// }
