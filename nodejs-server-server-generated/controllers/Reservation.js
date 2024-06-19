'use strict';

var utils = require('../utils/writer.js');
var Reservation = require('../service/ReservationService');

module.exports.reservationsGET = function reservationsGET (req, res, next) {
  Reservation.reservationsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.reservationsPOST = function reservationsPOST (req, res, next, body) {
  Reservation.reservationsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.reservationsQueryGET = function reservationsQueryGET (req, res, next, service, customerName, startTime, endTime) {
  Reservation.reservationsQueryGET(service, customerName, startTime, endTime)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.reservationsReservationIdDELETE = function reservationsReservationIdDELETE (req, res, next, reservationId) {
  Reservation.reservationsReservationIdDELETE(reservationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.reservationsReservationIdGET = function reservationsReservationIdGET (req, res, next, reservationId) {
  Reservation.reservationsReservationIdGET(reservationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.reservationsReservationIdPATCH = function reservationsReservationIdPATCH (req, res, next, body, reservationId) {
  Reservation.reservationsReservationIdPATCH(body, reservationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.reservationsReservationIdPUT = function reservationsReservationIdPUT (req, res, next, body, reservationId) {
  Reservation.reservationsReservationIdPUT(body, reservationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
