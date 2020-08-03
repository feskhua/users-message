const fs = require('fs');
const csvParser = require('csv-parser');
const { Sequelize } = require('../db/connection');

const PAGINATION_LIMIT = 5;
const PAGINATION_LIMIT_MAX = 100;
const PAGINATION_OFFSET = 0;

const parseCsv = (csvPath) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    fs.createReadStream(csvPath)
      .pipe(csvParser())
      .on('error', reject)
      .on('data', (data) => chunks.push(data))
      .on('end', () => resolve(chunks));
  });
};

const parseOrderParams = (order = '') => {
  const field = order.replace(/^-/, '');
  const direction = order.startsWith('-') ? 'DESC' : 'ASC';
  return [field, direction];
};

const stringifyOrderParams = (params) => {
  const [field, direction] = params;
  const prefix = direction === 'DESC' ? '-' : '';
  return `${prefix}${field}`;
};

const getPagination = (query) => {
  const pagination = {
    limit: PAGINATION_LIMIT,
    offset: PAGINATION_OFFSET,
  };

  const limit = query.limit && Number.parseInt(query.limit, 10);
  if (limit && !Number.isNaN(limit)) {
    pagination.limit = Math.min(limit, PAGINATION_LIMIT_MAX);
  }

  const offset = query.offset && Number.parseInt(query.offset, 10);
  if (offset && !Number.isNaN(offset)) {
    pagination.offset = offset;
  }

  return pagination;
};

const getExistsLiteral = (from, where) =>
  Sequelize.literal(`(SELECT EXISTS(SELECT 1 FROM ${from} WHERE ${where}))`);

module.exports = {
  parseCsv,
  parseOrderParams,
  stringifyOrderParams,
  getPagination,
  getExistsLiteral,
};
