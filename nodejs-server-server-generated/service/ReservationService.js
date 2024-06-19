'use strict';

const { v4: uuidv4 } = require("uuid");
//const querystring = require('querystring');

var data = [
  {
    customerName: "Timo Laakkonen",
    date: "2023-11-14T11:30:00.000Z",
    service: "Teeth Cleaning",
    reservationId: "e8f9c2b2-8a3d-4d7f-ba6d-4dab7c1cfe4d",
  }
];

/**
 * Get all reservations
 *
 * returns List
 **/
exports.reservationsGET = function () {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = data;
    /*    
    var examples = {};
    examples['application/json'] = [ {
  "date" : "2023-11-14T19:09:00Z",
  "reservationId" : "e8f9c2b2-8a3d-4d7f-ba6d-4dab7c1cfe4d",
  "service" : "Tooth filling",
  "customerName" : "Timo Laakkonen"
}, {
  "date" : "2023-11-14T19:09:00Z",
  "reservationId" : "e8f9c2b2-8a3d-4d7f-ba6d-4dab7c1cfe4d",
  "service" : "Tooth filling",
  "customerName" : "Timo Laakkonen"
} ];*/
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};


/**
 * Add a new reservation
 *
 * body Reservation New reservation
 * returns inline_response_410
 **/
exports.reservationsPOST = function (body) {
  const newItem = body;
  newItem.reservationId = uuidv4();
  data.push(newItem);

  /*
  return new Promise(function(resolve, reject) {
    resolve();
  });*/

  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      message: "Reservation created successfully",
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};


/**
 * Get reservations by searhing query
 * You can insert just the parameters is needed for the query
 *
 * service String Query by the service (optional)
 * customerName String Query by the customer's name (optional)
 * startTime Date Query by start time (optional)
 * endTime Date Query by end time (optional)
 * returns Reservation
 **/
exports.reservationsQueryGET = function (
  service,
  customerName,
  startTime,
  endTime
) {
  
  const queryParams = {};

  if (service) {
    queryParams.service = service;
  }

  if (customerName) {
    queryParams.customerName = customerName;
    
  }

  if (startTime) {
    queryParams.startTime = startTime;
  }

  if (endTime) {
    queryParams.endTime = endTime;
  }

  /*
  const filteredData = data.filter(item => {
    for (const key in queryParams) {
      if (item[key] !== queryParams[key]) {
        return false;
      }
    }
    return true;
  });*/

  const filteredData = data.filter(item => {
    for (const key in queryParams) {
      if (key === "startTime" || key === "endTime") {
        const date = new Date(item.date).getTime();
        const queryTime = new Date(queryParams[key]).getTime();
        
        if (key === "startTime" && (isNaN(queryTime) || date < queryTime)) {
          
          return false;
        }else{

          console.log(date," >= ",queryTime);
          console.log(item.date," >= ",queryParams[key]);
        }

        if (key === "endTime" && (isNaN(queryTime) || date > queryTime)) {
          //console.log(key," endTime ",date," -- ",queryTime);
          //console.log(queryParams[key],"====",item.date);
          return false;
        }
      } else if (item[key] !== queryParams[key]) {
        return false;
      }
    }
    return true;
  });

  console.log(filteredData);

  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = filteredData; 
    
    /*
    {
      date: "2023-11-14T19:09:00Z",
      reservationId: "e8f9c2b2-8a3d-4d7f-ba6d-4dab7c1cfe4d",
      service: "Tooth filling",
      customerName: "Timo Laakkonen",
    };
    */
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Deletes a reservation
 *
 * reservationId String Reservation identifier
 * returns inline_response_410
 **/
exports.reservationsReservationIdDELETE = function (reservationId) {

  data = data.filter(item => item.reservationId !== reservationId);

  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      message: "Successful operation",
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};


/**
 * Find and return a reservation by reservationId
 *
 * reservationId String Reservation identifier
 * returns Reservation
 **/
exports.reservationsReservationIdGET = function (reservationId) {
  return new Promise(function (resolve, reject) {
    
    console.log(data);

    let res = data.find(item => 
      
      item.reservationId === reservationId);
  
    console.log("¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤ ",res);
  
    var examples=[res];
  
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  
};


/**
 * Partially update a reservation
 *
 * body Reservation Properties for update a reservation, not all are needed just new values
 * reservationId String Reservation identifier
 * returns inline_response_410
 **/
exports.reservationsReservationIdPATCH = function (body, reservationId) {
  
  const patchData = body;

  const index = data.findIndex(item => item.reservationId === reservationId);

  if (index !== -1) {
  
    data[index] = { ...data[index], ...patchData };
  
  }

console.log(data);

  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      message: "Successful operation",
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Update a reservation by reservationId
 *
 * body Reservation Properties for update a reservation
 * reservationId String Reservation identifier
 * returns inline_response_410
 **/
exports.reservationsReservationIdPUT = function (body, reservationId) {

  const updatedItem = body;

  const index = data.findIndex(item => item.reservationId === reservationId);

  if (index !== -1) {
  
    data[index] = updatedItem;
  
  }

  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      message: "Successful operation",
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

